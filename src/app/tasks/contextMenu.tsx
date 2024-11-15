import { Button } from "@/components/ui/button";
import { ContextMenuContent } from "@/components/ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priorityList, subjectList } from "@/lib/contants";
import { useRouter } from "next/navigation";
import { AddTaskDialog } from "./addTaskDialog";

export function ContextMenuData() {
  const { back } = useRouter();

  return (
    <ContextMenuContent className="flex flex-col gap-1">
      <AddTaskDialog />
      <Button
        onClick={() => location.reload()}
        variant="ghost"
        className="h-[1.8rem] w-full flex justify-start"
      >
        Refresh
      </Button>
      <Button
        onClick={() => back()}
        variant="ghost"
        className="h-[1.8rem] w-full flex justify-start"
      >
        Back
      </Button>
    </ContextMenuContent>
  );
}
