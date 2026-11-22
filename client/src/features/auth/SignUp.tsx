import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User, ArrowRight } from "lucide-react";
import { SignUpSchema } from "./ZodSchema";
import Button from "../../shared/Button";
import { useSignUp } from "./hooks/useSignUp";

const SignUpPage = () => {
  const { mutate, isPending } = useSignUp();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      roles: "Employee",
    },
  });

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/login");
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
            Create your account
          </h2>
        </motion.div>

        <motion.div
          className="mt-8 my-auto rounded-md"
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
                <label className="block text-sm font-medium text-gray-300">
                  Role
                </label>

                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      {...register("roles")}
                      type="radio"
                      value="Employee"
                      id="Employee"
                      className="h-4 w-4 accent-emerald-600"
                    />
                    <label
                      htmlFor="Employee"
                      className="ml-2 text-sm text-gray-300"
                    >
                      Employee
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      {...register("roles")}
                      type="radio"
                      value="Admin"
                      id="Admin"
                      className="h-4 w-4 accent-emerald-600"
                    />
                    <label
                      htmlFor="Admin"
                      className="ml-2 text-sm text-gray-300"
                    >
                      Admin
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      {...register("roles")}
                      type="radio"
                      value="Manager"
                      id="Manager"
                      className="h-4 w-4 accent-emerald-600"
                    />
                    <label
                      htmlFor="Manager"
                      className="ml-2 text-sm text-gray-300"
                    >
                      Manager
                    </label>
                  </div>
                </div>

                {errors.roles && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.roles.message}
                  </p>
                )}
              </div>

              <div>
                {/* <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
                >
                  Sign Up
                </button> */}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full"
                  isLoading={isPending}
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <p className="mt-8 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-emerald-400 hover:text-emerald-300"
              >
                Login here <ArrowRight className="inline h-4 w-4" />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default SignUpPage;
