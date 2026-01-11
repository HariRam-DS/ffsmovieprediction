import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { MovieInputForm } from '@/components/MovieInputForm';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { MovieInput, PredictionResult } from '@/lib/movieData';
import { predictMovieSuccess } from '@/lib/predictionEngine';
import { Film } from 'lucide-react';

type View = 'hero' | 'input' | 'results';

const Index = () => {
  const [view, setView] = useState<View>('hero');
  const [movieData, setMovieData] = useState<MovieInput | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handleGetStarted = () => {
    setView('input');
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = (movie: MovieInput) => {
    setMovieData(movie);
    const result = predictMovieSuccess(movie);
    setPrediction(result);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setView('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      {view !== 'hero' && (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <button 
              onClick={() => setView('hero')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Film className="w-6 h-6 text-primary" />
              <span className="font-display text-xl text-foreground">MOVIE INTEL</span>
            </button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className={view === 'input' ? 'text-primary' : ''}>Input</span>
              <span>/</span>
              <span className={view === 'results' ? 'text-primary' : ''}>Results</span>
            </div>
          </div>
        </nav>
      )}

      {/* Content */}
      {view === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}

      {view === 'input' && (
        <main className="container mx-auto px-4 py-24 pt-28 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl gradient-text mb-4">
              ANALYZE YOUR MOVIE
            </h1>
            <p className="text-muted-foreground">
              Enter your movie details to get AI-powered success predictions
            </p>
          </div>
          <div className="glass-card p-8">
            <MovieInputForm onSubmit={handleAnalyze} />
          </div>
        </main>
      )}

      {view === 'results' && movieData && prediction && (
        <main className="container mx-auto px-4 py-24 pt-28 max-w-6xl">
          <ResultsDashboard 
            movie={movieData} 
            result={prediction} 
            onBack={handleBack}
          />
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Film className="w-5 h-5 text-primary" />
            <span className="font-display text-lg text-foreground">MOVIE SUCCESS INTELLIGENCE</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Powered by Machine Learning • Real-world Movie Data Analytics
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
