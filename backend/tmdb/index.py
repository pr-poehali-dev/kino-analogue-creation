'''
Business: Получение данных о фильмах и сериалах из TMDB API
Args: event с httpMethod, queryStringParameters (type, query, page)
Returns: JSON с фильмами, сериалами или результатами поиска
'''

import json
import os
from typing import Dict, Any
from urllib.parse import urlencode
from urllib.request import urlopen, Request

TMDB_BASE_URL = 'https://api.themoviedb.org/3'
TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }

    api_key = os.environ.get('TMDB_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'TMDB API key not configured',
                'message': 'Пожалуйста, добавьте TMDB_API_KEY в секреты проекта'
            }),
            'isBase64Encoded': False
        }

    params = event.get('queryStringParameters', {}) or {}
    content_type = params.get('type', 'trending')
    search_query = params.get('query', '')
    page = params.get('page', '1')
    language = 'ru-RU'

    try:
        url = ''
        
        if content_type == 'trending':
            url = f'{TMDB_BASE_URL}/trending/all/week?api_key={api_key}&language={language}&page={page}'
        elif content_type == 'movies':
            url = f'{TMDB_BASE_URL}/movie/popular?api_key={api_key}&language={language}&page={page}'
        elif content_type == 'series':
            url = f'{TMDB_BASE_URL}/tv/popular?api_key={api_key}&language={language}&page={page}'
        elif content_type == 'top_rated':
            url = f'{TMDB_BASE_URL}/movie/top_rated?api_key={api_key}&language={language}&page={page}'
        elif content_type == 'search':
            if not search_query:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Query parameter required for search'}),
                    'isBase64Encoded': False
                }
            url = f'{TMDB_BASE_URL}/search/multi?api_key={api_key}&language={language}&query={search_query}&page={page}'
        else:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Invalid type parameter'}),
                'isBase64Encoded': False
            }

        req = Request(url)
        with urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        transformed_results = []
        for item in data.get('results', []):
            transformed_results.append({
                'id': item.get('id'),
                'title': item.get('title') or item.get('name'),
                'originalTitle': item.get('original_title') or item.get('original_name'),
                'overview': item.get('overview'),
                'posterPath': f"{TMDB_IMAGE_BASE}/w500{item['poster_path']}" if item.get('poster_path') else None,
                'backdropPath': f"{TMDB_IMAGE_BASE}/original{item['backdrop_path']}" if item.get('backdrop_path') else None,
                'rating': round(item.get('vote_average', 0), 1),
                'voteCount': item.get('vote_count'),
                'releaseDate': item.get('release_date') or item.get('first_air_date'),
                'year': (item.get('release_date') or item.get('first_air_date', '')).split('-')[0] if (item.get('release_date') or item.get('first_air_date')) else '',
                'mediaType': item.get('media_type') or ('tv' if content_type == 'series' else 'movie'),
                'genreIds': item.get('genre_ids', []),
                'adult': item.get('adult', False),
                'popularity': item.get('popularity')
            })

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'page': data.get('page'),
                'totalPages': data.get('total_pages'),
                'totalResults': data.get('total_results'),
                'results': transformed_results
            })
        }

    except Exception as error:
        print(f'TMDB API Error: {error}')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Failed to fetch data from TMDB',
                'details': str(error)
            }),
            'isBase64Encoded': False
        }
