import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CalendarIcon, AlertCircle, Info } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const financialProfileSchema = z.object({
  income_per_month: z.number().min(1, 'Income is required and must be greater than 0'),
  expenditure: z.number().min(0, 'Expenditure must be 0 or greater'),
  additional_expenses: z.number().min(0).optional(),
  living_cost: z.number().min(0).optional(),
  invest_per_month: z.number().min(0).optional(),
  saving_per_month: z.number().optional(),
  saving_rate: z.number().min(0).max(100).optional(),
  risk_tolerance: z.enum(['low', 'moderate', 'high']),
  invest_cycle_date: z.date(),
});

type FinancialProfileFormData = z.infer<typeof financialProfileSchema>;

interface FinancialProfileFormProps {
  initialData?: Partial<FinancialProfileFormData>;
  onSubmit: (data: FinancialProfileFormData) => Promise<void>;
  onCancel?: () => void;
  showSkipButton?: boolean;
}

export function FinancialProfileForm({ initialData, onSubmit, onCancel, showSkipButton = false }: FinancialProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNegativeSavingWarning, setShowNegativeSavingWarning] = useState(false);
  const [suggestedRiskTolerance, setSuggestedRiskTolerance] = useState<string>('moderate');

  const form = useForm<FinancialProfileFormData>({
    resolver: zodResolver(financialProfileSchema),
    defaultValues: {
      income_per_month: initialData?.income_per_month || 0,
      expenditure: initialData?.expenditure || 0,
      additional_expenses: initialData?.additional_expenses || 0,
      living_cost: initialData?.living_cost || 0,
      invest_per_month: initialData?.invest_per_month || 0,
      saving_per_month: initialData?.saving_per_month,
      saving_rate: initialData?.saving_rate,
      risk_tolerance: initialData?.risk_tolerance || 'moderate',
      invest_cycle_date: initialData?.invest_cycle_date || new Date(),
    },
  });

  const watchedFields = form.watch(['income_per_month', 'expenditure', 'additional_expenses', 'living_cost', 'invest_per_month']);

  // Auto-calculate saving_per_month and saving_rate
  useEffect(() => {
    const income = watchedFields[0] || 0;
    const expenditure = watchedFields[1] || 0;
    const additionalExpenses = watchedFields[2] || 0;
    const invest = watchedFields[4] || 0;

    const calculatedSaving = income - expenditure - additionalExpenses - invest;
    const calculatedSavingRate = income > 0 ? (calculatedSaving / income) * 100 : 0;

    form.setValue('saving_per_month', calculatedSaving);
    form.setValue('saving_rate', Math.max(0, calculatedSavingRate));

    setShowNegativeSavingWarning(calculatedSaving < 0);

    // Calculate suggested risk tolerance based on saving rate
    if (calculatedSavingRate >= 30) {
      setSuggestedRiskTolerance('high');
    } else if (calculatedSavingRate >= 15) {
      setSuggestedRiskTolerance('moderate');
    } else {
      setSuggestedRiskTolerance('low');
    }
  }, [watchedFields, form]);

  const formatNumberInput = (value: string) => {
    // Remove commas while typing
    return value.replace(/,/g, '');
  };

  const displayNumberWithCommas = (value: number) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  const handleSubmit = async (data: FinancialProfileFormData) => {
    if (data.income_per_month <= 0) {
      toast({
        title: "Invalid Income",
        description: "Income per month must be greater than 0",
        variant: "destructive",
      });
      return;
    }

    if (showNegativeSavingWarning) {
      const confirmed = window.confirm(
        'Your expenses exceed your income, resulting in negative savings. Are you sure you want to proceed?'
      );
      if (!confirmed) return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast({
        title: "Success",
        description: "Financial profile updated successfully",
      });
    } catch (error) {
      console.error('Failed to save financial profile:', error);
      toast({
        title: "Error",
        description: "Failed to save financial profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle>Update Financial Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Income per month */}
              <FormField
                control={form.control}
                name="income_per_month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Income per Month *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100000"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(formatNumberInput(e.target.value)) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expenditure */}
              <FormField
                control={form.control}
                name="expenditure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expenditure *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="60000"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(formatNumberInput(e.target.value)) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional Expenses */}
              <FormField
                control={form.control}
                name="additional_expenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Expenses</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5000"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(formatNumberInput(e.target.value)) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Living Cost */}
              <FormField
                control={form.control}
                name="living_cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Living Cost</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="30000"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(formatNumberInput(e.target.value)) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Invest per Month */}
              <FormField
                control={form.control}
                name="invest_per_month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invest per Month</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="15000"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(formatNumberInput(e.target.value)) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Saving per Month (auto-calculated) */}
              <FormField
                control={form.control}
                name="saving_per_month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saving per Month</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Auto-calculated"
                        {...field}
                        value={field.value || 0}
                        onChange={(e) => field.onChange(parseFloat(formatNumberInput(e.target.value)) || 0)}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Auto-calculated (editable)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Saving Rate (read-only with override) */}
              <FormField
                control={form.control}
                name="saving_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saving Rate (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        value={field.value?.toFixed(2) || 0}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Auto-calculated (can override)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Risk Tolerance */}
              <FormField
                control={form.control}
                name="risk_tolerance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Tolerance</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk tolerance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Suggested: {suggestedRiskTolerance}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Invest Cycle Date */}
              <FormField
                control={form.control}
                name="invest_cycle_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Invest Cycle Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Warning for negative savings */}
            {showNegativeSavingWarning && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Warning: Your expenses exceed your income, resulting in negative savings. Please review your financial entries.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              {showSkipButton && (
                <Button type="button" variant="ghost" onClick={handleSkip}>
                  Skip
                </Button>
              )}
              {onCancel && !showSkipButton && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
