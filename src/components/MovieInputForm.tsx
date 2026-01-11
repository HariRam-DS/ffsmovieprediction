import { useState } from 'react';
import { MovieInput, genres, languages } from '@/lib/movieData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Film, 
  DollarSign, 
  Clock, 
  Calendar, 
  Star, 
  Users, 
  MessageSquare, 
  TrendingUp,
  HelpCircle,
  Sparkles,
  Clapperboard,
  Award
} from 'lucide-react';

interface MovieInputFormProps {
  onSubmit: (movie: MovieInput) => void;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function MovieInputForm({ onSubmit }: MovieInputFormProps) {
  const [formData, setFormData] = useState<MovieInput>({
    title: '',
    genre: 'Action',
    language: 'English',
    budget: 80,
    runtime: 120,
    releaseMonth: 7,
    leadActorPopularity: 65,
    directorScore: 60,
    trailerSentiment: 0.5,
    socialBuzz: 55,
    sequelOrFranchise: false,
    hasAwardWinningCrew: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const InputTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-flex items-center gap-1 cursor-help">
          {children}
          <HelpCircle className="w-3 h-3 text-muted-foreground" />
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-popover border-border">
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Movie Title */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-foreground">
          <Film className="w-4 h-4 text-primary" />
          Movie Title
        </Label>
        <Input
          placeholder="Enter movie title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="bg-muted/50 border-border focus:border-primary transition-colors"
        />
      </div>

      {/* Genre & Language Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-foreground">
            <Clapperboard className="w-4 h-4 text-primary" />
            <InputTooltip content="Genre affects historical success rate. Action, Animation, and Sci-Fi typically perform well.">
              Genre
            </InputTooltip>
          </Label>
          <Select 
            value={formData.genre} 
            onValueChange={(value) => setFormData({ ...formData, genre: value })}
          >
            <SelectTrigger className="bg-muted/50 border-border">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-foreground">
            <MessageSquare className="w-4 h-4 text-primary" />
            <InputTooltip content="Primary language affects global market reach.">
              Language
            </InputTooltip>
          </Label>
          <Select 
            value={formData.language} 
            onValueChange={(value) => setFormData({ ...formData, language: value })}
          >
            <SelectTrigger className="bg-muted/50 border-border">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>{lang}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Budget & Runtime Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-foreground">
              <DollarSign className="w-4 h-4 text-primary" />
              <InputTooltip content="Higher budgets require stronger performance to break even.">
                Budget
              </InputTooltip>
            </Label>
            <span className="text-sm font-semibold text-primary">${formData.budget}M</span>
          </div>
          <Slider
            value={[formData.budget]}
            onValueChange={([value]) => setFormData({ ...formData, budget: value })}
            min={5}
            max={300}
            step={5}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$5M</span>
            <span>$300M</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <InputTooltip content="Optimal runtime is 90-150 minutes for most genres.">
                Runtime
              </InputTooltip>
            </Label>
            <span className="text-sm font-semibold text-primary">{formData.runtime} min</span>
          </div>
          <Slider
            value={[formData.runtime]}
            onValueChange={([value]) => setFormData({ ...formData, runtime: value })}
            min={60}
            max={210}
            step={5}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>60 min</span>
            <span>210 min</span>
          </div>
        </div>
      </div>

      {/* Release Month */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <InputTooltip content="Summer (May-July) and holidays (Nov-Dec) are prime release windows.">
              Release Month
            </InputTooltip>
          </Label>
          <span className="text-sm font-semibold text-primary">{monthNames[formData.releaseMonth - 1]}</span>
        </div>
        <Slider
          value={[formData.releaseMonth]}
          onValueChange={([value]) => setFormData({ ...formData, releaseMonth: value })}
          min={1}
          max={12}
          step={1}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Jan</span>
          <span>Dec</span>
        </div>
      </div>

      {/* Actor & Director Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-foreground">
              <Star className="w-4 h-4 text-primary" />
              <InputTooltip content="Based on social media following, past box office, and audience recognition.">
                Lead Actor Popularity
              </InputTooltip>
            </Label>
            <span className="text-sm font-semibold text-primary">{formData.leadActorPopularity}%</span>
          </div>
          <Slider
            value={[formData.leadActorPopularity]}
            onValueChange={([value]) => setFormData({ ...formData, leadActorPopularity: value })}
            min={0}
            max={100}
            step={1}
            className="py-2"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-foreground">
              <Users className="w-4 h-4 text-primary" />
              <InputTooltip content="Director's track record based on past film performance.">
                Director Score
              </InputTooltip>
            </Label>
            <span className="text-sm font-semibold text-primary">{formData.directorScore}%</span>
          </div>
          <Slider
            value={[formData.directorScore]}
            onValueChange={([value]) => setFormData({ ...formData, directorScore: value })}
            min={0}
            max={100}
            step={1}
            className="py-2"
          />
        </div>
      </div>

      {/* Trailer Sentiment & Social Buzz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <InputTooltip content="Sentiment analysis of trailer comments and reactions (-100 to +100).">
                Trailer Sentiment
              </InputTooltip>
            </Label>
            <span className={`text-sm font-semibold ${formData.trailerSentiment > 0 ? 'text-success' : formData.trailerSentiment < 0 ? 'text-danger' : 'text-muted-foreground'}`}>
              {formData.trailerSentiment > 0 ? '+' : ''}{(formData.trailerSentiment * 100).toFixed(0)}%
            </span>
          </div>
          <Slider
            value={[formData.trailerSentiment]}
            onValueChange={([value]) => setFormData({ ...formData, trailerSentiment: value })}
            min={-1}
            max={1}
            step={0.05}
            className="py-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Negative</span>
            <span>Positive</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2 text-foreground">
              <TrendingUp className="w-4 h-4 text-primary" />
              <InputTooltip content="Social media mentions, hashtag activity, and online buzz score.">
                Social Buzz Score
              </InputTooltip>
            </Label>
            <span className="text-sm font-semibold text-primary">{formData.socialBuzz}%</span>
          </div>
          <Slider
            value={[formData.socialBuzz]}
            onValueChange={([value]) => setFormData({ ...formData, socialBuzz: value })}
            min={0}
            max={100}
            step={1}
            className="py-2"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
          <div className="flex items-center gap-3">
            <Film className="w-5 h-5 text-primary" />
            <div>
              <Label className="text-foreground">Sequel / Franchise</Label>
              <p className="text-xs text-muted-foreground">Part of existing IP</p>
            </div>
          </div>
          <Switch
            checked={formData.sequelOrFranchise}
            onCheckedChange={(checked) => setFormData({ ...formData, sequelOrFranchise: checked })}
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-primary" />
            <div>
              <Label className="text-foreground">Award-Winning Crew</Label>
              <p className="text-xs text-muted-foreground">Oscar/Emmy winners</p>
            </div>
          </div>
          <Switch
            checked={formData.hasAwardWinningCrew}
            onCheckedChange={(checked) => setFormData({ ...formData, hasAwardWinningCrew: checked })}
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        size="lg"
        className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-primary"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Analyze Movie Success
      </Button>
    </form>
  );
}
