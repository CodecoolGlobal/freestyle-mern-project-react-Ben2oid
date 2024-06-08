import { useParams } from "react-router-dom";
import { useState } from "react";

import { changePassword } from "../../Services";
import { useFetchData, useAuth } from "../../Hooks";
import { ChangePasswordForm } from "../../Components";

const confirmPassword = (newPassword, confirmNewPassword) => {
  return newPassword === confirmNewPassword;
};

export const Profile = () => {
  const { userId } = useParams();
  const { token } = useAuth();
  const { data, loading, error } = useFetchData(
    true,
    `/api/user/${userId}`,
    "GET",
    null,
    token
  );
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handlePasswordSubmit = async (
    newPassword,
    confirmNewPassword,
    currentPassword
  ) => {
    if (!confirmPassword(newPassword, confirmNewPassword)) {
      alert("Passwords do not match");
      return;
    }
    const response = await changePassword(
      newPassword,
      currentPassword,
      userId,
      token
    );

    if (response.ok) {
      alert("Password changed successfully");
      setShowChangePassword(false);
    } else{
      alert(response.statusText);
    }
    console.log(response);
  };

  let user;
  if (data) {
    user = data.user;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>DisplayName: {user.displayName}</p>
          </div>
          <div>
            {!showChangePassword ? (
              <button onClick={() => setShowChangePassword(true)}>
                Change Password
              </button>
            ) : (
              <ChangePasswordForm
                setShowChangePassword={setShowChangePassword}
                changePassword={handlePasswordSubmit}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
