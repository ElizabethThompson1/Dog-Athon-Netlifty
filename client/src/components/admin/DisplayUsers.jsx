import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const DisplayUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.avatar} alt={rowData.username} className="w-24 h-24 object-cover" />;
    };

    const usernameBodyTemplate = (rowData) => {
        return <span>{rowData.username}</span>;
    };

    const emailBodyTemplate = (rowData) => {
        return <span>{rowData.email}</span>;
    };

    const roleBodyTemplate = (rowData) => {
        return <span>{rowData.role}</span>;
    };

    const statusBodyTemplate = (rowData) => {
        return <span>{rowData.status}</span>;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <DataTable value={users}>
                <Column header="Avatar" body={imageBodyTemplate} />
                <Column field="username" header="Username" body={usernameBodyTemplate} />
                <Column field="email" header="Email" body={emailBodyTemplate} />
                <Column field="role" header="Role" body={roleBodyTemplate} />
                <Column field="status" header="Status" body={statusBodyTemplate} />
            </DataTable>
        </div>
    );
};

export default DisplayUsers;
