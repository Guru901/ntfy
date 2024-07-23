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
