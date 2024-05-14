import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, useField } from "formik";

const GearManagement = () => {
    const [successMessage, setSuccessMessage] = useState('');

    const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
        const formDataToSend = new FormData();
        formDataToSend.append('name', values.name);
        formDataToSend.append('price', values.price);
        formDataToSend.append('image', values.image);

        formDataToSend.append('sizes[small]', values.sizes.small);
        formDataToSend.append('sizes[medium]', values.sizes.medium);
        formDataToSend.append('sizes[large]', values.sizes.large);

        try {
            const response = await axios.post('http://localhost:3309/gear/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data); // Log success response
            setSuccessMessage('Gear created successfully!');
            resetForm(); // Clear the form
        } catch (error) {
            console.error('Error submitting form:', error);
            setSuccessMessage('Error creating gear. Please try again.');
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
            <h2 className="text-3xl font-semibold mb-4">Gear Management</h2>
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            <Formik
                initialValues={{
                    name: '',
                    price: '',
                    sizes: {
                        small: 0,
                        medium: 0,
                        large: 0
                    },
                    image: null,
                }}
                onSubmit={handleFormSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="name" className="block text-sm font-semibold">Name</label>
                                <Field as="input" type="text" name="name" placeholder="Name" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="price" className="block text-sm font-semibold">Price</label>
                                <Field as="input" type="text" name="price" placeholder="Price" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="image" className="block text-sm font-semibold">Image</label>
                                <FormikFileInput className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" name="image" accept="image/*" />
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label className="block text-sm font-semibold">Sizes</label>
                                <div className="flex space-x-2">
                                    <div>
                                        <label htmlFor="sizes.small" className="block text-sm">Small</label>
                                        <Field as="input" type="number" name="sizes.small" placeholder="Small" className="w-20 border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="sizes.medium" className="block text-sm">Medium</label>
                                        <Field as="input" type="number" name="sizes.medium" placeholder="Medium" className="w-20 border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="sizes.large" className="block text-sm">Large</label>
                                        <Field as="input" type="number" name="sizes.large" placeholder="Large" className="w-20 border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:border-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default GearManagement;
