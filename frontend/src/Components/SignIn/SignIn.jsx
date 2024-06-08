import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormInput } from "../FormInput/FormInput";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import "./style.scss"

const defaultFormFields = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState({});
  const {authoriseUser} = useContext(AuthContext)

  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = toast.loading("Please wait...", { containerId: "sign-up" });
    const response = await authoriseUser("login", formFields);
    if (response.ok) {
      resetFormField();
      toast.update(id, {
        render: "Great Success!",
        type: "success",
        isLoading: false,
        containerId: "sign-up",
        autoClose: 6000,
      });
    } else {
      setError(response.errors);
      toast.update(id, {
        render: response.message,
        type: "error",
        isLoading: false,
        containerId: "sign-up",
        autoClose: 6000,
      });
    }
  };

  const errorStyle = Object.keys(error).length ? true : false;

  return (
    <div className="sign-up-container">
      <h2>Already Have an Account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          onChange={handleChange}
          name="email"
          required
          value={email}
          type="email"
          error={error.message}
        />
        <FormInput
          label="Password"
          onChange={handleChange}
          name="password"
          required
          value={password}
          type="password"
          errorStyle={errorStyle}
        />
        <div className="buttons-container">
          <button type="submit">Sign in</button>
          {/*     <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign in
          </Button> */}
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        containerId={"sign-in"}
      />
    </div>
  );
};
