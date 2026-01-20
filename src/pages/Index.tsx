import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CommunityShowcase } from "@/components/CommunityShowcase";
import { Sparkles } from "lucide-react";

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [loading, isAuthenticated, navigate]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Main App Section Placeholder for Public Users */}
      <section className="border-b-2 border-foreground bg-background/50">
        <div className="container mx-auto px-6 py-12 md:py-20 text-center">
          <p className="text-xl text-muted-foreground mb-4">
            Ready to create your own?
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background font-bold rounded-lg animate-pulse">
            <Sparkles className="w-4 h-4" />
            Sign up to start generating
          </div>
        </div>
      </section>

      <CommunityShowcase />
      <FeaturesSection />

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background">
                <Sparkles className="w-4 h-4 text-foreground" />
              </div>
              <span className="font-bold">HEADSHOT.AI</span>
            </div>
            <p className="text-sm text-background/70">
              © {new Date().getFullYear()} Headshot.AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
