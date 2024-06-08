import { useState } from "react";

import { FormInput } from "../../Components/FormInput/FormInput";

export const ChangePasswordForm = ({
  setShowChangePassword,
  changePassword,
}) => {
  const [fields, setFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { currentPassword, newPassword, confirmNewPassword } = fields;

  const handleSubmit = (event) => {
    event.preventDefault();

    changePassword(newPassword, confirmNewPassword, currentPassword);
  };

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Current Password"}
          type="password"
          onChange={handleChange}
          value={currentPassword}
          required
          name="currentPassword"
        />
        <FormInput
          label={"New Password"}
          onChange={handleChange}
          value={newPassword}
          type="password"
          required
          name="newPassword"
        />
        <FormInput
          label={"Confirm New Password"}
          value={confirmNewPassword}
          onChange={handleChange}
          type="password"
          required
          name="confirmNewPassword"
        />
        <button type="submit">Change Password</button>
        <button type="button" onClick={() => setShowChangePassword(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};
