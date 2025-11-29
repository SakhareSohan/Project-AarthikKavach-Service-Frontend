import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, RefreshCw, Plus, Calendar, BarChart3 } from 'lucide-react';
import { reports } from '@/lib/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function Reports() {
  const { toast } = useToast();
  const [generateOptions, setGenerateOptions] = useState({
    includeCharts: true,
    includeChatInsights: true,
  });

  const handleDownload = (reportId: string) => {
    toast({
      title: 'Download Started',
      description: 'Your report is being downloaded.',
    });
  };

  const handleGenerate = () => {
    toast({
      title: 'Report Generation Started',
      description: 'Your report will be ready in a few moments.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Generated Reports</h1>
          <p className="text-muted-foreground mt-1">
            Download and manage your portfolio analysis reports.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Generate New Report
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="charts" className="cursor-pointer">
                    Include Charts
                  </Label>
                  <Switch
                    id="charts"
                    checked={generateOptions.includeCharts}
                    onCheckedChange={(checked) =>
                      setGenerateOptions({ ...generateOptions, includeCharts: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="insights" className="cursor-pointer">
                    Include AI Chat Insights
                  </Label>
                  <Switch
                    id="insights"
                    checked={generateOptions.includeChatInsights}
                    onCheckedChange={(checked) =>
                      setGenerateOptions({ ...generateOptions, includeChatInsights: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleGenerate} className="w-full">
                Generate Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reports Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="shadow-elegant hover:shadow-glow transition-all">
            <CardContent className="p-0">
              <div className="aspect-video rounded-t-lg overflow-hidden bg-muted">
                <img 
                  src={report.thumbnailUrl} 
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {report.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {report.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-4 h-4" />
                      RPN: {report.rpnSnapshot}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownload(report.id)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
