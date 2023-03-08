import React, { useState } from 'react'
import { setConstraint } from "../constraints";
import { BsFillCaretDownFill } from 'react-icons/bs'
import { Button, Menu, MenuItem, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const token = window.localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

  
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
                                <Stack>
              <motion.div
                  whileHover={{ scale: [null, 1.05, 1.05] }}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.98 }}
              >
                  <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      sx={buttonStyle}
                      endIcon={<BsFillCaretDownFill size="15px" />}
                      disableRipple
                  >
                      Items Browser
                  </Button>
              </motion.div>
              <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            component={Link}
                            to="/LostItems"
                            onClick={handleClose}
                        >
                            Lost Items
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/FoundItems"
                            onClick={handleClose}
                        >
                            Found Items
                        </MenuItem>
                    </Menu>
                </Stack>
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

              <Stack>
              <motion.div
                  whileHover={{ scale: [null, 1.05, 1.05] }}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.98 }}
              >
                  <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      sx={buttonStyle}
                      endIcon={<BsFillCaretDownFill size="15px" />}
                      disableRipple
                  >
                      Items Browser
                  </Button>
              </motion.div>
              <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            component={Link}
                            to="/log-in"
                            onClick={handleClose}
                        >
                            Lost Items
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/log-in"
                            onClick={handleClose}
                        >
                            Found Items
                        </MenuItem>
                    </Menu>
                </Stack>
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
