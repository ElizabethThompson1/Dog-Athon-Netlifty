import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Typography } from "@material-tailwind/react";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const LoginPage = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(`${apiUrl}/users/login`, values);
            localStorage.setItem('userToken', response.data.token);
    
            
            localStorage.setItem('userInfo', JSON.stringify(response.data.user));
            console.log("Additional user details:", response.data.user);
            
            navigate('/');
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || 'Error logging in');

        } finally {
            setSubmitting(false);
        }
    };
    

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-96 rounded-lg">
                <CardHeader variant="gradient" color="gray" className="mb-4 grid h-36 place-items-center relative">
                    <img src='/about/6.jpeg' alt="Login Banner" className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" />
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-sm text-gray-500">Email</label>
                                    <Field id="email" name="email" type="email" as={Input} size="lg" />
                                    <ErrorMessage name="email" component="div" className="text-red-500" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="text-sm text-gray-500">Password</label>
                                    <Field id="password" name="password" type="password" as={Input} size="lg" />
                                    <ErrorMessage name="password" component="div" className="text-red-500" />
                                </div>
                                <Button type="submit" variant="gradient" fullWidth disabled={isSubmitting} className='text-custom-blue mt-5'>
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardBody>
                <CardFooter className="pt-0">
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don't have an account?
                        <Link to="/register" className="ml-1 font-bold">Sign up</Link>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
