import { Wallet, TrendingUp, DollarSign, Bell, AlertCircle } from 'lucide-react';
import { OverviewCard } from '@/components/dashboard/OverviewCard';
import { RiskMeter } from '@/components/dashboard/RiskMeter';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { PreviewPanels } from '@/components/dashboard/PreviewPanels';
import { useZerodhaAuth } from '@/contexts/ZerodhaAuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FinancialProfileForm } from '@/components/profile/FinancialProfileForm';
import { createProfile } from '@/services/profileService';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const iconMap = {
  'Total Portfolio Value': Wallet,
  'Current RPN': TrendingUp,
  'Daily Change': TrendingUp,
  'Cash Balance': DollarSign,
  'Alerts': Bell,
};

export default function Dashboard() {
  const { isConnected, profileData, connectWithZerodha, fetchProfile } = useZerodhaAuth();
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Show "User" if not connected or profile not loaded, otherwise show first name
  const firstName = (isConnected && profileData) 
    ? profileData.user.name.split(' ')[0] 
    : 'User';

  // Check if onboarding is needed whenever profileData changes
  useEffect(() => {
    if (profileData) {
      const needsOnboarding = 
        !profileData.user_financial_profile ||
        (profileData.user_financial_profile.income_per_month === 0 &&
         profileData.user_financial_profile.expenditure === 0 &&
         profileData.user_financial_profile.invest_per_month === 0);
      
      setShowOnboardingModal(needsOnboarding);
    }
  }, [profileData]);

  const handleOnboardingSubmit = async (formData: {
    income_per_month?: number;
    expenditure?: number;
    additional_expenses?: number;
    living_cost?: number;
    invest_per_month?: number;
    saving_per_month?: number;
    saving_rate?: number;
    risk_tolerance?: 'low' | 'moderate' | 'high';
    invest_cycle_date?: Date;
  }) => {
    if (!profileData) return;

    try {
      const payload = {
        user: {
          name: profileData.user.name,
          email: profileData.user.email,
          image_url: profileData.user.image_url,
        },
        user_profile: profileData.user_profile,
        user_financial_profile: {
          income_per_month: formData.income_per_month ?? 0,
          expenditure: formData.expenditure ?? 0,
          additional_expenses: formData.additional_expenses ?? 0,
          living_cost: formData.living_cost ?? 0,
          invest_per_month: formData.invest_per_month ?? 0,
          saving_per_month: formData.saving_per_month ?? 0,
          saving_rate: formData.saving_rate ?? 0,
          risk_tolerance: formData.risk_tolerance ?? 'moderate',
          invest_cycle_date: formData.invest_cycle_date ? format(formData.invest_cycle_date, 'yyyy-MM-dd') : '',
        },
        exchanges: profileData.exchanges,
      };

      await createProfile(payload);
      toast.success('Financial profile created successfully!');
      setShowOnboardingModal(false);
      await fetchProfile();
    } catch (error) {
      console.error('Failed to create profile:', error);
      toast.error('Failed to create profile. Please try again.');
    }
  };

  const handleSkipOnboarding = () => {
    setShowOnboardingModal(false);
    toast.info('You can complete your profile later from the Profile page');
  };

  // Prepare dashboard cards from portfolio_snapshot
  const dashboardCards = profileData?.portfolio_snapshot ? [
    {
      id: '1',
      title: 'Total Portfolio Value',
      value: `₹${profileData.portfolio_snapshot.total_portfolio_value_inr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
      change: '—',
      isPositive: true,
      sparklineData: [0, 0, 0, 0, 0],
    },
    {
      id: '2',
      title: 'Equity Value',
      value: `₹${profileData.portfolio_snapshot.equity_value_inr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
      change: '—',
      isPositive: true,
      sparklineData: [0, 0, 0, 0, 0],
    },
    {
      id: '3',
      title: 'Mutual Funds Value',
      value: `₹${profileData.portfolio_snapshot.mf_value_inr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
      change: '—',
      isPositive: true,
      sparklineData: [0, 0, 0, 0, 0],
    },
    {
      id: '4',
      title: 'Last Updated',
      value: new Date(profileData.portfolio_snapshot.snapshot_date).toLocaleDateString('en-IN'),
      change: '',
      isPositive: true,
      sparklineData: [0, 0, 0, 0, 0],
    },
  ] : [];

  return (
    <div className="space-y-8">
      {/* Header with gradient */}
      <div className="relative">
        <div className="absolute inset-0 gradient-primary opacity-5 rounded-2xl blur-3xl" />
        <div className="relative space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            {getGreeting()}, {firstName}
          </h1>
          <p className="text-muted-foreground text-base">
            Here's your portfolio overview.
          </p>
        </div>
      </div>

      {/* Connection Banner */}
      {!isConnected && (
        <Card className="border-amber-500/50 bg-amber-500/5">
          <div className="p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                  Connect with Zerodha to view your portfolio
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Connect your Zerodha account to access real-time portfolio data and analytics
                </p>
              </div>
            </div>
            <Button onClick={connectWithZerodha} className="shrink-0">
              Connect Now
            </Button>
          </div>
        </Card>
      )}

      {/* Overview Cards */}
      {isConnected && profileData ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {dashboardCards.map((card) => {
          const Icon = iconMap[card.title as keyof typeof iconMap] || Wallet;
          return (
            <OverviewCard
              key={card.id}
              title={card.title}
              value={card.value}
              change={card.change}
              isPositive={card.isPositive}
              icon={Icon}
              sparklineData={card.sparklineData}
            />
          );
        })}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 opacity-50 pointer-events-none blur-sm">
          <OverviewCard title="Portfolio Value" value="₹•••,•••" change="—" isPositive={true} icon={Wallet} sparklineData={[0, 0, 0, 0, 0]} />
          <OverviewCard title="Equity Value" value="₹•••,•••" change="—" isPositive={true} icon={TrendingUp} sparklineData={[0, 0, 0, 0, 0]} />
          <OverviewCard title="Mutual Funds" value="₹•••,•••" change="—" isPositive={true} icon={DollarSign} sparklineData={[0, 0, 0, 0, 0]} />
          <OverviewCard title="Last Updated" value="—" change="" isPositive={true} icon={Bell} sparklineData={[0, 0, 0, 0, 0]} />
        </div>
      )}

      {/* Risk Meter and Activity Feed */}
      <div className={`grid lg:grid-cols-3 gap-6 ${!isConnected ? 'opacity-50 pointer-events-none blur-sm' : ''}`}>
        <RiskMeter rpnValue={427} />
        <ActivityFeed />
      </div>

      {/* Preview Panels */}
      <div className={`space-y-5 ${!isConnected ? 'opacity-50 pointer-events-none blur-sm' : ''}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Quick Access</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent ml-6" />
        </div>
        <PreviewPanels />
      </div>

      {/* Financial Profile Onboarding Modal */}
      <Dialog open={showOnboardingModal} onOpenChange={setShowOnboardingModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Financial Profile</DialogTitle>
            <DialogDescription>
              Help us understand your financial situation to provide personalized insights and recommendations.
            </DialogDescription>
          </DialogHeader>
          <FinancialProfileForm
            initialData={{
              income_per_month: 0,
              expenditure: 0,
              additional_expenses: 0,
              living_cost: 0,
              invest_per_month: 0,
              saving_per_month: 0,
              saving_rate: 0,
              risk_tolerance: 'moderate' as const,
              invest_cycle_date: new Date(),
            }}
            onSubmit={handleOnboardingSubmit}
            onCancel={handleSkipOnboarding}
            showSkipButton={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
