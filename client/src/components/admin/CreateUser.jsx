import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Typography } from "@material-tailwind/react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const RegistrationPage = () => {
  const navigate = useNavigate(); // Hook to get access to the navigate instance

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('fullName', values.fullName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('profileImage', values.profileImage); // Assuming values.profileImage is the image file
  
    try {
      const response = await axios.post(`${apiUrl}/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log(response.data); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error registering user:', error);
    }
    setSubmitting(false);
  };

  const FormikFileInput = ({ ...props }) => {
    const [field, , helpers] = useField(props);
    return (
      <input
        type="file"
        {...props}
        onChange={(event) => {
          const files = event.target.files;
          const file = files ? files[0] : null;
          helpers.setValue(file);
        }}
      />
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 rounded-lg">
        <CardHeader variant="gradient" color="gray" className="mb-4 grid h-36 place-items-center relative">
          <img src='/about/6.jpeg' alt="Event Banner" className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" />
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              profileImage: null
            }}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field type="text" name="fullName" as={Input} size="lg" />
                <Field type="email" name="email" as={Input} size="lg" />
                <Field type="password" name="password" as={Input} size="lg" />
                <FormikFileInput className='mt-4' name="profileImage" accept="image/*" />
                <Button type="submit" variant="gradient" className='mt-5' fullWidth disabled={isSubmitting}>
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account? <Link to="/login" className="ml-1 font-bold">Sign in</Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationPage;
