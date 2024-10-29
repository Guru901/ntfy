import axios from "axios";

type GetTasksResponse = {
  success: boolean;
  error?: string;
  tasks?: [];
};

export async function getTasks(userId: string): Promise<GetTasksResponse> {
  try {
    const { data } = await axios.get<{
      error?: string;
      tasks?: any;
      success: boolean;
    }>("/api/getAllTasks?userId=" + userId);

    if (!data.success && data.error) {
      return {
        success: false,
        error: data.error,
      };
    }

    return {
      success: true,
      tasks: data.tasks,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
}
