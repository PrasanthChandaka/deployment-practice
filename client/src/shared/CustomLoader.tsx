import { Loader } from "lucide-react";

const CustomLoader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center z-50 animate-spin transition-all">
      <Loader size={90} />
    </div>
  );
};

export default CustomLoader;
