import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, TrendingUp } from 'lucide-react';
import { newsItems } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function MarketNews() {
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);
  const [sentiment, setSentiment] = useState('all');
  const [search, setSearch] = useState('');

  const filteredNews = newsItems.filter((item) => {
    const matchesSentiment = sentiment === 'all' || item.sentiment === sentiment;
    const matchesSearch = item.headline.toLowerCase().includes(search.toLowerCase());
    return matchesSentiment && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Market News</h1>
        <p className="text-muted-foreground mt-1">
          Latest market updates with sentiment analysis and RPN impact.
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-elegant">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sentiment} onValueChange={setSentiment}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiment</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <Card 
            key={item.id} 
            className="shadow-elegant hover:shadow-glow transition-all cursor-pointer hover-scale"
            onClick={() => setSelectedNews(item)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {item.source}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={cn(
                        "text-xs",
                        item.sentiment === 'positive' && "border-success text-success",
                        item.sentiment === 'negative' && "border-destructive text-destructive",
                        item.sentiment === 'neutral' && "border-muted-foreground text-muted-foreground"
                      )}
                    >
                      {item.sentiment}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.headline}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {item.summary}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {item.rpnImpact}%
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">RPN Impact</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* News Detail Dialog */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedNews?.headline}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline">{selectedNews?.source}</Badge>
              <Badge 
                variant="outline"
                className={cn(
                  selectedNews?.sentiment === 'positive' && "border-success text-success",
                  selectedNews?.sentiment === 'negative' && "border-destructive text-destructive",
                  selectedNews?.sentiment === 'neutral' && "border-muted-foreground text-muted-foreground"
                )}
              >
                {selectedNews?.sentiment}
              </Badge>
              <span className="text-xs text-muted-foreground">{selectedNews?.timestamp}</span>
            </div>
            
            <p className="text-muted-foreground">{selectedNews?.summary}</p>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">RPN Impact Confidence</span>
                <span className="text-lg font-bold text-foreground">{selectedNews?.rpnImpact}%</span>
              </div>
            </div>

            <Button className="w-full">
              Analyze Impact on My Portfolio
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
