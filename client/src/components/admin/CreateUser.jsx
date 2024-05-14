import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useField } from "formik";

const CreateUser = () => {
    const navigate = useNavigate(); // Hook to get access to the navigate instance

    const handleFormSubmit = async (values, { setSubmitting }) => {
        const formDataToSend = new FormData();
        formDataToSend.append('fullName', values.fullName);
        formDataToSend.append('email', values.email);
        formDataToSend.append('password', values.password);
        formDataToSend.append('profileImage', values.profileImage);

        try {
            const response = await axios.post('http://localhost:3309/users/register', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data); // Log success response

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
            <h2 className="text-3xl font-semibold mb-4">Create User</h2>
            <Formik
                initialValues={{
                    fullName: "",
                    email: "",
                    password: "",
                    picture: "",
                    isAdmin: false
                }}
                onSubmit={handleFormSubmit}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form className="space-y-4">
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="fullName" className="block text-sm font-semibold">Full Name</label>
                                <Field type="text" name="fullName" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <ErrorMessage name="fullName" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="birthday" className="block text-sm font-semibold">Birthday</label>
                                <Field type="date" name="birthday" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <ErrorMessage name="birthday" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className="w-full px-2">
                                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                                <Field type="email" name="email" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className="w-full px-2">
                                <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                                <Field type="password" name="password" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className="w-full px-2">
                                <label htmlFor="picture" className="block text-sm font-semibold">Picture URL</label>
                                <Field type="text" name="picture" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <ErrorMessage name="picture" component="div" className="text-red-500 mt-1" />
                            </div>
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full px-2">
                                    <label className="block text-sm font-semibold">
                                        Is Admin?
                                        <Field type="checkbox" name="isAdmin" className="mt-1" checked={values.isAdmin} onChange={(e) => setFieldValue('isAdmin', e.target.checked)} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Create User</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateUser;
