import React from "react";
import { setConstraint } from "../constraints";
import { Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const token = window.localStorage.getItem("token");
  
  const buttonStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'none',
    color: 'black',
    '&:hover': {
        color: 'primary.main',
        backgroundColor: 'transparent',
        transition: 'none',
    },
    '&:focus': {
        color: 'primary.main',
        backgroundColor: 'transparent',
    },
}

  const signout = () => {
    // constraint.LOGGED_IN = false;
    setConstraint(false);

    console.log("Signed out !");
    localStorage.clear();
    window.location.href="/log-in";
  };
  return (
    <Stack
            width="100%"
            maxWidth="1440px"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            borderRadius="0 0 20px 20px"
            px={{ xs: 3, sm: 5, md: 5 }}
            zIndex={20}
            gap={1}
            sx={{ backgroundColor: '#F6F8F8' }}
            mb="10px"
        >
            <Link to="/">
                <Stack maxWidth="180px">
                    <img
                        src='https://i.ibb.co/G2851XX/Main-Logo-1.png'
                        alt="logo"
                        width="100%"
                    />
                </Stack>
            </Link>

            <Stack
               direction="row"
               gap={'38px'}
               display={{ xs: 'none', md: 'flex' }}
             >
                {token ? (
                            <Stack direction="row"
                            gap={'38px'}
                            display={{ xs: 'none', md: 'flex' }}>
                                <motion.div
                                    whileHover={{ scale: [null, 1.05, 1.05] }}
                                    transition={{ duration: 0.4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        component={Link}
                                        to="/"
                                        sx={buttonStyle}
                                        disableRipple
                                    >
                                        Home
                                    </Button>
                                </motion.div>
                
                                <motion.div
                                    whileHover={{ scale: [null, 1.05, 1.05] }}
                                    transition={{ duration: 0.4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        component={Link}
                                        to="/feed"
                                        sx={buttonStyle}
                                        disableRipple
                                    >
                                        Items Browser
                                    </Button>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: [null, 1.05, 1.05] }}
                                    transition={{ duration: 0.4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        component={Link}
                                        to="/postitem"
                                        sx={buttonStyle}
                                        disableRipple
                                    >
                                        Post Item
                                    </Button>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: [null, 1.05, 1.05] }}
                                    transition={{ duration: 0.4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        component={Link}
                                        to="/mylistings"
                                        sx={buttonStyle}
                                        disableRipple
                                    >
                                        My Listings
                                    </Button>
                                </motion.div>
                            </Stack>
                ) : (
                  <Stack direction="row"
                  gap={'38px'}
                  display={{ xs: 'none', md: 'flex' }}>
                  <motion.div
                  whileHover={{ scale: [null, 1.05, 1.05] }}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.98 }}
              >
                  <Button
                      component={Link}
                      to="/"
                      sx={buttonStyle}
                      disableRipple
                  >
                      Home
                  </Button>
              </motion.div>

              <motion.div
                  whileHover={{ scale: [null, 1.05, 1.05] }}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.98 }}
              >
                  <Button
                      component={Link}
                      to="/log-in"
                      sx={buttonStyle}
                      disableRipple
                  >
                      Items Browser
                  </Button>
              </motion.div>
              </Stack>
                )}
               </Stack>
            <Stack direction="row">
            {token ? (  
              <Button
              variant="contained"
              component={Link}
              onClick={signout}
              sx={{
                textTransform: 'none',
                px: '30px',
                display: { xs: 'none', md: 'flex' },
              }}
              size="small"
              disableRipple
            >
              Logout
            </Button>
            ) : (
              <Stack
               direction="row"
               gap={'20px'}
               display={{ xs: 'none', md: 'flex' }}
             >
                <Button
                variant="contained"
                component={Link}
                to="/log-in"
                sx={{
                  textTransform: 'none',
                  px: '30px',
                  display: { xs: 'none', md: 'flex' },
                }}
                size="small"
                disableRipple
              >
                Login
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/sign-up"
                sx={{
                  textTransform: 'none',
                  px: '30px',
                  display: { xs: 'none', md: 'flex' },
                }}
                size="small"
                disableRipple
              >
                  Sign Up
                </Button>
            </Stack> )}
        </Stack>
    </Stack>
)}
export default Navbar;
