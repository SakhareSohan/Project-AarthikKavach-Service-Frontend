import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';
import { activityFeed } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export function ActivityFeed() {
  return (
    <Card className="group relative border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2.5 text-xl">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold tracking-tight">Live Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-3">
          {activityFeed.map((event, index) => (
            <div 
              key={event.id}
              className="group/item flex items-start gap-3 p-3.5 rounded-xl hover:bg-muted/60 transition-all duration-200 border border-transparent hover:border-border/50"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative flex-shrink-0 mt-1.5">
                <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/30" />
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground leading-relaxed group-hover/item:text-primary transition-colors">
                      {event.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-medium text-muted-foreground">{event.source}</span>
                      <span className="text-xs text-muted-foreground/50">•</span>
                      <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={event.rpnDelta > 0 ? "destructive" : "default"}
                    className={cn(
                      "flex-shrink-0 font-semibold shadow-sm tabular-nums",
                      event.rpnDelta < 0 && "bg-success hover:bg-success/90"
                    )}
                  >
                    {event.rpnDelta > 0 ? '+' : ''}{event.rpnDelta}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
