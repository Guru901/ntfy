import axios from "axios";

export default async function getLoggedInUser() {
  const { data } = await axios.post("/api/getLoggedInUser");
  if (data.success === false) {
    return true;
  }
  return data;
}
