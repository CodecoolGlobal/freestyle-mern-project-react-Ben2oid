import { useAuth } from "../../Hooks";
import { Navigate } from "react-router-dom";

export const GuestOnlyRoute = ({ element }) => {
  const { isItLoggedIn, user } = useAuth();

  return !isItLoggedIn ? element : <Navigate to={`/profile/${user.userId}`} />;
};
