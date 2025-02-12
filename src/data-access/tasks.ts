import { TAddTaskSchema } from "@/lib/type";
import axios from "axios";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { Task } from "@/lib/type";

type GetTasksResponse = {
  success: boolean;
  error?: string;
  tasks?: Task[];
};

export async function getTasks(): Promise<GetTasksResponse> {
  try {
    const { data } = await axios.get<{
      error?: string;
      tasks?: any;
      success: boolean;
    }>("/api/getAllTasks");

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

type AddTaskResponse = {
  success: boolean;
  tasks?: [];
  error?: string;
};

export async function addTask(
  formData: TAddTaskSchema,
  userId: string
): Promise<AddTaskResponse> {
  try {
    const { priority, subject, title } = formData;

    const token = getCookie("token");

    const decodedToken = jwtDecode(token!) as {
      id: string;
    };

    const { data } = await axios.post<AddTaskResponse>("/api/addTask", {
      title: title,
      subject: subject,
      priority: priority,
      id: decodedToken.id,
    });

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
