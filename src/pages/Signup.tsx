import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(" Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const { signup, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, loading, navigate]);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await signup(data.name, data.email, data.password);
      toast({
        title: "Account created!",
        description: "Welcome to Headshot.AI.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Signup failed";
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left System Info */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight">HEADSHOT.AI</span>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            Join the revolution of professional AI photography.
          </h2>
          <p className="text-lg text-zinc-400">
            Create stunning headshots in seconds and elevate your professional
            image.
          </p>
        </div>
        <div className="text-sm text-zinc-600">
          © {new Date().getFullYear()} Headshot.AI Inc. All rights reserved.
        </div>
      </div>

      {/* Right Signup Form */}
      <div className="flex flex-col p-6 md:p-12 relative">
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="pl-0 hover:pl-2 transition-all"
          >
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="w-full max-w-md mx-auto space-y-8 flex-1 flex flex-col justify-center">
          <div className="text-center space-y-2 lg:text-left">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">
              Enter your information to get started
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              className="w-full h-11 text-base font-medium shadow-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="font-medium hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
