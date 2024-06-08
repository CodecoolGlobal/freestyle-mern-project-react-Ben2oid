import { useAuth } from "../../Hooks";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ element }) => {
  const { isItLoggedIn } = useAuth();

  return isItLoggedIn ? element : <Navigate to="/auth" />;
};
