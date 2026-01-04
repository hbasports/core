type ResponseUsernameApi = {
  available: boolean;
  message?: string;
  suggestion?: string;
};

export async function fetchUsername(username: string) {
  const response = await fetch("http://localhost:3001/auth/username", {
    method: "POST",
    body: JSON.stringify({
      username: username.trim(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await response.json()) as ResponseUsernameApi;
  return { response, data };
}