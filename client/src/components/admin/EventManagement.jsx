import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, useField } from "formik";


const EventManagement = () => {

    const handleFormSubmit = async (values, { setSubmitting }) => {
        const formDataToSend = new FormData();
        formDataToSend.append('title', values.title);
        formDataToSend.append('month', values.month);
        formDataToSend.append('day', values.day);
        formDataToSend.append('year', values.year);
        formDataToSend.append('description', values.description);
        formDataToSend.append('address', values.address);
        formDataToSend.append('price', values.price);
        formDataToSend.append('distance', values.distance);
        formDataToSend.append('eventImage', values.eventImage); 
        
        try {
            
            const response = await axios.post('http://localhost:3309/events/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log(response.data); // Log success response
            // Optionally, provide feedback to the user here (e.g., show a success message)
        } catch (error) {
            console.error('Error submitting form:', error);
            // Optionally, provide feedback to the user here (e.g., show an error message)
        }
        setSubmitting(false);
    };

    const FormikFileInput = ({ ...props }) => {
        const [ helpers] = useField(props);
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
            <Formik
                initialValues={{
                    title: '',
                    eventImage: null,
                    month: '',
                    day: '',
                    year: '',
                    description: '',
                    address: '',
                    price: '',
                    distance: ''
                }}
                onSubmit={handleFormSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="title" className="block text-sm font-semibold">Title</label>
                                <Field as="input" type="text" name="title" placeholder="Title" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="image" className="block text-sm font-semibold">Image</label>
                                <FormikFileInput className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" name="eventImage" accept="image/*" />
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="month" className="block text-sm font-semibold">Month</label>
                                <Field as="input" type="text" name="month" placeholder="Month" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <div className="text-xs text-gray-500">Month of the event</div>
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="day" className="block text-sm font-semibold">Day</label>
                                <Field as="input" type="text" name="day" placeholder="Day" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <div className="text-xs text-gray-500">Day of the event</div>
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="year" className="block text-sm font-semibold">Year</label>
                                <Field as="input" type="text" name="year" placeholder="Year" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <div className="text-xs text-gray-500">Year of the event</div>
                            </div>
                            <div className="w-full md:w-1/2 px-2">
                                <label htmlFor="price" className="block text-sm font-semibold">Price</label>
                                <Field as="input" type="text" name="price" placeholder="Price" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <div className="text-xs text-gray-500">Price of the event</div>
                            </div>
                            <div className="w-full md:w-full px-2">
                                <label htmlFor="description" className="block text-sm font-semibold">Description</label>
                                <Field as="input" type="text" name="description" placeholder="Description" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <div className="text-xs text-gray-500">Description of the event</div>
                            </div>
                            <div className="w-full md:w-full px-2">
                                <label htmlFor="address" className="block text-sm font-semibold">Address</label>
                                <Field as="input" type="text" name="address" placeholder="Address" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500" />
                                <div className="text-xs text-gray-500">Address of the event</div>
                            </div>
                            <div className="w-full md:w-full px-2">
                                <label htmlFor="distance" className="block text-sm font-semibold">Distance</label>
                                <Field  as="select" name="distance" className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500">
                                    <option value="">Select Distance</option>
                                    <option value="5K">5K</option>
                                    <option value="10K">10K</option>
                                    <option value="Half Marathon">Half Marathon</option>
                                    <option value="10 Miles">10 Miles</option>
                                </Field >
                                <div className="text-xs text-gray-500">Distance of the event</div>
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

export default EventManagement;
