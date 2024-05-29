import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FormInput } from "../FormInput/FormInput";
import useRegistration from "./useRegistration";

const defaultFormFields = {
  displayName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};


//there should be a mechanism that stops the user from sending requests unless he changed the field!

export const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, username, email, password, confirmPassword } =
    formFields;
  const [errors, setErrors] = useState({});
  const { registerUser, loading } = useRegistration();

  console.log("errors", errors);

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    if (password !== confirmPassword) {
      console.log("passwords no matchey matchey");
      newErrors.confirmPassword = "Passwords do not match";
      console.log("NewErrors", newErrors);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await registerUser(formFields);
    if (response.ok) {
      resetFormField();
      toast.success("Great Success!!!");
    } else {
      setErrors({ ...newErrors, ...response.errors });
      toast.error(`Fail: ${response.message}`);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don&apos;t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          onChange={handleChange}
          name="displayName"
          required
          value={displayName}
          type="text"
        />
        <FormInput
          label="Username"
          onChange={handleChange}
          name="username"
          required
          value={username}
          type="text"
          error={errors.username}
        />
        <FormInput
          label="Email"
          onChange={handleChange}
          name="email"
          required
          value={email}
          type="email"
          error={errors.email}
        />
        <FormInput
          label="Password"
          onChange={handleChange}
          name="password"
          required
          value={password}
          type="password"
        />
        <FormInput
          label="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          required
          value={confirmPassword}
          type="password"
          error={errors.confirmPassword}
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
      />
    </div>
  );
};
