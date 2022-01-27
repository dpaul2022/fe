import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthService from "../../utils/auth-service";
import Routes from "../../routes/routes";
import { Controller, useForm } from "react-hook-form";



const Login = ({ history }) => {
  
  const [isEmailRegistered, setIsEmailRegistered] = useState(true);
  const { handleSubmit, reset, control, formState: { errors, isValid } } = useForm({mode:'onChange'});


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onEmailChange = (e) => {
    let val = e.target.value;
    if(validateEmail(val)){
      AuthService.checkEmail(val).subscribe(
        (resp) => {
          console.log(resp)
          setIsEmailRegistered(resp.isRegisteredEmail);
        }
      );
    }
  }


  const onSubmit = (data) => {
    if(isEmailRegistered) {
      AuthService.login(data).subscribe(
        resp => {
          history.replace(Routes.HOME);
        }
      )
    } else {
      AuthService.signup(data).subscribe(
        resp => {
          history.replace(Routes.HOME);
        }
      )
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {!isEmailRegistered
            ? "New here! Sign up"
            : "Sign in"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name={"email"}
            control={control}
            rules={{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                type="email"
                onChange={(e) => {
                  onEmailChange(e);
                  onChange(e)
                }}
                value={value || ""}
                label={"Email Address"}
                helperText={errors.email && "Please enter a valid email"}
              />
            )}
          />
      

          <Controller
            name={"password"}
            control={control}
            rules={{required: true}}
            render={({ field: { onChange, value } }) => (
              <TextField
              type="password"
              margin="normal"
              fullWidth
                onChange={onChange}
                value={value || ""}
                label={"Password"}
                helperText={errors.password && "Password is required"}
              />
            )}
          />
        
          <Button
            type="submit"
            fullWidth
            disabled={!isValid}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
