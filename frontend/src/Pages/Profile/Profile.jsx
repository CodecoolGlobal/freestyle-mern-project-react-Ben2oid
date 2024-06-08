import { useParams } from "react-router-dom";
import { useFetchData, useAuth } from "../../Hooks";

export const Profile = () => {
  const userId = useParams();
  const { token } = useAuth();

  useFetchData(true, "");

  return <div>Profile</div>;
};
