import { getSession } from "@/lib/actions/user.actions";
import { UserProfileSkeleton } from "@/components/shared/loaders";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function UserProfile() {
  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  const user = data?.data;

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary/10 text-primary">
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      {user?.name && <span className="text-sm font-medium">{user.name}</span>}
    </div>
  );
}
