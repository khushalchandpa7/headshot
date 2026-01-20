import { ArrowRight } from "lucide-react";

const EXAMPLES = [
  {
    original: "/dist/assets/original1.jpg",
    generated: "/dist/assets/generated1.png",
  },
  {
    original: "/dist/assets/original2.jpg",
    generated: "/dist/assets/generated2.png",
  },
  {
    original: "/dist/assets/original3.jpg",
    generated: "/dist/assets/generated3.png",
  },
];

export const CommunityShowcase = () => {
  return (
    <section className="border-b-2 border-foreground bg-background">
      <div className="max-w-[1400px] mx-auto px-4 pt-10 pb-20 md:pt-12 md:pb-32">
        <div className="text-center space-y-4 mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Made by Headshot.AI
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of professionals upgrading their presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {EXAMPLES.map((example, index) => (
            <div
              key={index}
              className="p-2 md:p-3 border-2 border-foreground bg-card shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <div className="flex-1 space-y-1">
                  <div className="aspect-[3/4] overflow-hidden border-2 border-foreground bg-secondary">
                    <img
                      src={example.original}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground text-center">
                    Original
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="p-1.5 bg-foreground text-background rounded-full group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="aspect-[3/4] overflow-hidden border-2 border-foreground bg-secondary">
                    <img
                      src={example.generated}
                      alt="Result"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground text-center">
                    Result
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
