import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="relative z-50 h-full p-5 flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-5"
      >
        <h2 className="font-bold text-5xl text-center">
          404 <br /> page not found
        </h2>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
