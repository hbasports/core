type UserCredentials = {
  accessToken: string;
  refreshToken: string;
};

export async function getUserCredentials(
  email: string,
  password: string,
  id: string,
) {
  const response = await fetch("http://localhost:3001/auth/get-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, accountId: id }),
  }).catch((err) => {
    // TODO: Handle errors
  });
}
