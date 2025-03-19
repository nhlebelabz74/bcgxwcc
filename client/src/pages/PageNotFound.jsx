import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";


const PageNotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
          onClick={() => isAuthenticated ? navigate("/admin") : navigate("/")} // Redirect
          className="mt-6 cursor-pointer"
        >
          Go Back To {isAuthenticated ? "Admin" : "Home"}
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;