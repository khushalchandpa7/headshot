import { Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="border-b-2 border-foreground">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="rounded-full inline-flex items-center gap-2 px-4 py-2 bg-secondary border-2 border-foreground shadow-xs">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Professional Headshots
            <br />
            <span className="text-muted-foreground">in Seconds</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Transform any photo into a stunning professional headshot using
            cutting-edge AI technology. No photographer needed.
          </p>
        </div>
      </div>
    </section>
  );
};
