import axios from "axios";

export default async function getTaskById(_id) {
  try {
    const { data } = await axios.post("/api/getTaskById", JSON.stringify(_id));
    if (data.success === false) {
      return null;
    }
    return data;
  } catch (error) {
    return { success: false, message: "error in getTaskById" };
  }
}
