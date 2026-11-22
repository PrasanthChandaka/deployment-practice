import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button";

/**
 * Component shown when user lacks required role to access a protected route.
 * Happens when role-based access control (RBAC) denies access.
 */
const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="relative z-50 min-h-screen p-5 flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-5"
      >
        <h2 className="font-bold text-5xl text-center">
          403 <br /> Access Denied
        </h2>
        <p className="text-gray-400 text-center max-w-md">
          You don't have the required permissions to access this resource.
        </p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
};

export default Forbidden;
