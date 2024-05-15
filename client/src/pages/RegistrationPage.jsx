import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Typography } from "@material-tailwind/react";
import { Formik, Form, Field, useField } from "formik";
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const RegistrationPage = () => {
  const navigate = useNavigate(); 

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('fullName', values.fullName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('profileImage', values.profileImage);
  
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
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 mx-auto shadow-md rounded-lg">
        <CardHeader className="relative mb-4">
          <img src='/about/6.jpeg' alt="Event Banner" className="w-full h-full object-cover rounded-t-lg" />
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" className="text-center mb-4">Register</Typography>
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
              <Form className="space-y-4">
                <Field type="text" name="fullName" as={Input} size="lg" placeholder="Full Name" />
                <Field type="email" name="email" as={Input} size="lg" placeholder="Email" />
                <Field type="password" name="password" as={Input} size="lg" placeholder="Password" />
                <FormikFileInput className='mt-4' name="profileImage" accept="image/*" />
                <Button type="submit" variant="gradient" className='w-full' disabled={isSubmitting}>
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 text-center">
            Already have an account? <Link to="/login" className="ml-1 font-bold text-blue-600 hover:underline">Sign in</Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationPage;
