import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const DisplayEvents = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:3309/events/');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.eventImage} alt={rowData.title} className="w-24 h-24 object-cover" />;
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
            <DataTable value={events}>
                <Column header="Image" body={imageBodyTemplate} />
                <Column field="title" header="Title" body={titleBodyTemplate} />
                <Column field="month" header="Month" body={monthBodyTemplate} />
                <Column field="day" header="Day" body={dayBodyTemplate} />
                <Column field="year" header="Year" body={yearBodyTemplate} />
                <Column field="description" header="Description" body={descriptionBodyTemplate} />
                <Column field="address" header="Address" body={addressBodyTemplate} />
                <Column field="price" header="Price" body={priceBodyTemplate} />
            </DataTable>
        </div>
    );
};

export default DisplayEvents;
