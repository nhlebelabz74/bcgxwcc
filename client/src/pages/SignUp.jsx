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
  AlertDialogFooter
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import request from "@/utils/request";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Zod schema for form validation
const signupSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  cadena: z.boolean().optional(),
  oliverWyman: z.boolean().optional(),
}).refine(data => data.cadena || data.oliverWyman, {
  message: "Please select at least one event",
  path: ["events"]
});

const SignUpForm = ({ className, ...props }) => {
  // Form setup
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      cadena: false,
      oliverWyman: false,
    },
  });

  // State variables
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Form submission handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Determine which event(s) to RSVP for
      const events = [];
      if (data.cadena) events.push("WCCxCadenaInfoSession");
      if (data.oliverWyman) events.push("WCCxOliverWymanCVWorkshop");

      // Send RSVP requests for all selected events
      const responses = await Promise.all(events.map(eventName => 
        request({
          route: "/add-rsvp/:eventName",
          type: "POST",
          body: {
            email: data.email,
          },
          routeParams: {
            eventName: eventName,
          },
        })
      ));

      // Get member info from the first response
      const member = responses[0].data.member;

      // Create success message including all events
      const eventNames = events.map(e => e.replace("WCCx", "").replace("InfoSession", "")).replace("CVWorkshop", "").join(" and ");
      setAlert({ 
        type: "success", 
        message: `RSVP Successful for ${eventNames}. See you soon, ${member.fullname}` 
      });
      setAlertOpen(true);
    } catch (error) {
      setAlert({
        type: "error",
        message: error.message || "An error occurred during the RSVP process",
      });
      setAlertOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Alert dialog close handler
  const handleAlertClose = (open) => {
    if (!open && alert?.type === "success") {
      navigate("/thank-you");
    }
    setAlertOpen(open);
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="dark:bg-background">
          <CardHeader>
            <CardTitle>RSVP For The Event</CardTitle>
            <CardDescription>
              Enter your email below and select the event(s) you want to attend
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

                  {/* Event Selection */}
                  <div className="space-y-4">
                    <FormLabel>Select Event(s)</FormLabel>
                    
                    <FormField
                      control={form.control}
                      name="cadena"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Cadena Growth Partners Info Session</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="oliverWyman"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Oliver Wyman CV Workshop</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {/* General events error message */}
                    {form.formState.errors.events && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.events.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "RSVP"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

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

const SignUp = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;