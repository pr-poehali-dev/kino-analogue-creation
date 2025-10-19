import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('Главная');

  const navItems = ['Главная', 'Фильмы', 'Сериалы', 'Рейтинги', 'Подборки', 'Новости', 'Профиль'];

  const heroMovie = {
    title: 'Эпическое приключение',
    rating: 8.9,
    year: 2024,
    genres: ['Боевик', 'Приключения', 'Фантастика'],
    description: 'Захватывающая история о герое, который должен спасти мир от надвигающейся угрозы. Невероятные визуальные эффекты и драматический сюжет держат в напряжении до последней минуты.',
    image: 'https://cdn.poehali.dev/projects/060cd3b5-b014-4ae0-9d99-0609f5c49776/files/8812fd84-2355-43d9-993e-f1def89854fd.jpg'
  };

  const trendingMovies = [
    {
      id: 1,
      title: 'Киберпанк 2077',
      rating: 8.7,
      year: 2024,
      genres: ['Фантастика', 'Триллер'],
      image: 'https://cdn.poehali.dev/projects/060cd3b5-b014-4ae0-9d99-0609f5c49776/files/6c9a8619-7bea-4af5-95e4-b469ff6e85bd.jpg'
    },
    {
      id: 2,
      title: 'Волшебный лес',
      rating: 9.1,
      year: 2024,
      genres: ['Фэнтези', 'Приключения'],
      image: 'https://cdn.poehali.dev/projects/060cd3b5-b014-4ae0-9d99-0609f5c49776/files/a3666d77-d7d5-41f5-bd74-a1e94c8caac6.jpg'
    },
    {
      id: 3,
      title: 'Эпическое приключение',
      rating: 8.9,
      year: 2024,
      genres: ['Боевик', 'Драма'],
      image: 'https://cdn.poehali.dev/projects/060cd3b5-b014-4ae0-9d99-0609f5c49776/files/8812fd84-2355-43d9-993e-f1def89854fd.jpg'
    },
    {
      id: 4,
      title: 'Киберпанк 2077',
      rating: 8.7,
      year: 2024,
      genres: ['Фантастика', 'Боевик'],
      image: 'https://cdn.poehali.dev/projects/060cd3b5-b014-4ae0-9d99-0609f5c49776/files/6c9a8619-7bea-4af5-95e4-b469ff6e85bd.jpg'
    },
    {
      id: 5,
      title: 'Волшебный лес',
      rating: 9.1,
      year: 2024,
      genres: ['Фэнтези', 'Семейный'],
      image: 'https://cdn.poehali.dev/projects/060cd3b5-b014-4ae0-9d99-0609f5c49776/files/a3666d77-d7d5-41f5-bd74-a1e94c8caac6.jpg'
    }
  ];

  const topRatedMovies = [
    { id: 11, title: 'Легенда о драконе', rating: 9.5, year: 2023 },
    { id: 12, title: 'Темная материя', rating: 9.4, year: 2024 },
    { id: 13, title: 'Потерянный мир', rating: 9.3, year: 2023 },
    { id: 14, title: 'Звездный путь', rating: 9.2, year: 2024 },
    { id: 15, title: 'Последний рубеж', rating: 9.1, year: 2023 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                КиноПоиск
              </h1>
              <nav className="hidden md:flex gap-6">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveSection(item)}
                    className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
                      activeSection === item
                        ? 'text-primary border-b-2 border-primary pb-1'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="text"
                  placeholder="Поиск фильмов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 relative overflow-hidden rounded-2xl h-[500px] animate-fade-in">
          <div className="absolute inset-0">
            <img
              src={heroMovie.image}
              alt={heroMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          
          <div className="relative h-full flex items-end p-12">
            <div className="max-w-2xl animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary text-primary-foreground text-lg px-3 py-1">
                  <Icon name="Star" className="inline mr-1" size={16} />
                  {heroMovie.rating}
                </Badge>
                <span className="text-muted-foreground">{heroMovie.year}</span>
                <div className="flex gap-2">
                  {heroMovie.genres.map((genre, idx) => (
                    <Badge key={idx} variant="outline" className="border-primary/50">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-primary/90 to-secondary/80 bg-clip-text text-transparent">
                {heroMovie.title}
              </h2>
              
              <p className="text-lg text-foreground/90 mb-6 leading-relaxed">
                {heroMovie.description}
              </p>
              
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all transform hover:scale-105">
                  <Icon name="Play" className="mr-2" size={20} />
                  Смотреть
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  <Icon name="Info" className="mr-2" size={20} />
                  Подробнее
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold">Сейчас в тренде</h3>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Все фильмы
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trendingMovies.map((movie, idx) => (
              <div
                key={movie.id}
                className="group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-xl mb-3 aspect-[2/3] bg-muted">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-yellow-400 font-bold flex items-center gap-1">
                      <Icon name="Star" size={14} />
                      {movie.rating}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                      <Icon name="Play" className="mr-2" size={16} />
                      Смотреть
                    </Button>
                  </div>
                </div>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {movie.title}
                </h4>
                <p className="text-sm text-muted-foreground">{movie.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold">Топ рейтинга</h3>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Весь рейтинг
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topRatedMovies.map((movie, idx) => (
              <div
                key={movie.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-muted/50 transition-all duration-300 cursor-pointer group border border-border hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-xl">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {movie.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-400 flex items-center gap-1">
                      <Icon name="Star" size={14} />
                      {movie.rating}
                    </span>
                    <span className="text-muted-foreground">{movie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                КиноПоиск
              </h2>
              <p className="text-sm text-muted-foreground">
                Лучшие фильмы и сериалы онлайн
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
