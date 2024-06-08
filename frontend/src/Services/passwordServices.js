export const changePassword = async (newPassword, currentPassword, userId, token) => {

  const response = await fetch(`/api/user/${userId}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword: newPassword, currentPassword: currentPassword }),
  });
/*   const data = await response.json(); */
/*   console.log("data received", data); */
  return response;

}
