import { Check, Sparkles, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const Pricing = () => {
  const bundles = [
    {
      name: "Starter Bundle",
      credits: 1000,
      headshots: 40,
      price: "₹600",
      description: "Great for individual professionals.",
      features: [
        "40 High-Quality Generations",
        "1000 Credits Included",
        "Standard Support",
        "Standard Turnaround",
      ],
      highlight: false,
    },
    {
      name: "Pro Bundle",
      credits: 3000,
      headshots: 120,
      price: "₹1,500",
      description: "Best choice for frequent users.",
      features: [
        "120 High-Quality Generations",
        "3000 Credits Included",
        "Priority Support",
        "Faster Turnaround",
        "Background Removal",
      ],
      highlight: true,
    },
    {
      name: "Agency Bundle",
      credits: 5000,
      headshots: 200,
      price: "₹2,000",
      description: "Maximum value for teams and agencies.",
      features: [
        "200 High-Quality Generations",
        "5000 Credits Included",
        "VIP Priority Support",
        "Instant Turnaround",
        "Multiple Backgrounds",
        "Commercial License",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm font-bold border border-border mb-4">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              <span>HIGH VOLUME BUNDLES</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Premium Credits, Local Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Get more for less with our high-volume credit packages. <br />
              <span className="font-bold text-foreground">
                1 Headshot Generation = 25 Credits
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {bundles.map((bundle) => (
              <div
                key={bundle.name}
                className={`relative flex flex-col border-2 p-8 rounded-2xl transition-all duration-300 ${
                  bundle.highlight
                    ? "border-foreground bg-card shadow-xl scale-105 z-10"
                    : "border-border bg-card/50 hover:border-foreground/50"
                }`}
              >
                {bundle.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    <Zap className="w-3 h-3 fill-current" /> BEST VALUE
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold">{bundle.price}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg border border-border mb-4">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span className="font-bold text-lg">
                      {bundle.credits} Credits
                    </span>
                    <span className="text-sm text-muted-foreground ml-auto">
                      ({bundle.headshots} Headshot)
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {bundle.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {bundle.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="bg-foreground rounded-full p-0.5">
                        <Check className="w-3 h-3 text-background" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full h-12 text-base font-bold"
                  variant={bundle.highlight ? "default" : "outline"}
                >
                  <Link to="/signup">Buy Credits</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
