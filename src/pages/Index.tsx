import { useState } from "react";
import { Sparkles, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import FileUpload from "@/components/FileUpload";
import ResultDisplay from "@/components/ResultDisplay";
import { ModeToggle } from "@/components/ModeToggle";

// Webhook URL constant
const WEBHOOK_URL = "http://localhost:5678/webhook/headshot-generator-agent";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
    setGeneratedImage(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setError(null);
    setGeneratedImage(null);
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload a photo first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      // Handle both base64 and URL responses
      if (result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      } else if (result.base64) {
        setGeneratedImage(`data:image/png;base64,${result.base64}`);
      } else if (result.image) {
        const imageData = result.image.startsWith("data:")
          ? result.image
          : result.image.startsWith("http")
            ? result.image
            : `data:image/png;base64,${result.image}`;
        setGeneratedImage(imageData);
      } else {
        throw new Error("No image returned from the server");
      }

      toast({
        title: "Headshot generated!",
        description: "Your AI headshot is ready to download.",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      toast({
        title: "Generation failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-foreground">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-foreground">
              <Sparkles className="w-5 h-5 text-background" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              HEADSHOT.AI
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <ModeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-2 border-foreground">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border-2 border-foreground shadow-xs">
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

      {/* Main App Section */}
      <section className="border-b-2 border-foreground">
        <div className="container mx-auto px-6 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Upload */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">1. Upload Your Photo</h2>
                <p className="text-muted-foreground">
                  Drag and drop or click to select an image
                </p>
              </div>
              <FileUpload
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onClear={handleClear}
                disabled={isLoading}
              />
              <Button
                onClick={handleGenerate}
                disabled={!selectedFile || isLoading}
                className="w-full h-14 text-lg font-bold shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                size="lg"
              >
                {isLoading ? (
                  "Generating..."
                ) : (
                  <>
                    Generate Headshot
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Right Side - Result */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">2. Get Your Result</h2>
                <p className="text-muted-foreground">
                  Your AI-generated headshot will appear here
                </p>
              </div>
              <ResultDisplay
                imageUrl={generatedImage}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-b-2 border-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-foreground bg-card shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div className="p-3 bg-foreground text-background w-fit mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Get your professional headshot in under 30 seconds with our
                optimized AI pipeline.
              </p>
            </div>
            <div className="p-6 border-2 border-foreground bg-card shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              <div className="p-3 bg-foreground text-background w-fit mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Your photos are processed securely and never stored. Complete
                data privacy guaranteed.
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
