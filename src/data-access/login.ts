import { LoginSchema, TLoginSchema, User as TUser } from "@/lib/type";
import axios from "axios";

type LoginUserResponse = {
  success: boolean;
  user?: TUser;
  msg?: string;
  error?: string;
};

export default async function LoginUser(
  body: TLoginSchema
): Promise<LoginUserResponse> {
  const validatedData = LoginSchema.safeParse(body);

  if (!validatedData.success) {
    throw new Error("Invalid data");
  }

  try {
    const { data } = await axios.post<LoginUserResponse>("/api/login", {
      email: validatedData.data.email,
      password: validatedData.data.password,
    });

    if (!data.success) {
      return {
        success: false,
        error: data.msg,
      };
    }
    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  }
}
