import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Credentials } from "@/Types/types";
import { googleOAuth, login, self } from "@/http/api";
import { toast } from "sonner"
import { useAuthStore } from "@/store";
import { GoogleLogin } from '@react-oauth/google'



// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .nonempty("Password is required."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const loginUser = async (credentials: Credentials) => {
  const { data } = await login(credentials);
  return data;
};

const getSelf = async () => {
  const { data } = await self();
  return data
}

const googleAuth = async (token: string) => {
  const { data } = await googleOAuth(token);
  return data 
}


export default function LoginPage() {
  const { setUser } = useAuthStore()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { data: selfData ,refetch} = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {  
      const selfDataPromise = await refetch(); 
      setUser(selfDataPromise.data)
      toast("Logged In successfully")
      navigate("/")
    },
    onError: (error: any) => {
    // Assuming `error.response.data.message` contains the server error message
    const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
    setError("root", { type: "server", message: errorMessage });
    },
  });

  // Handle form submission
  const onSubmit = (data: LoginFormValues) => {
    console.log("Data",data);
    
    mutate(data);
  };

  const handleGoogleLoginSuccess = (credentialResponse: any) => {
    const googleToken = credentialResponse.credential;
    if (!googleToken) {
      return toast.error("Google token not found!");
    }

    googleLogin(googleToken); // Trigger the mutation
  };

  const { mutate: googleLogin } = useMutation({
    mutationKey: ['googleauth'],
    mutationFn: googleAuth,
    onSuccess: async () => {
      const selfDataPromise = await refetch(); 
      setUser(selfDataPromise.data)
      toast("Logged In successfully")
      navigate("/")
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Google login failed. Please try again.";
      toast.error(errorMessage);
    },
  });


  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        {/* Card Header */}
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to log in to your account.
          </CardDescription>
        </CardHeader>

        {/* Card Content */}
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Server Error Display */}
            {errors.root && (
              <p className="text-sm text-center text-red-500">{errors.root.message}</p>
            )}

            {/* Login Button */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>

            {/* Google Login Button */}
      
        <GoogleLogin
            size="large"
            width="24rem"
            theme="filled_black"
            text="continue_with"
            onSuccess={handleGoogleLoginSuccess}
            onError={() => toast.error("Google Login failed!")}
        />

          </form>

          {/* Sign-up Link */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



