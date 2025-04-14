import { Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '@/context/authContext';
import { Loader2 } from "lucide-react";
import { Toaster } from "sonner";
import { LoginPage, PageNotFound, AdminPage, SignUp, ThankYouPage } from '@/pages';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/404" replace />;
  }
  return children;
};

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className='bottom-5 left-4 fixed z-50'> {/* change position later */}
          <ModeToggle />
        </div>
        <Routes>
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/' element={ <Navigate to="/login" replace/> } />
          <Route path='/404' element={ <PageNotFound /> } />
          <Route path='/thank-you' element={ <ThankYouPage /> } />
          <Route path='/signup' element={ <SignUp /> } />
          
          {/* Protected Routes */}
          <Route path='/admin' element={
            <ProtectedRoute>
                <AdminPage />
            </ProtectedRoute>
          } />
          <Route path='*' element={ <Navigate to="/404" replace /> } />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;