import React from 'react';
import TableRow from './TableRow';

const ContactTable = ({ contacts, onEditContact }) => {
    if (contacts.length === 0) {
        return <div className="no-data">No data to display</div>;
    }

    return (
        <table className="contact-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <TableRow
                        key={contact.id}
                        contact={contact}
                        onEditContact={onEditContact}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ContactTable;