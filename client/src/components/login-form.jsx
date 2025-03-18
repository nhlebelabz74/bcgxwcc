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
import { AlertDialog, AlertDialogDescription, AlertDialogTitle, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import request from "@/utils/request";
import { AES } from "crypto-js";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";

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

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = ({ className, ...props }) => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [alert, setAlert] = useState(null);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // alert: { type: "success" | "error", message: string }
  const onSubmit = async (data) => {
    // Submit logic remains the same
    try
    {
      await request({
        route: "/login",
        type: "POST",
        body: {
          email: data.email,
          password: data.password,
        },
      });

      // store the email
      const SECRET_KEY = import.meta.env.VITE_APP_ENCRYPTION_KEY || "default-secret-key";
      const encryptedEmail = AES.encrypt(data.email, SECRET_KEY).toString();

      localStorage.setItem("encryptedEmail", encryptedEmail);
      login(encryptedEmail);

      setAlert({ type: "success", message: "Login successful" });
    }
    catch (error) {
      setAlert({ type: "error", message: error.message });
      return;
    }
  };

  return (
    <>
      <style>{hideDefaultPasswordEye}</style>

      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {alert && (
              <AlertDialog variant={alert.type === "success" ? "default" : "destructive"}>
                <AlertDialogTitle>{alert.type === "success" ? "Success" : "Error"}</AlertDialogTitle>
                <AlertDialogDescription>{alert.message}</AlertDialogDescription>
                <AlertDialogAction
                  onClick={() => {
                    if (alert.type === "success") {
                      navigate("/admin");
                      setAlert(null);
                    }
                  }}
                >
                  Okay
                </AlertDialogAction>
              </AlertDialog>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
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
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:text-ring"
                            onClick={(e) => {
                              e.preventDefault();
                              setForgotPasswordDialogOpen(true);
                            }}
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full cursor-pointer">
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Dialog open={forgotPasswordDialogOpen} onOpenChange={setForgotPasswordDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Forgot Password</DialogTitle>
              <DialogDescription>
                Contact TMK and ask for your password
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default LoginForm;