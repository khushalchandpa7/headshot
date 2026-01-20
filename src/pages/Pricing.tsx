import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your professional needs. No hidden
              fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="border-2 border-border bg-card p-8 rounded-xl shadow-xs hover:shadow-md transition-all">
              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
                <p className="text-muted-foreground">
                  Perfect for individuals just getting started.
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "5 Professional Headshots",
                  "Standard Resolution",
                  "24h Turnaround",
                  "Basic Touch-ups",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" size="lg" variant="outline">
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Pro */}
            <div className="relative border-2 border-foreground bg-card p-8 rounded-xl shadow-lg transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
                <p className="text-muted-foreground">
                  The best value for professionals.
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "20 Professional Headshots",
                  "4K High Resolution",
                  "1h Turnaround",
                  "Advanced AI Retouching",
                  "3 Background Options",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="bg-foreground rounded-full p-0.5">
                      <Check className="w-3 h-3 text-background" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" size="lg">
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="border-2 border-border bg-card p-8 rounded-xl shadow-xs hover:shadow-md transition-all">
              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-bold">Agency</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
                <p className="text-muted-foreground">
                  For teams and organizations.
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "100+ Professional Headshots",
                  "RAW Source Files",
                  "Priority Support",
                  "Team Dashboard",
                  "Commercial License",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full" size="lg" variant="outline">
                <Link to="/signup">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
