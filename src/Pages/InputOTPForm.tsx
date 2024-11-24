import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "react-router-dom"; // Import useParams
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailOtp } from "@/http/api";

// Schema for validating OTP
const FormSchema = z.object({
  pin: z
    .string()
    .length(4, { message: "Your one-time password must be exactly 4 characters." }),
});

// API call function
const verifyEmail = async ({ id, otp }: { id: string; otp: string }) => {
  return await verifyEmailOtp(id, { otp });
};

function InputOTPForm() {
  // Extracting the user ID from the route parameters
  const { id } = useParams<{ id: string }>();

  if (!id) {
    toast({
      title: "Error",
      description: "User ID is missing. Please ensure you are accessing the correct route.",
      variant: "destructive",
    });
    return null; // Early return if `id` is not available
  }

  // Form setup
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  // Mutation for OTP verification
  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your email has been verified successfully!",
      });
      form.reset(); // Reset form on success
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Verification failed. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate({ id, otp: data.pin }); // Pass `pin` as the `otp` value
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background w-full">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
          Enter OTP
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-center block">
                    One-Time Password
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup>
                          {[...Array(4)].map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormDescription className="text-center">
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default InputOTPForm;





