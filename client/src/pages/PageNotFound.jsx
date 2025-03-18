import { Button } from "@/components/ui/button"; // Assuming you have a Button component from shadcn
import { useNavigate } from "react-router-dom"; // or useNextRouter if using Next.js

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg text-muted-foreground">
          Stop snooping around ;)
        </p>
        <Button
          onClick={() => navigate("/")} // Redirect to login page
          className="mt-6"
        >
          Go Back To Login
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;