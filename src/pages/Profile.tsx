import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Edit, User as UserIcon, Briefcase, DollarSign } from 'lucide-react';
import { FinancialProfileForm } from '@/components/profile/FinancialProfileForm';
import { toast } from 'sonner';
import { useZerodhaAuth } from '@/contexts/ZerodhaAuthContext';
import { updateFinancialProfile } from '@/services/profileService';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

export default function Profile() {
  const { isConnected, connectWithZerodha, userId, profileData, fetchProfile, isLoading } = useZerodhaAuth();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleFinancialProfileSubmit = async (data: {
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
    if (!userId) {
      toast.error("User ID not found. Please reconnect with Zerodha.");
      return;
    }

    try {
      const formattedData = {
        income_per_month: data.income_per_month ?? 0,
        expenditure: data.expenditure ?? 0,
        additional_expenses: data.additional_expenses ?? 0,
        living_cost: data.living_cost ?? 0,
        invest_per_month: data.invest_per_month ?? 0,
        saving_per_month: data.saving_per_month ?? 0,
        saving_rate: data.saving_rate ?? 0,
        risk_tolerance: data.risk_tolerance ?? 'moderate',
        invest_cycle_date: data.invest_cycle_date ? format(data.invest_cycle_date, 'yyyy-MM-dd') : '',
      };

      await updateFinancialProfile(userId, formattedData);
      await fetchProfile();
      
      toast.success("Financial profile updated successfully");
      setShowEditForm(false);
    } catch (error) {
      console.error('Failed to update financial profile:', error);
      toast.error("Failed to update financial profile. Please try again.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl pb-8">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  // Show connection prompt if not connected
  if (!isConnected || !profileData) {
    return (
      <div className="space-y-6 max-w-7xl pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and financial information
          </p>
        </div>
        <Card className="border-amber-500/50 bg-amber-500/5">
          <div className="p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                  Connect with Zerodha to access your profile
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Your profile data will be synced after connecting your Zerodha account
                </p>
              </div>
            </div>
            <Button onClick={connectWithZerodha} className="shrink-0">
              Connect Now
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const { user, user_profile, user_financial_profile } = profileData;

  return (
    <div className="space-y-6 max-w-7xl pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and financial information
        </p>
      </div>

      {/* User Information Section */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-primary" />
            <CardTitle>User Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.image_url} alt={user.name} />
              <AvatarFallback className="text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Name</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Profile Section */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <CardTitle>Professional Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Profession</p>
              <p className="text-lg font-semibold">{user_profile.profession || '—'}</p>
            </div>
            {user_profile.age && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Age</p>
                <p className="text-lg font-semibold">{user_profile.age}</p>
              </div>
            )}
            {user_profile.gender && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Gender</p>
                <p className="text-lg font-semibold capitalize">{user_profile.gender}</p>
              </div>
            )}
            {user_profile.designation && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Designation</p>
                <p className="text-lg font-semibold">{user_profile.designation}</p>
              </div>
            )}
            {user_profile.job_level && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Job Level</p>
                <p className="text-lg font-semibold">{user_profile.job_level}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground mb-1">Primary Earner</p>
              <div className="mt-1">
                {user_profile.is_primary_earner ? (
                  <Badge variant="secondary">Yes</Badge>
                ) : (
                  <Badge variant="outline">No</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Profile Section */}
      <Card className="shadow-elegant">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <CardTitle>Financial Profile</CardTitle>
          </div>
          {user_financial_profile && !showEditForm && (
            <Button variant="outline" size="sm" onClick={() => setShowEditForm(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {showEditForm ? (
            <FinancialProfileForm
              initialData={user_financial_profile ? {
                income_per_month: user_financial_profile.income_per_month,
                expenditure: user_financial_profile.expenditure,
                additional_expenses: user_financial_profile.additional_expenses,
                living_cost: user_financial_profile.living_cost,
                invest_per_month: user_financial_profile.invest_per_month,
                saving_per_month: user_financial_profile.saving_per_month,
                saving_rate: user_financial_profile.saving_rate,
                risk_tolerance: user_financial_profile.risk_tolerance as 'low' | 'moderate' | 'high',
                invest_cycle_date: new Date(user_financial_profile.invest_cycle_date),
              } : undefined}
              onSubmit={handleFinancialProfileSubmit}
              onCancel={() => setShowEditForm(false)}
            />
          ) : user_financial_profile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Income</p>
                <p className="text-lg font-semibold">{formatCurrency(user_financial_profile.income_per_month)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Expenditure</p>
                <p className="text-lg font-semibold">{formatCurrency(user_financial_profile.expenditure)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Additional Expenses</p>
                <p className="text-lg font-semibold">{formatCurrency(user_financial_profile.additional_expenses)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Living Cost</p>
                <p className="text-lg font-semibold">{formatCurrency(user_financial_profile.living_cost)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Investment</p>
                <p className="text-lg font-semibold">{formatCurrency(user_financial_profile.invest_per_month)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Savings</p>
                <p className="text-lg font-semibold">{formatCurrency(user_financial_profile.saving_per_month)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Saving Rate</p>
                <p className="text-lg font-semibold">{user_financial_profile.saving_rate}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Risk Tolerance</p>
                <p className="text-lg font-semibold uppercase">{user_financial_profile.risk_tolerance}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Investment Cycle Date</p>
                <p className="text-lg font-semibold">{formatDate(user_financial_profile.invest_cycle_date)}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Complete your financial profile to see insights</p>
              <Button onClick={() => setShowEditForm(true)}>
                Add Financial Profile
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exchanges Section */}
      {profileData.exchanges && profileData.exchanges.length > 0 && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Connected Exchanges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profileData.exchanges.map((exchange) => (
                <Badge key={exchange} variant="secondary" className="text-sm">
                  {exchange}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
