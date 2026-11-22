import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/Auth.store";
import Button from "../../shared/Button";
import { useLogOut } from "../auth/hooks/useLogOut";

const Home = () => {
  const { user } = useAuthStore();
  const { mutate } = useLogOut();

  console.log(user);

  const handleLogOut = () => {
    mutate();
  };

  return (
    <div className="relative flex flex-col z-50 items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-5">
        <p>
          <b>Username</b>
        </p>{" "}
        : <p>{user?.username}</p>
      </div>
      <div className="flex items-center justify-center gap-5">
        <p>
          <b>Role</b>
        </p>{" "}
        : <p>{user?.roles[0]}</p>
      </div>

      <Button onClick={handleLogOut} className="self-center">
        <LogOut />
      </Button>
    </div>
  );
};

export default Home;
