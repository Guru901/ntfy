import axios from "axios";

export async function saveFileInDb(url: string, pathName: string) {
  try {
    const { data } = await axios.post("/api/saveFileInDb", {
      url,
      pathName,
    });
    if (data.success) {
      location.reload();
    }
  } catch (error) {
    console.error(error);
    location.reload();
  }
}