import { Film, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Movie Intelligence</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight mb-6 animate-fade-in-up stagger-1">
            <span className="gradient-text-hero">PREDICT</span>
            <br />
            <span className="text-foreground">MOVIE SUCCESS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up stagger-2">
            Make data-driven decisions before production begins. Analyze risk factors, 
            estimate revenue potential, and optimize your movie for maximum success.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up stagger-3">
            <Button 
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-8 py-6 text-lg hover:opacity-90 transition-all animate-pulse-glow"
            >
              <Film className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
              {
                icon: TrendingUp,
                title: 'Predict Revenue',
                description: 'ML-powered box office forecasting with 85% accuracy'
              },
              {
                icon: Shield,
                title: 'Assess Risk',
                description: 'Quantify investment risk before committing budget'
              },
              {
                icon: Sparkles,
                title: 'Get Insights',
                description: 'Understand exactly what drives success or failure'
              }
            ].map((feature, i) => (
              <div 
                key={feature.title}
                className="glass-card p-6 text-center hover:bg-muted/20 transition-colors animate-fade-in-up animated-border"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <feature.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
