import { Field, Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import {
  Typography,
  Button,
  Stack,
  Divider,
  TextField,
  Grid,
  Box,
} from '@mui/material'


function Login() {
  const [loading, setloading] = useState(false);
  let [info, setinfo] = useState("");
  const [user_info, setuser_info] = useState("");


  function login(values) {
    setloading(true);
    // console.log(setinfo)
    var payload = {
      email: values.email,
      password: values.password,
    };
    axios({
      url: "http://localhost:4000/users/login",
      method: "POST",
      data: payload,

    })
      .then((response) => {
        // console.log("Response is :",response)
        if (response.data.user) {
          //Authentication done.
          toast.success('Logged In Successfully!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setuser_info(response.data.user);
          localStorage.setItem("token", response.data.token);
          // console.log(response.data.user)
          localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location.href="/";
        } else {
          setinfo(response.data);
          setloading(false);
          toast.error('Oops 🙁! Email or Password is incorrect!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
          
        }
        // console.log("Response :",response)
      })
      .catch((error) => {
        setloading(false);
        console.log(error);
        console.log("Error occured");
        toast.error('Oops 🙁! Error occured.', {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      });
    
  }

 

  return (
    <Stack
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap="20px"
            pt='10px'
        >
            <Stack
                direction="row"
                width="100%"
                sx={{ backgroundColor: 'primary.main' }}
                height="125px"
                gap="4px"
                alignItems="center"
                justifyContent="center"
            >
                <Stack
                    spacing={0}
                    position="relative"
                    justifyContent="center"
                    width="100%"
                    maxWidth="1440px"
                    height="125px"
                    overflow="hidden"
                    ml={10}
                >
                    <Typography fontSize="20px" color="white" fontWeight="">
                        Log In
                    </Typography>

                    <Typography variant="h5" color="white" fontWeight="bold">
                        Welcome Back!
                    </Typography>
                </Stack>
            </Stack>

            <Stack
                alignItems="center"
                justifyContent="space-between"
                mt={3}
                direction="row"
                
            >
                    <Stack width="50%" display={{ xs: 'none', md: 'flex' }}>
                        <img
                            width="100%"
                            src="https://i.ibb.co/G2k63ys/login-1.png"
                            alt="img"
                        />
                    </Stack>
                <Stack width={{ xs: '100%', md: '400px' }} margin="0 auto">
                                <Formik
                                    initialValues={{
                                      email: '',
                                      password: '',
                                    }}
                                    onSubmit={(values) => {
                                      login(values);
                                    }}
                                  >
                                    {({ values, handleChange }) => (
                                <Form>
                                    <Stack alignItems="start" gap="10px">
                                        <Stack
                                            padding={{ xs: '1rem', sm: '0' }}
                                        >
                                            <Typography
                                                fontSize="20px"
                                                variant="h5"
                                            >
                                                <b>Log In</b>
                                            </Typography>
                                            <Typography
                                                fontSize="14px"
                                                color="primary.main"
                                            >
                                                Please, fill your information
                                                below
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            width="100%"
                                            padding={{ xs: '1rem', sm: '0' }}
                                        >
                                            <TextField
                                                sx={{ width: '100%' }}
                                                required
                                                id="email"
                                                type="email"
                                                name="email"
                                                margin="dense"
                                                label="email"
                                                placeholder="email@example.com"
                                                size="small"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        </Stack>

                                        <Stack
                                            width="100%"
                                            padding={{ xs: '1rem', sm: '0' }}
                                        >
                                            <TextField
                                                sx={{ width: '100%' }}
                                                required
                                                id="password"
                                                type="password"
                                                name="password"
                                                margin="dense"
                                                label="password"
                                                size="small"
                                                value={values.password}
                                                onChange={handleChange}
                                            />
                                        </Stack>
                                        <Stack
                                            direction="row-reverse"
                                            sx={{
                                                justifyContent: {
                                                    xs: 'space-between',
                                                },
                                                width: '100%',
                                                padding: '1rem 0',
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                sx={{
                                                    color: 'white',
                                                    textTransform: 'none',
                                                    width: '100px',
                                                    fontSize: '16px',
                                                    alignSelf: 'end',
                                                    margin: {
                                                        xs: '0 1rem',
                                                        md: '0',
                                                    },
                                                }}
                                                size="small"
                                            >
                                                Login
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Form>
                                )}
                                </Formik>
                    <Divider sx={{ width: '100%', margin: '1rem 0' }} />
                    <Stack
                        justifyContent="center"
                        direction="row"
                        gap="10px"
                        mb="1rem"
                    >
                        <Typography fontSize="16px">
                            Don&apos;t have an account?
                        </Typography>
                        <Typography
                            component={Link}
                            to="/sign-up"
                            fontSize="16px"
                        >
                            Sign Up
                        </Typography>
                    </Stack>
                    
                </Stack>
            </Stack>
        </Stack>
  );
}

export default Login;
