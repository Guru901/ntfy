import axios from "axios";

export default async function getTaskById(_id) {
  console.log(_id);
  const { data } = await axios.post("/api/getTaskById", JSON.stringify(_id));
  console.log(data);
  if (!data) {
    return null;
  } else {
    return data;
  }
}
