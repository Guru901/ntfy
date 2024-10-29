import { SignupSchema, TSignUpSchema } from "@/lib/type";
import axios from "axios";

type RegisterUserResponse = {
  success: boolean;
  error?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
};

export default async function RegisterUser(
  body: TSignUpSchema
): Promise<RegisterUserResponse> {
  try {
    const validatedData = SignupSchema.safeParse(body);

    if (!validatedData.success) {
      throw new Error("Invalid data");
    }

    const { data } = await axios.post<RegisterUserResponse>("/api/register", {
      email: validatedData.data.email,
      username: validatedData.data.username,
      password: validatedData.data.password,
    });

    if (data.success) {
      return {
        success: true,
        user: data.user,
      };
    }

    return {
      success: false,
      error: data.error,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
}
