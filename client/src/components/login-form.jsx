import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogCancel
} from "@/components/ui/alert-dialog";
import request from "@/utils/request";
import { AES } from "crypto-js";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { Loader2, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

// CSS to hide default password eye icons
const hideDefaultPasswordEye = `
  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear {
    display: none;
  }
  input[type="password"]::-webkit-contacts-auto-fill-button,
  input[type="password"]::-webkit-credentials-auto-fill-button {
    display: none;
  }
`;

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = ({ className, ...props }) => {
  // Form setup
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // State variables
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPasswordAlertDialogOpen, setForgotPasswordAlertDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Auth and navigation hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form submission handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await request({
        route: "/login",
        type: "POST",
        body: {
          email: data.email,
          password: data.password,
        },
      });

      // Encrypt and store email
      const SECRET_KEY = import.meta.env.VITE_APP_ENCRYPTION_KEY || "default-secret-key";
      const encryptedEmail = AES.encrypt(data.email, SECRET_KEY).toString();

      localStorage.setItem("encryptedEmail", encryptedEmail);
      login(encryptedEmail);

      setAlert({ type: "success", message: "Login successful" });
      setAlertOpen(true);
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message || "An error occurred during login",
      });
      setAlertOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Alert dialog close handler
  const handleAlertClose = (open) => {
    if (!open && alert?.type === "success") {
      navigate("/admin");
    }
    setAlertOpen(open);
  };

  return (
    <>
      {/* Inject custom CSS to hide default password eye icons */}
      <style>{hideDefaultPasswordEye}</style>

      <div className={cn("flex flex-col gap-6", className)} {...props}>
        {/* Login Card */}
        <Card className="dark:bg-background">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <button
                            type="button"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:text-ring cursor-pointer"
                            onClick={() => setForgotPasswordAlertDialogOpen(true)}
                          >
                            Forgot your password?
                          </button>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              {...field}
                              className="pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Forgot Password AlertDialog */}
        <AlertDialog
          open={forgotPasswordAlertDialogOpen}
          onOpenChange={setForgotPasswordAlertDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Forgot Password</AlertDialogTitle>
              <AlertDialogDescription>
                Contact TMK and ask for your password
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setForgotPasswordAlertDialogOpen(false)}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={alertOpen}
          onOpenChange={handleAlertClose}
        >
          <AlertDialogContent className={alert?.type === "error" ? "border-red-500" : "border-green-500"}>
            <AlertDialogHeader>
              <div className="flex items-center gap-2">
                {alert?.type === "success" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <AlertDialogTitle className={alert?.type === "error" ? "text-red-600" : "text-green-600"}>
                  {alert?.type === "success" ? "Success" : "Error"}
                </AlertDialogTitle>
              </div>
              <AlertDialogDescription>{alert?.message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction 
                onClick={() => handleAlertClose(false)}
                className={alert?.type === "error" ? "bg-destructive hover:bg-red-600 cursor-pointer" : "bg-green-500 hover:bg-green-600 cursor-pointer"}
              >
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default LoginForm;