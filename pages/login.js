import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Grid, Snackbar, TextField, Button } from "@mui/material";
import { useUser } from "../context/AuthContext";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import { useRouter } from "next/router";

export default function Login() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [signInError, setSignInError] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await Auth.signIn(data.email, data.password);
      router.push("/");
    } catch (error) {
      console.error(error);
      setSignInError(error.message);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="mt-32">
        <div className="mt-16 text-center text-6xl font-bold text-blue-600">
          Sign In
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <TextField
                variant="standard"
                className="mt-4 mb-4 w-52"
                id="email"
                label="Email"
                type="text"
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : null}
                {...register("email")}
              />
            </Grid>

            <Grid item>
              <TextField
                variant="standard"
                className="mt-4 mb-4 w-52"
                id="password"
                label="Password"
                type="password"
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password.message : null}
                {...register("password")}
              />
            </Grid>

            <Grid style={{ marginTop: 16 }}>
              <Button type="submit">Sign In</Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {signInError}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
