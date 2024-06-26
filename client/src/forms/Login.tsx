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
import { AtSign, LockKeyhole } from "lucide-react";

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC<{ changeForm: () => void }> = ({ changeForm }) => {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const loginUser: SubmitHandler<IFormInput> = (data) => {
    axios
      .post("/api/v1/users/login", {
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
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>Welcome Back!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(loginUser)}>
          {error === 400 && (
            <p role="alert" className="input-error mb-2">
              All fields are mandatory
            </p>
          )}
          {error === 404 && (
            <p role="alert" className="input-error mb-2">
              User does not exist
            </p>
          )}
          {error === 401 && (
            <p role="alert" className="input-error mb-2">
              Invalid user credentials
            </p>
          )}
          <div className="grid w-full items-center gap-4 text-start">
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
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
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
            <Button>Login</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        Don't have an account yet?{" "}
        <span
          className="text-blue-600 font-medium cursor-pointer"
          onClick={changeForm}
        >
          Sign Up
        </span>
      </CardFooter>
    </Card>
  );
};

export default Login;
