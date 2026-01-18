import { Download, Sparkles, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-6">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-muted-foreground/20 border-t-foreground animate-spin" />
    </div>
    <div className="text-center space-y-2">
      <p className="font-medium text-lg">Generating your headshot...</p>
      <p className="text-sm text-muted-foreground">
        This may take a few moments
      </p>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
    <div className="p-4 border-2 border-dashed border-muted-foreground/30">
      <Sparkles className="w-8 h-8 text-muted-foreground" />
    </div>
    <div className="space-y-2">
      <p className="font-medium text-lg">Your AI headshot will appear here</p>
      <p className="text-sm text-muted-foreground">
        Upload a photo and click generate to get started
      </p>
    </div>
  </div>
);

const ErrorState = ({ error }: { error: string }) => (
  <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
    <div className="p-4 border-2 border-destructive bg-destructive/10">
      <ImageOff className="w-8 h-8 text-destructive" />
    </div>
    <div className="space-y-2">
      <p className="font-medium text-lg">Generation failed</p>
      <p className="text-sm text-muted-foreground">{error}</p>
    </div>
  </div>
);

const ResultDisplay = ({ imageUrl, isLoading, error }: ResultDisplayProps) => {
  const handleDownload = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "ai-headshot.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[320px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 bg-secondary/50">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[320px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 bg-secondary/50">
        <ErrorState error={error} />
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full min-h-[320px] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 bg-secondary/50">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[320px] border-2 border-foreground bg-secondary relative">
      <div className="w-full h-full flex items-center justify-center p-4">
        <img
          src={imageUrl}
          alt="Generated headshot"
          className="max-w-full max-h-[280px] object-contain border-2 border-foreground"
        />
      </div>
      <Button
        onClick={handleDownload}
        className="absolute bottom-3 right-3"
        size="sm"
      >
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
  );
};

export default ResultDisplay;
