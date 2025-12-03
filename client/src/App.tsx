import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import Proponi from "@/pages/proponi";
import Vota from "@/pages/vota";
import ProposalDetail from "@/pages/proposal-detail";
import Community from "@/pages/community";
import Cinema from "@/pages/cinema";
import ChiSiamo from "@/pages/chi-siamo";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Contatti from "@/pages/contatti";
import Privacy from "@/pages/privacy";
import Termini from "@/pages/termini";
import AdminDashboard from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/proponi" component={Proponi} />
      <Route path="/vota" component={Vota} />
      <Route path="/vota/:slug" component={ProposalDetail} />
      <Route path="/community" component={Community} />
      <Route path="/cinema" component={Cinema} />
      <Route path="/chi-siamo" component={ChiSiamo} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contatti" component={Contatti} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/termini" component={Termini} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
