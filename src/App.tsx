import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { ZerodhaAuthProvider } from "./contexts/ZerodhaAuthContext";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import Profile from "./pages/Profile";
import MarketNews from "./pages/MarketNews";
import Reports from "./pages/Reports";
import Graphics from "./pages/Graphics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ZerodhaAuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/news" element={<MarketNews />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/graphics" element={<Graphics />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ZerodhaAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
