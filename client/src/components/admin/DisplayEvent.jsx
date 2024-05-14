import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const DisplayEvents = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3309/event/');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const deleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:3309/event/${id}`);
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.imageUrl} alt={rowData.title} className="w-24 h-16 rounded-full object-cover" />;
    };

    const deleteBodyTemplate = (rowData) => {
        return (
            <Button
                label="Delete"
                icon="pi pi-trash"
                className="p-button-danger"
                onClick={() => deleteEvent(rowData.id)}
            />
        );
    };

    const titleBodyTemplate = (rowData) => {
        return <span>{rowData.title}</span>;
    };

    const monthBodyTemplate = (rowData) => {
        return <span>{rowData.month}</span>;
    };

    const dayBodyTemplate = (rowData) => {
        return <span>{rowData.day}</span>;
    };

    const yearBodyTemplate = (rowData) => {
        return <span>{rowData.year}</span>;
    };

    const descriptionBodyTemplate = (rowData) => {
        return <span>{rowData.description}</span>;
    };

    const addressBodyTemplate = (rowData) => {
        return <span>{rowData.address}</span>;
    };

    const priceBodyTemplate = (rowData) => {
        return <span>${rowData.price}</span>;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <DataTable value={events} className="p-datatable-sm p-datatable-striped">
                <Column header="Image" body={imageBodyTemplate} />
                <Column field="title" header="Title" body={titleBodyTemplate} />
                <Column field="month" header="Month" body={monthBodyTemplate} />
                <Column field="day" header="Day" body={dayBodyTemplate} />
                <Column field="year" header="Year" body={yearBodyTemplate} />
                <Column field="description" header="Description" body={descriptionBodyTemplate} />
                <Column field="address" header="Address" body={addressBodyTemplate} />
                <Column field="price" header="Price" body={priceBodyTemplate} />
                <Column header="Actions" body={(rowData) => (
                    <button onClick={() => deleteBodyTemplate} className="bg-red-500 text-white py-1 px-2 rounded-md ml-4 hover:bg-red-600 transition duration-300">Delete</button>
                )}></Column>
            </DataTable>
        </div>
    );
};

export default DisplayEvents;
