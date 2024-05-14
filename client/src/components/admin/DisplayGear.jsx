import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const DisplayGear = () => {
    const [gearList, setGearList] = useState([]);

    const fetchGear = async () => {
        try {
            const response = await axios.get('http://localhost:3309/gear/');
            setGearList(response.data);
        } catch (error) {
            console.error('Error fetching gear:', error);
        }
    };

    useEffect(() => {
        fetchGear();
    }, []); 

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3309/gear/${id}`);
            fetchGear();
        } catch (error) {
            console.error('Error deleting gear:', error);
        }
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.imageUrl} alt={rowData.name} className="w-16 h-16 rounded-full object-cover" />;
    };

    const priceBodyTemplate = (rowData) => {
        return <span>${rowData.price}</span>;
    };

    const smallBodyTemplate = (rowData) => {
        return <span>{rowData.sizes.small > 0 ? `${rowData.sizes.small} Available` : 'Out of Stock'}</span>;
    };

    const medBodyTemplate = (rowData) => {
        return <span>{rowData.sizes.medium > 0 ? `${rowData.sizes.medium} Available` : 'Out of Stock'}</span>;
    };

    const largeBodyTemplate = (rowData) => {
        return <span>{rowData.sizes.large  > 0 ? `${rowData.sizes.large } Available` : 'Out of Stock'}</span>;
    };

    const header = (
        <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>
            Gear List
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <DataTable value={gearList} header={header} tableStyle={{ minWidth: '60rem' }}>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="name" header="Name"></Column>
                <Column field="cost" header="Price" body={priceBodyTemplate}></Column>
                <Column header="Smalls" body={smallBodyTemplate}></Column>
                <Column header="Medium" body={medBodyTemplate}></Column>
                <Column header="Large" body={largeBodyTemplate}></Column>
                <Column header="Actions" body={(rowData) => (
                    <button onClick={() => handleDelete(rowData.id)} className="bg-red-500 text-white py-1 px-2 rounded-md ml-4 hover:bg-red-600 transition duration-300">Delete</button>
                )}></Column>
            </DataTable>
        </div>
    );
};

export default DisplayGear;
