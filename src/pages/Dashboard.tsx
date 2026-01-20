import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Download, Calendar, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface GenerationHistory {
  _id: string;
  generatedImageUrl: string;
  createdAt: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<GenerationHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get("/user/history");
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 bg-card p-8 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {user?.name}
            </h1>
            <p className="text-muted-foreground">
              You have{" "}
              <span className="font-bold text-foreground px-2 py-0.5 bg-secondary border border-foreground">
                {user?.credits} Credits
              </span>{" "}
              available for generation.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <Link to="/generate">
              <Plus className="w-5 h-4 mr-2" />
              Generate New
            </Link>
          </Button>
        </div>

        {/* Gallery */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b-2 border-foreground pb-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              Your Generations
            </h2>
            <div className="text-sm font-bold bg-foreground text-background px-3 py-1">
              LATEST FIRST
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" />
              <p className="font-bold">Loading your history...</p>
            </div>
          ) : history.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {history.map((item) => (
                <div
                  key={item._id}
                  className="group relative aspect-[3/4] bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] overflow-hidden hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all"
                >
                  <img
                    src={item.generatedImageUrl}
                    alt="AI Generated Headshot"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 gap-4">
                    <div className="text-center">
                      <p className="font-bold flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-foreground font-bold hover:bg-foreground hover:text-background transition-colors"
                      asChild
                    >
                      <a
                        href={item.generatedImageUrl}
                        download={`headshot-${item._id}.png`}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card rounded-lg border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-20 h-20 bg-secondary border-2 border-foreground mx-auto flex items-center justify-center">
                  <Plus className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold">No generations yet</p>
                  <p className="text-muted-foreground">
                    Start by uploading your photo and our AI agent will handle
                    the rest.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-foreground font-bold hover:bg-foreground hover:text-background transition-colors"
                >
                  <Link to="/generate">Create your first one</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
