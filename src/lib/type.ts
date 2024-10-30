import { z } from "zod";

export type TaskForm = {
  title: string;
  priority: string;
  subject: string;
};

export type Task = {
  _id: any;
  id: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "Pending" | "On Hold";
  title: string;
  date: string;
  subject: string;
};

export type EditFormTask = {
  _id: string;
  title: string;
  status: string;
  priority: string;
  subject: string;
};

export type User = {
  name: string;
  email: string;
  _id: string;
};

export type QuestionsCount = {
  _id: any;
  questions: string;
  subject: string;
  date: string;
};

export type EditQuestionForm = {
  _id?: string;
  subject: string;
  questions: string;
};
export const SignupSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3, "Username cant be less than 3 characters")
    .max(20, "Username cant be more than 20 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TSignUpSchema = z.infer<typeof SignupSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password can't be more than 20 characters"),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

export const AddTaskSchema = z.object({
  title: z.string().max(20, "Title can't be more than 20 characters"),
  subject: z.string(),
  priority: z.string(),
});

export type TAddTaskSchema = z.infer<typeof AddTaskSchema>;
