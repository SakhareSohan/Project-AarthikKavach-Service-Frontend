import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

interface OverviewCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  sparklineData: number[];
}

export function OverviewCard({ 
  title, 
  value, 
  change, 
  isPositive, 
  icon: Icon, 
  sparklineData 
}: OverviewCardProps) {
  const chartData = sparklineData.map((value, index) => ({ value, index }));

  return (
    <Card className="group relative overflow-hidden border-border/60 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover-scale">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-6">
          <div className={cn(
            "p-3 rounded-xl transition-all duration-300",
            isPositive 
              ? "bg-success/10 group-hover:bg-success/15 group-hover:shadow-lg group-hover:shadow-success/10" 
              : "bg-destructive/10 group-hover:bg-destructive/15 group-hover:shadow-lg group-hover:shadow-destructive/10"
          )}>
            <Icon className={cn(
              "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
              isPositive ? "text-success" : "text-destructive"
            )} />
          </div>
          <Badge 
            variant={isPositive ? "default" : "destructive"}
            className={cn(
              "font-semibold text-xs px-2.5 py-1 shadow-sm",
              isPositive && "bg-success hover:bg-success/90"
            )}
          >
            {change}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h3>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
        </div>

        <div className="h-14 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                strokeWidth={2.5}
                dot={false}
                strokeLinecap="round"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
