import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Grid, Snackbar, TextField, Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useUser } from "../../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [showCode, setShowCode] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Errors", errors);
    console.log("Form submitted :)");
    console.log(data);
    try {
      if (showCode) {
        ConfirmSignUp(data);
      } else {
        await signUpData(data);
        setShowCode(true);
      }
    } catch (error) {
      console.error(error);
      setSignUpError(error.message);
      setOpen(true);
    }
  };
  async function signUpData(data) {
    const { name, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          email,
        },
      });
      console.log("Signed up user: ", user);
    } catch (error) {
      throw error;
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function ConfirmSignUp(data) {
    const { email, password, code } = data;
    try {
      await Auth.confirmSignUp(email, code);
      const amplifyUser = await Auth.signIn(email, password);
      console.log("User signed in,", amplifyUser);
      if (amplifyUser) {
        router.push("/");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("Error confirming sign up", error);
    }
  }
  console.log("The value from the user hook is:", user);
  console.log("Errors: ", errors);

  return (
    <div style={{ marginTop: 32 }}>
      <div className="mt-16 text-center text-6xl font-bold text-blue-600">
        Sign Up
      </div>
      <form
        style={{ marginTop: 32 }}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Grid
          style={{ marginTop: 16 }}
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}
        >
          <TextField
            style={{ marginTop: 12, marginBottom: 12, width: "12rem" }}
            variant="standard"
            id="name"
            label="First & Last Name"
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.message : null}
            {...register("name", {
              required: { value: true, message: "Name is required." },
              minLength: {
                value: 2,
                message: "Please enter a realistic name.",
              },
            })}
          />
          <TextField
            style={{ marginTop: 12, marginBottom: 12, width: "12rem" }}
            variant="standard"
            id="email"
            label="Email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : null}
            {...register("email", {
              required: { value: true, message: "Email required." },
              minLength: {
                value: 6,
                message: "Invalid email address",
              },
            })}
          />
          <TextField
            style={{ marginTop: 12, marginBottom: 12, width: "12rem" }}
            variant="standard"
            type="password"
            id="password"
            label="Password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : null}
            {...register("password", {
              required: { value: true, message: "First name required." },
              minLength: {
                value: 6,
                message: "Password length must be at least 6 characters.",
              },
            })}
          />
          {showCode && (
            <TextField
              style={{ marginTop: 12, marginBottom: 12, width: "12rem" }}
              variant="standard"
              id="code"
              label="Verification Code"
              error={errors.code ? true : false}
              helperText={errors.code ? errors.code.message : null}
              {...register("code", {
                required: {
                  value: true,
                  message:
                    "Please enter the verification code sent to your email.",
                },
              })}
            />
          )}
          <Button type="submit">{showCode ? "Confirm Code" : "Sign Up"}</Button>
          <Link href="/login" passHref>
            <p className="mt-20 underline text-blue-500 hover:cursor-pointer">
              Sign in instead?
            </p>
          </Link>
        </Grid>
        <Snackbar autoHideDuration={6000} open={open} onClose={handleClose}>
          <Alert severity="error">{signUpError}</Alert>
        </Snackbar>
      </form>
    </div>
  );
}
