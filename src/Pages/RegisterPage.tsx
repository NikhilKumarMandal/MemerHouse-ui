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
import { useMutation } from "@tanstack/react-query";
import { Credentials } from "@/Types/types";
import {  register } from "@/http/api";

// Define the validation schema using Zod
const RegisterSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    username: z.string().min(2,"username atleast 2 characters long"),
    password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .nonempty("Password is required."),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

const registerForm = async (credentials: Credentials)=> {
  const { data } = await register(credentials);
  return data;
};


function RegisterPage() {

  const navigate = useNavigate();
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });

const { mutate, isPending } = useMutation({
  mutationKey: ["register"],
  mutationFn: registerForm,
  onSuccess: (data) => {
    console.log("User registered successfully:", data.data._id);
    navigate(`/verify-otp/${data.data._id}`);
  },
});

  // Handle form submission
  const onSubmit = (data: RegisterFormValues) => {
    mutate(data);
    console.log("Form Data:", data);
  };
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
                      
              {/* username Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="username"
                {...register("username")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
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
           <Button type="submit" className="w-full flex justify-center items-center gap-2" disabled={isPending}>
              {isPending ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>

            {/* Google Login Button */}
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>

          {/* Sign-up Link */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterPage