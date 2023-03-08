import PhotoCamera from '@mui/icons-material/PhotoCamera';

import React, { useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Paper,
  Grid,
  Button,
  Typography,
  Stack,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@mui/material';
import { Field, Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'
import * as Yup from 'yup';


const LostItem = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0)

  const [loading, setloading] = useState(false);
  const usertoken = window.localStorage.getItem("token");
  const getUserId = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    return user ? user._id : null;
  };
  

  const config = { headers: { token: usertoken } };

  const [formData, setFormData] = useState({
    name: '',
    userId: getUserId(),
    description: '',
    type: '',
    location: '',
    date: '',
    number: '',
  });

  const [image, setImage] = useState(null);

  const handleShow = () => setShow(true);

  const schema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Item type is required'),
    location: Yup.string().required('Location is required'),
    date: Yup.string().required('Date is required'),
    number: Yup.string().required('Phone number is required'),
  });

  const handleImageUpload = (e) => {
      setImage(e.target.files);
    
  };

  const handleSubmit = async (values) => {
  
    try {
     await schema.validate(values, { abortEarly: false });
    } catch (error) {
      const errorMessages = error.inner.map((err) => err.message);
      toast.error(errorMessages.join('\n'), {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      return;
    }
  
    if (!image || image.length === 0) {
      toast.error('Please upload atleast one image', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
      return;
    }
  
    setloading(true);
    const promises = [];

    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      const storageRef = ref(storage, `/images/${img.name}`);
      const fileRef = ref(storageRef, img.name);
      const uploadTask = uploadBytesResumable(fileRef, img);
      const promise = new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const uploaded = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(uploaded);
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((imgUrl) => {
                resolve(imgUrl);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          }
        );
      });
  
      promises.push(promise);
    }
  
    Promise.all(promises)
      .then((urls) => {
        const newItem = { ...values, img: urls };
            axios.post('http://localhost:4000/Items/newItem', newItem, config)
            .then(() => {
            toast.success('Wohoo 🤩! Item listed successfully.', {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
            setloading(false);
            setShow(false);
            window.location.href="/mylistings"
          })      
          .catch((error) => {
            console.log("An error occurred:", error);
            toast.error('Oops 🙁! Something went wrong.', {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
            setloading(false);
           
        });
      })
      .catch((error) => {
            console.log("An error occurred:", error);
            toast.error('Oops 🙁! Something went wrong.', {
              position: "bottom-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
            setloading(false);
          });
        };
  

  return (
    <Stack width="100%" pt="60px" alignItems="center">
            <Typography fontSize="30px" color="primary" fontWeight="">
              If your item is lost or you found someone's item, Post it Here!
            </Typography>
            <Stack
                width="100%"
                maxWidth="1440px"
                direction="row"
                justifyContent={{ xs: 'center', md: 'space-evenly' }}
                alignItems="center"
                
            >
                <Formik
                    initialValues={{name: '',
                    userId: getUserId(),
                    description: '',
                    type: '',
                    location: '',
                    date: '',
                    number: '',
                  }
                  }
                  validationSchema={schema}
                    onSubmit={(values) => {
                        handleSubmit(values)
                    }}
                >
                    {({
                      values,
                      handleChange
                    }) => (
                      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                      <Paper variant="outlined" sx={{ my: { xs: 12, md: 6}, p: { xs: 12, md: 5 } }}>
                        <Form>

                                <Grid item xs={6} pt="10px">
                                          <Typography variant="h6">
                                              Picture
                                          </Typography>
                                          <Stack direction="row" alignItems="center" spacing={2}>
                                              <Button variant="contained" component="label" endIcon={<PhotoCamera />}>
                                                      Upload
                                                      <input hidden accept="image/*" multiple type="file" 
                                                      id="image"
                                                      label="Upload Image"
                                                      name="image" 
                                                      onChange={handleImageUpload} />
                                              </Button>
                                              
                                          </Stack>
                                          <Grid item xs={6}>
                                                <Typography variant="h6">
                                                    Item Details
                                                </Typography>
                                          </Grid>
                                          <Grid item xs={12} sm={6}>
                                            <TextField
                                              required
                                              id="name"
                                              name="name"
                                              label="Item name "
                                              size="small"
                                              fullWidth
                                              variant="standard"
                                              value={values.name}
                                              onChange={handleChange}
                                            />
                                          </Grid>
                                          <Grid item xs={12}>
                                            <TextField
                                              label="Description "
                                              id="date"
                                              name="description"
                                              multiline={true}
                                              size="small"
                                              required
                                              fullWidth
                                              variant="standard"
                                              value={values.description}
                                              onChange={handleChange}
                                            />
                                          </Grid>
                                          <Grid item xs={12}>
                                            <TextField
                                              required
                                              fullWidth
                                              variant="standard"
                                              id="location"
                                              name="location"
                                              label="Where did you find/lost it "
                                              size="small"
                                              value={values.location}
                                              onChange={handleChange}
                                            />
                                          </Grid>
                                          <Grid item xs={12}>
                                            <TextField
                                              required
                                              fullWidth
                                              variant="standard"
                                              id="date"
                                              name="date"
                                              label="When did you find/lost it "
                                              size="small"
                                              value={values.date}
                                              onChange={handleChange}
                                            />
                                          </Grid>
                                          <Grid item xs={12}>
                                            <TextField
                                              required
                                              fullWidth
                                              variant="standard"
                                              id="number"
                                              name="number"
                                              label="How can we contact you? "
                                              size="small"
                                              value={values.number}
                                              onChange={handleChange}

                                            />
                                          </Grid>
                                          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Item Type</InputLabel>
                                            <Select
                                              labelId="demo-simple-select-standard-label"
                                              id="demo-simple-select-standard"
                                              name="type"
                                              value={values.type}
                                              onChange={handleChange}
                                            >
                                    
                                              <MenuItem value="Lost">Lost It</MenuItem>
                                              <MenuItem value="Found">Found It</MenuItem>
                                            </Select>
                                            <FormHelperText>Please select the type of item</FormHelperText>
                                          </FormControl>

                                          <Grid item xs={6}>
                                              <motion.div whileTap={{ scale: 0.98 }}>
                                                <Stack spacing={2} direction="row">
                                                  <Button type="submit" variant="contained">Ctreate post</Button>
                                                </Stack>
                                              </motion.div>
                                          </Grid>
                                    
                                </Grid>
                                
                               </Form>
                               </Paper>
                               </Container>
                    )}
                </Formik>

                <motion.div
                    whileHover={{ scale: [null, 1.05, 1.05] }}
                    transition={{ duration: 0.4 }}
                >
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        maxWidth="450px"
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        <img
                            width="100%"
                            src="https://i.ibb.co/Q65DB0d/list-item.png"
                            alt="Post Image"
                        />
                    </Stack>
                </motion.div>
            </Stack>
    </Stack>
  );
};

export default LostItem;