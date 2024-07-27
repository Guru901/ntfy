import { Loader2 } from "lucide-react";

export default function Loader({ styles }) {
  return (
    <div
      className={`${
        styles ? "" : "w-screen h-screen"
      } flex justify-center items-center ${styles}`}
    >
      <Loader2 className="animate-spin" />
    </div>
  );
}
