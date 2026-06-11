import { signOut } from "@/lib/actions/user.actions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function UserLogout() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleLogout() {
    startTransition(async () => {
      const result = await signOut();
      if (result.status) {
        toast.success("You have successfully Logged Out");
        router.replace("/login");
      }
      toast.error(result.errors?.message);
    });
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={pending}
      className="px-3 ml-3  bg-orange-600 text-white"
    >
      <LogOut />
    </Button>
  );
}
