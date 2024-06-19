import { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import "./form.css";
import { AtSign, UserIcon, LockKeyhole } from "lucide-react";

interface RegisterFormInput {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC<{ changeForm: () => void }> = ({ changeForm }) => {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>();

  const registerUser: SubmitHandler<RegisterFormInput> = (data) => {
    axios
      .post("/api/v1/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        setError(null);
        console.log(response);
      })
      .catch((err) => {
        setError(err.response.status);
        console.log(err);
      });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Register</CardTitle>
        <CardDescription>Let's get you started!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="grid w-full items-center gap-4 text-start">
            {error === 400 && (
              <p role="alert" className="input-error">
                All fields are mandatory
              </p>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <div className="relative">
                <Input
                  id="username"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <UserIcon className="input-icon" size={18} />
              </div>
              {errors.username && (
                <p role="alert" className="input-error">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                />
                <AtSign className="input-icon" size={18} />
              </div>
              {errors.email && (
                <p role="alert" className="input-error">
                  {errors.email.message}
                </p>
              )}
              {error === 409 && (
                <p role="alert" className="input-error">
                  Email is already registered
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Set Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 7,
                      message: "Password must be at least 7 characters",
                    },
                  })}
                />
                <LockKeyhole className="input-icon" size={18} />
              </div>
              {errors.password && (
                <p role="alert" className="input-error">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button>Register</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer font-medium"
          onClick={changeForm}
        >
          Login
        </span>
      </CardFooter>
    </Card>
  );
};

export default Register;
