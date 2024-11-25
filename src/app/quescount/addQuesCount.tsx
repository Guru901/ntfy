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
import useGetUser from "@/hooks/use-get-user";
import { AddQuesCountSchema, TQuesCountFormValues } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export function AddQuesCount() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TQuesCountFormValues>({
    resolver: zodResolver(AddQuesCountSchema),
  });

  const { user } = useGetUser();

  async function submitForm(value: TQuesCountFormValues) {
    try {
      await axios.post("/api/quescount", {
        value,
      });

      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex gap-3">
      <div className="flex gap-2 flex-col">
        <Input
          type="number"
          placeholder="Enter your answer"
          className="md:w-[280px]"
          {...register("questions")}
        />
        {errors.questions && (
          <p className="text-sm text-red-500">{errors.questions.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {user.whatToTrack.map((x) => (
                  <SelectItem key={x.label} value={x.label}>
                    {x.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.subject && (
          <p className="text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      {isSubmitting ? (
        <Button disabled className="md:h-[38px]">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button className="md:h-[38px]" onClick={handleSubmit(submitForm)}>
          Submit
        </Button>
      )}
    </div>
  );
}
