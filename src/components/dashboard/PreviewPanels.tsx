import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MessageSquare, Newspaper, FileText, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chatMessages, newsItems, reports } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function PreviewPanels() {
  const navigate = useNavigate();
  const lastMessage = chatMessages[chatMessages.length - 1];
  const latestNews = newsItems.slice(0, 3);
  const latestReport = reports[0];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* AI Chat Preview */}
      <Card className="group relative overflow-hidden border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover-scale">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="relative pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            AI Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-3">
            <div className="p-3.5 bg-muted/50 rounded-xl border border-border/30">
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {lastMessage.content}
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              onClick={() => navigate('/chat')}
            >
              Open Chat 
              <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Market News Preview */}
      <Card className="group relative overflow-hidden border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover-scale">
        <div className="absolute inset-0 bg-gradient-to-br from-success/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="relative pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-success/10 group-hover:bg-success/15 transition-colors">
              <Newspaper className="w-4 h-4 text-success" />
            </div>
            Market News
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-2.5">
            {latestNews.map((news) => (
              <div key={news.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs flex-shrink-0 mt-0.5 font-medium",
                    news.sentiment === 'positive' && "border-success/50 text-success bg-success/5",
                    news.sentiment === 'negative' && "border-destructive/50 text-destructive bg-destructive/5",
                    news.sentiment === 'neutral' && "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {news.sentiment}
                </Badge>
                <p className="text-xs text-foreground line-clamp-1 font-medium">{news.headline}</p>
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 group/btn hover:bg-success hover:text-success-foreground hover:border-success transition-all"
              onClick={() => navigate('/news')}
            >
              View All 
              <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Preview */}
      <Card className="group relative overflow-hidden border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover-scale">
        <div className="absolute inset-0 bg-gradient-to-br from-warning/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="relative pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-warning/10 group-hover:bg-warning/15 transition-colors">
              <FileText className="w-4 h-4 text-warning" />
            </div>
            Latest Report
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-3">
            <div className="aspect-video rounded-xl bg-muted overflow-hidden border border-border/30 shadow-sm">
              <img 
                src={latestReport.thumbnailUrl} 
                alt={latestReport.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                {latestReport.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium">{latestReport.date}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full group/btn hover:bg-warning hover:text-warning-foreground hover:border-warning transition-all"
              onClick={() => navigate('/reports')}
            >
              View Reports 
              <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Graphics Preview */}
      <Card className="group relative overflow-hidden border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover-scale">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="relative pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-accent/10 group-hover:bg-accent/15 transition-colors">
              <BarChart3 className="w-4 h-4 text-accent" />
            </div>
            Graphics
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="aspect-square rounded-xl gradient-primary opacity-60 group-hover:opacity-80 transition-opacity shadow-sm" />
              <div className="aspect-square rounded-xl gradient-success opacity-60 group-hover:opacity-80 transition-opacity shadow-sm" />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full group/btn hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
              onClick={() => navigate('/graphics')}
            >
              View All 
              <ArrowRight className="ml-2 w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
