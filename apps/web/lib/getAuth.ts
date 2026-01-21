interface UserData {
  signedIn: boolean;
  user: any;
}

export async function getAuth() {
  const API_URL = "http://localhost:3001";

  const user = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await user.json()
  return {
    signedIn: false,
    data
  };
}
