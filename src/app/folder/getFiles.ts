import axios from "axios";


export async function getFiles(pathName: string): Promise<{ data: string[] | null, error: any }> {
  try {
    const { data } = await axios.post(`http://localhost:3000/api/getFiles`, {
      pathName
    });
    return {
      data,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error
    }
  }
}
