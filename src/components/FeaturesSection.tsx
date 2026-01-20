import { Zap, Shield, Clock } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section id="features" className="border-b-2 border-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-foreground bg-card shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="p-3 bg-foreground text-background w-fit mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Fast</h3>
            <p className="text-sm text-muted-foreground">
              Get your professional headshot in under 60 seconds with our
              optimized AI pipeline.
            </p>
          </div>
          <div className="p-6 border-2 border-foreground bg-card shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="p-3 bg-foreground text-background w-fit mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              Your photos are processed securely and never stored. Complete data
              privacy guaranteed.
            </p>
          </div>
          <div className="p-6 border-2 border-foreground bg-card shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="p-3 bg-foreground text-background w-fit mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg mb-2">Save Time</h3>
            <p className="text-sm text-muted-foreground">
              Skip the expensive photo sessions. Get professional results from
              any casual photo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
