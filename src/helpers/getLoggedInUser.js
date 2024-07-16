import axios from "axios";

export default async function getLoggedInUser() {
  try {
    const { data } = await axios.post("/api/getLoggedInUser");
    if (data.success === false) {
      return true;
    }
    return data;
  } catch (error) {
    return { success: false, message: "error in getLoggedInUser" };
  }
}
