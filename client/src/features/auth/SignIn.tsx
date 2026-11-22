// import { Eye, EyeClosed } from "lucide-react";

import { ArrowRight, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./ZodSchema";
import { z } from "zod";
import Button from "../../shared/Button";
import { useAuthStore } from "../../store/Auth.store";
import { useLogin } from "./hooks/useLogin";

type Schema = z.infer<typeof LoginSchema>;

const SignIn = () => {
  const { mutate, isPending } = useLogin();
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: Schema) => {
    mutate(data, {
      onSuccess: (response) => {
        setAuth({ token: response?.accessToken, user: response?.user });
        navigate("/", { replace: true });
      },
      onError: () => {
        reset();
      },
    });
  };

  return (
    <div className="relative z-50 flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md h-full">
        <motion.div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
            Login to your account
          </h2>
        </motion.div>

        <motion.div
          className="mt-8 my-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="name"
                    {...register("username")}
                    type="text"
                    placeholder="Enter username"
                    className="className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm'"
                  />
                </div>
                {errors.username && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="password"
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400 sm:text-sm'"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                {/* <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
                >
                  Sign In
                </button> */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full"
                  isLoading={isPending}
                >
                  Sign In
                </Button>
              </div>
            </form>
            <p className="mt-8 text-center text-sm text-gray-400">
              Dont't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-emerald-400 hover:text-emerald-300"
              >
                Signup here <ArrowRight className="inline h-4 w-4" />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
