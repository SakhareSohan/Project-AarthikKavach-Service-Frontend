import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, AlertTriangle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { topRiskFactors } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface RiskMeterProps {
  rpnValue: number;
}

export function RiskMeter({ rpnValue }: RiskMeterProps) {
  // Calculate the percentage and color based on RPN (1-1000 scale)
  const percentage = (rpnValue / 1000) * 100;
  const rotation = (percentage / 100) * 180 - 90; // -90 to 90 degrees
  
  const getRiskLevel = () => {
    if (rpnValue < 300) return { text: 'Low Risk', color: 'text-success', bg: 'bg-success' };
    if (rpnValue < 600) return { text: 'Moderate Risk', color: 'text-warning', bg: 'bg-warning' };
    return { text: 'High Risk', color: 'text-destructive', bg: 'bg-destructive' };
  };

  const riskLevel = getRiskLevel();

  return (
    <Card className="group relative col-span-full lg:col-span-2 overflow-hidden border-border/60 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold tracking-tight">Risk Protection Number</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-2.5 hover:bg-muted/80 rounded-lg transition-all hover:scale-105">
                  <Info className="w-4 h-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3">
                <p className="text-sm leading-relaxed">
                  RPN is calculated based on portfolio volatility, concentration risk, market conditions,
                  and your personal risk profile. Lower values indicate lower risk.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Gauge */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-52 h-52 group/gauge">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/5 blur-2xl scale-110 opacity-0 group-hover/gauge:opacity-100 transition-opacity duration-500" />
              
              {/* Background arc */}
              <svg className="w-full h-full transform -rotate-90 relative" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="16"
                  strokeDasharray="251.2 251.2"
                  strokeDashoffset="125.6"
                  opacity="0.2"
                />
                {/* Color gradient arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#riskGradient)"
                  strokeWidth="16"
                  strokeDasharray="251.2 251.2"
                  strokeDashoffset={125.6 - (percentage / 100) * 125.6}
                  strokeLinecap="round"
                  className="transition-all duration-1000 drop-shadow-lg"
                  style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.3))' }}
                />
                <defs>
                  <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--success))" />
                    <stop offset="50%" stopColor="hsl(var(--warning))" />
                    <stop offset="100%" stopColor="hsl(var(--destructive))" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Needle */}
              <div 
                className="absolute top-1/2 left-1/2 w-1 h-20 bg-foreground rounded-full origin-bottom transition-transform duration-1000 shadow-lg"
                style={{ 
                  transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
                }}
              />
              
              {/* Center circle with glass effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 rounded-full glass-strong border-2 border-border/30 flex flex-col items-center justify-center shadow-xl">
                  <div className="text-3xl font-bold text-foreground tracking-tight">{rpnValue}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">RPN</div>
                </div>
              </div>
            </div>
            
            <Badge className={cn("mt-6 px-5 py-2 text-sm font-semibold shadow-lg", riskLevel.bg)}>
              {riskLevel.text}
            </Badge>
          </div>

          {/* Risk Factors */}
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-lg bg-muted/50">
                <AlertTriangle className="w-4 h-4 text-warning" />
              </div>
              <span className="text-sm font-semibold text-foreground">Top Risk Contributors</span>
            </div>
            
            {topRiskFactors.map((factor, index) => (
              <div key={index} className="space-y-2.5 group/factor">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground group-hover/factor:text-primary transition-colors">{factor.name}</span>
                  <span className="text-muted-foreground font-medium tabular-nums">{factor.contribution}%</span>
                </div>
                <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-700 shadow-sm",
                      factor.severity === 'high' && "bg-gradient-to-r from-destructive to-destructive/80",
                      factor.severity === 'medium' && "bg-gradient-to-r from-warning to-warning/80",
                      factor.severity === 'low' && "bg-gradient-to-r from-success to-success/80"
                    )}
                    style={{ width: `${factor.contribution}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-5 mt-4 border-t border-border/50">
              <div className="text-xs text-muted-foreground leading-relaxed p-3 rounded-lg bg-muted/30">
                <p>
                  Your RPN has decreased by <span className="font-semibold text-success">15 points</span> this week due to reduced market volatility 
                  and better portfolio diversification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
