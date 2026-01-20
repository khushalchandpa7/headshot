import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import FileUpload from "@/components/FileUpload";
import ResultDisplay from "@/components/ResultDisplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

const Generate = () => {
  const { refreshUser } = useAuth();
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

      const response = await api.post("/generate/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;
      console.log("Generation response:", result);

      if (result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      } else if (result.image) {
        // Fallback if it returned it in 'image' instead of 'imageUrl'
        const imageData = result.image.startsWith("data:")
          ? result.image
          : result.image.startsWith("http")
            ? result.image
            : `data:image/png;base64,${result.image}`;
        setGeneratedImage(imageData);
      } else {
        throw new Error(
          "Server processed the request but returned no valid image URL.",
        );
      }

      toast({
        title: "Headshot generated!",
        description: `Your AI headshot is ready. Credits remaining: ${result.creditsRemaining}`,
      });

      // Refresh user profile to update credits in Navbar
      refreshUser();
    } catch (err: any) {
      const serverMessage =
        err.response?.data?.message || err.response?.data?.error;
      const errorMessage =
        serverMessage || err.message || "Something went wrong";

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
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="pl-0 hover:pl-2 transition-all"
          >
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
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
                  Generate Headshot (25 Credits)
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
      </main>
    </div>
  );
};

export default Generate;
