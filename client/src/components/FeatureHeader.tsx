import { CircleChevronLeft } from "lucide-react";
import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";

interface FeatureHeaderProps {
  title: string;
  handler?: () => void;
}

const FeatureHeader = ({ title, handler }: FeatureHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="mb-4 flex justify-between items-center bg-emerald-600 rounded-xl py-2 px-4">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <Button className="bg-transparent" onClick={() => navigate(-1)}>
          <CircleChevronLeft size={30} />
        </Button>
        <span className="text-xl md:text-2xl">{title}</span>
      </div>
      {handler && (
        <Button onClick={handler} className="bg-emerald-900 ">
          Create New Note
        </Button>
      )}
    </div>
  );
};

export default FeatureHeader;
