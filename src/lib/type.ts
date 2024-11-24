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

export type User = {
  username: string;
  email: string;
  _id: string;
  wantImages: boolean;
  wantQuesCount: boolean;
  whatToTrack: [
    {
      value: string;
      label: string;
    }
  ];
  topic: string;
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

export const WeakTopicsFormSchema = z.object({
  weakTopic: z.string().min(3, "Weak Topic Should be atleast 3 chars"),
  subject: z.enum(["Maths", "Physics", "Chemistry"]),
});

export type TWeakTopicFormValues = z.infer<typeof WeakTopicsFormSchema>;

export const AddQuesCountSchema = z.object({
  questions: z.string().min(1),
  subject: z.string().min(1),
});

export type TQuesCountFormValues = z.infer<typeof AddQuesCountSchema>;

export const EditFormTaskSchema = z.object({
  title: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  subject: z.string().optional(),
});

export type TEditFormTaskSchema = z.infer<typeof EditFormTaskSchema>;
