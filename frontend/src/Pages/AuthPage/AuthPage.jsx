import { SignIn, SignUp } from "../../Components";
import "./style.scss";

export const AuthPage = () => {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  );
};
