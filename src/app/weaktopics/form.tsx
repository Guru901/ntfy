"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import axios from "axios";
import useGetUser from "@/hooks/use-get-user";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import { zodResolver } from "@hookform/resolvers/zod";

const weakTopicsFormSchema = z.object({
  weakTopic: z.string().min(3, "Weak Topic Should be atleast 3 chars"),
  subject: z.enum(["Maths", "Physics", "Chemistry"]),
});

type WeakTopicFormValues = z.infer<typeof weakTopicsFormSchema>;

export default function Form() {
  const { user } = useGetUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<WeakTopicFormValues>({
    resolver: zodResolver(weakTopicsFormSchema),
  });

  const submitForm = async (data: WeakTopicFormValues) => {
    try {
      await axios.post("/api/addWeakTopic", {
        form: data,
        user,
      });

      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col gap-2">
        <Input
          {...register("weakTopic")}
          type="text"
          placeholder="Enter the topic"
          className="md:w-[280px]"
          name="weakTopic"
        />
        {errors.weakTopic && (
          <span className="text-red-500 text-xs">
            {errors.weakTopic.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Controller
          name="subject"
          control={control} // Link Controller to the form control
          render={({ field }) => (
            <Select
              value={field.value} // Explicitly bind value from Controller
              onValueChange={(value) => field.onChange(value)} // Explicitly handle onChange to update the form state
            >
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Maths">Maths</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.subject && (
          <span className="text-red-500 text-xs">{errors.subject.message}</span>
        )}
      </div>

      <Button
        disabled={isSubmitting}
        className="md:h-[38px]"
        onClick={handleSubmit(submitForm)}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </div>
  );
}
