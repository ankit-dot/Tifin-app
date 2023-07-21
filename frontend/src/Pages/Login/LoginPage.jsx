import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate, useParams, useLocation } from "react-router-dom"; // Update the import
import classes from "./loginPage.module.css";
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Buttons/Button";

function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { returnUrl } = useParams(); // Use 'useParams' to get the 'returnUrl' parameter
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryReturnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user, navigate, returnUrl]);

  const submit = async ({ email, password }) => {
    await login(email, password);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Email Is Not Valid",
              },
            })}
            error={errors?.email?.message}
          />

          <Input
            type="password"
            label="password"
            {...register("password", {
              required: true,
            })}
            error={errors?.password?.message}
          />

          <Button type="submit" text="Login" />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
