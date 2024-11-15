import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form />
        </CardContent>
      </Card>
    </div>
  );
}
