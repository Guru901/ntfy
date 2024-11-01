import axios from "axios";

export default async function getQuestionById(_id: string) {
  try {
    const { data } = await axios.post(
      "/api/getQuestionById",
      JSON.stringify(_id)
    );
    if (data.success === false) {
      return null;
    }
    return data;
  } catch (error) {
    return { success: false, message: "error in getQuestionById" };
  }
}
