import axios from "axios";

async function useMeQuery() {
  const WEBAPP_URL = "http://localhost:3001";
  const { data } = await axios.get(`${WEBAPP_URL}/auth/me`, {
    withCredentials: true,
  });

  return data
}

export default useMeQuery;
