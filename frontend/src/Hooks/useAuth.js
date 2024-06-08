import { useContext } from "react";
import { AuthContext } from "../Components/contexts/AuthContext/AuthContext"

export const useAuth = () => {
  return useContext(AuthContext);
};

