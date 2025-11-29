// Mock data for Aarthik Kavach dashboard

export interface PortfolioCard {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  sparklineData: number[];
}

export interface RiskFactor {
  name: string;
  contribution: number;
  severity: 'low' | 'medium' | 'high';
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  rpnDelta: number;
}

export interface NewsItem {
  id: string;
  source: string;
  headline: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  rpnImpact: number;
  timestamp: string;
}

export interface Report {
  id: string;
  title: string;
  date: string;
  rpnSnapshot: number;
  thumbnailUrl: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface HoldingData {
  name: string;
  value: number;
  change: number;
}

export const portfolioCards: PortfolioCard[] = [
  {
    id: '1',
    title: 'Total Portfolio Value',
    value: '₹24,85,320',
    change: '+12.4%',
    isPositive: true,
    sparklineData: [20, 22, 21, 25, 24, 26, 28, 27, 30, 29, 31, 30],
  },
  {
    id: '2',
    title: 'Current RPN',
    value: '427',
    change: '-15',
    isPositive: false,
    sparklineData: [450, 445, 440, 442, 438, 435, 430, 432, 428, 425, 427, 427],
  },
  {
    id: '3',
    title: 'Daily Change',
    value: '+2.8%',
    change: '+₹68,425',
    isPositive: true,
    sparklineData: [0, 0.5, 1.2, 0.8, 1.5, 2.1, 1.8, 2.3, 2.5, 2.6, 2.7, 2.8],
  },
  {
    id: '4',
    title: 'Cash Balance',
    value: '₹3,45,680',
    change: 'Available',
    isPositive: true,
    sparklineData: [3.2, 3.3, 3.4, 3.35, 3.4, 3.42, 3.43, 3.44, 3.45, 3.45, 3.46, 3.46],
  },
];

export const topRiskFactors: RiskFactor[] = [
  { name: 'Market Volatility', contribution: 35, severity: 'high' },
  { name: 'Portfolio Concentration', contribution: 28, severity: 'medium' },
  { name: 'Sector Exposure', contribution: 22, severity: 'medium' },
];

export const activityFeed: ActivityEvent[] = [
  {
    id: '1',
    timestamp: '2 minutes ago',
    source: 'Market News',
    message: 'Tech sector volatility increased',
    rpnDelta: 12,
  },
  {
    id: '2',
    timestamp: '15 minutes ago',
    source: 'Portfolio',
    message: 'Reliance Industries added to portfolio',
    rpnDelta: -8,
  },
  {
    id: '3',
    timestamp: '1 hour ago',
    source: 'Market News',
    message: 'RBI announces rate cut',
    rpnDelta: -15,
  },
  {
    id: '4',
    timestamp: '2 hours ago',
    source: 'Portfolio',
    message: 'Stop loss triggered on TCS',
    rpnDelta: 5,
  },
];

export const newsItems: NewsItem[] = [
  {
    id: '1',
    source: 'Economic Times',
    headline: 'Indian IT sector shows strong quarterly growth',
    summary: 'Major IT companies report better-than-expected earnings...',
    sentiment: 'positive',
    rpnImpact: 85,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    source: 'Moneycontrol',
    headline: 'Banking stocks under pressure amid regulatory concerns',
    summary: 'RBI tightens lending norms affecting major banks...',
    sentiment: 'negative',
    rpnImpact: 72,
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    source: 'Bloomberg',
    headline: 'Global market uncertainty impacts Indian indices',
    summary: 'Geopolitical tensions create volatility in emerging markets...',
    sentiment: 'neutral',
    rpnImpact: 60,
    timestamp: '6 hours ago',
  },
];

export const reports: Report[] = [
  {
    id: '1',
    title: 'Monthly Portfolio Analysis - November 2024',
    date: '2024-11-01',
    rpnSnapshot: 427,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    description: 'Comprehensive analysis of portfolio performance and risk metrics',
  },
  {
    id: '2',
    title: 'Risk Correction Recommendations',
    date: '2024-10-28',
    rpnSnapshot: 442,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    description: 'AI-generated suggestions to reduce portfolio risk',
  },
  {
    id: '3',
    title: 'Quarterly Insights Q4 2024',
    date: '2024-10-15',
    rpnSnapshot: 438,
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
    description: 'Quarter-end summary with AI insights and forecasts',
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your AI investment assistant. How can I help you today?',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    role: 'user',
    content: 'What\'s my current RPN and what does it mean?',
    timestamp: '10:31 AM',
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Your current RPN (Risk Protection Number) is 427, which is in the moderate-risk zone. This means your portfolio has balanced exposure with some concentration risks. The main contributors are market volatility (35%) and portfolio concentration (28%).',
    timestamp: '10:31 AM',
  },
];

export const quickPrompts = [
  'Explain my RPN',
  'Summarize latest news',
  'Generate report snapshot',
  'Show top holdings',
  'Analyze risk factors',
];

export const holdingsData: HoldingData[] = [
  { name: 'Reliance Industries', value: 28, change: 5.2 },
  { name: 'TCS', value: 22, change: -2.1 },
  { name: 'HDFC Bank', value: 18, change: 3.4 },
  { name: 'Infosys', value: 15, change: 1.8 },
  { name: 'ITC', value: 12, change: -0.5 },
  { name: 'Others', value: 5, change: 0.8 },
];

export const rpnHistoryData = [
  { date: 'Jan', rpn: 520 },
  { date: 'Feb', rpn: 495 },
  { date: 'Mar', rpn: 480 },
  { date: 'Apr', rpn: 465 },
  { date: 'May', rpn: 445 },
  { date: 'Jun', rpn: 430 },
  { date: 'Jul', rpn: 420 },
  { date: 'Aug', rpn: 435 },
  { date: 'Sep', rpn: 440 },
  { date: 'Oct', rpn: 438 },
  { date: 'Nov', rpn: 427 },
];

export const volatilityData = [
  { sector: 'IT', volatility: 25 },
  { sector: 'Banking', volatility: 35 },
  { sector: 'Pharma', volatility: 20 },
  { sector: 'Auto', volatility: 40 },
  { sector: 'FMCG', volatility: 15 },
  { sector: 'Energy', volatility: 45 },
];

// User Profile Mock Data
export interface UserProfileData {
  user: {
    name: string;
    email: string;
    image_url: string;
  };
  user_profile: {
    age: number;
    gender: string;
    profession: string;
    designation: string;
    job_level: string;
    is_primary_earner: boolean;
  };
  user_financial_profile: {
    income_per_month: number;
    expenditure: number;
    additional_expenses: number;
    living_cost: number;
    invest_per_month: number;
    saving_per_month: number;
    saving_rate: number;
    risk_tolerance: string;
    invest_cycle_date: string;
  };
  exchanges: string[];
  portfolio_snapshot: {
    equity_value_inr: number;
    mf_value_inr: number;
    total_portfolio_value_inr: number;
    snapshot_date: string;
  };
}

export interface HoldingItem {
  tradingsymbol: string;
  exchange: string;
  quantity: number;
  last_price: number;
  average_price: number;
  pnl: number;
  day_change: number;
  day_change_percentage: number;
  current_value: number;
  instrument_type: string;
}

export const userProfileData: UserProfileData = {
  user: {
    name: "Sohan Rupesh Sakhare",
    email: "sohansakhare2001@gmail.com",
    image_url: "https://s3.ap-south-1.amazonaws.com/zerodha-kite-blobs/avatars/q9rhTJhHtrQM2T80gHRrbQrtTDc89bYB.png"
  },
  user_profile: {
    age: 24,
    gender: "male",
    profession: "Individual investor",
    designation: "",
    job_level: "",
    is_primary_earner: true
  },
  user_financial_profile: {
    income_per_month: 100000,
    expenditure: 60000,
    additional_expenses: 5000,
    living_cost: 30000,
    invest_per_month: 15000,
    saving_per_month: 35000,
    saving_rate: 35,
    risk_tolerance: "moderate",
    invest_cycle_date: "2025-11-29"
  },
  exchanges: ["BFO", "BSE", "MF", "NSE", "NFO"],
  portfolio_snapshot: {
    equity_value_inr: 55077.12,
    mf_value_inr: 103135.1016736,
    total_portfolio_value_inr: 158212.2216736,
    snapshot_date: "2025-11-29"
  }
};

export const mockHoldings: HoldingItem[] = [
  {
    tradingsymbol: "INFY",
    exchange: "NSE",
    quantity: 10,
    last_price: 1852.90,
    average_price: 1500.00,
    pnl: 3529.00,
    day_change: 15.40,
    day_change_percentage: 0.84,
    current_value: 18529.00,
    instrument_type: "EQ"
  },
  {
    tradingsymbol: "Portfolio",
    exchange: "MF",
    quantity: 300,
    last_price: 343.12,
    average_price: 307.50,
    pnl: 10686.00,
    day_change: -36.36,
    day_change_percentage: -10.586,
    current_value: 102936.00,
    instrument_type: "MF"
  },
  {
    tradingsymbol: "TCS",
    exchange: "NSE",
    quantity: 5,
    last_price: 3245.60,
    average_price: 3100.00,
    pnl: 728.00,
    day_change: 42.30,
    day_change_percentage: 1.32,
    current_value: 16228.00,
    instrument_type: "EQ"
  },
  {
    tradingsymbol: "RELIANCE",
    exchange: "BSE",
    quantity: 8,
    last_price: 2456.75,
    average_price: 2380.00,
    pnl: 614.00,
    day_change: -18.50,
    day_change_percentage: -0.75,
    current_value: 19654.00,
    instrument_type: "EQ"
  }
];
