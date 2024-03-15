import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client.ts'
import { useAppContext } from "../contexts/AppContexts.tsx";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
    confirmPassword: string
}

const Register = () => {
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const { register,
        watch,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Registration Success!", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">
                Create an Account
            </h2>

            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("firstname", { required: "This field is required" })}
                    />
                    {errors.firstname && (
                        <span className="text-red-500">{errors.firstname.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last name
                    <input type="text"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("lastname", { required: "This field is required" })}
                    />
                    {errors.lastname && (
                        <span className="text-red-500">{errors.lastname.message}</span>
                    )}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input type="password"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required";
                            } else if (watch("password") != val) {
                                return "Your Password do not match"
                            }

                        }
                    })}
                />

                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </label>

            <span className="">
                <button type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:g-blue-500 text-xl">
                    Create Account
                </button>
            </span>

        </form>
    )
}

export default Register;
