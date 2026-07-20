import Image from "next/image";
import { Tasks } from "@/src/components/index"

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Tasks/>
    </div>
  );
}
