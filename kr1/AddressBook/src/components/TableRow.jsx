import React, { useState } from 'react';

const TableRow = ({ contact, onEditContact }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(contact);
    const [errors, setErrors] = useState({});

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const result = onEditContact(contact.id, editData);

        if (result.success) {
            setIsEditing(false);
            setErrors({});
        } else {
            setErrors(result.errors);
        }
    };

    const displayField = (fieldName) => (
        isEditing ? (
            <input
                type="text"
                name={fieldName}
                value={editData[fieldName]}
                onChange={handleEditChange}
                className={errors[fieldName] ? 'input-error' : ''}
            />
        ) : (
            editData[fieldName]
        )
    );

    return (
        <tr className={isEditing ? 'editing' : ''}>
            <td>{contact.id}</td>
            <td>
                {displayField('firstName')}
                {errors.firstName && <div className="error-inline">{errors.firstName}</div>}
            </td>
            <td>
                {displayField('lastName')}
                {errors.lastName && <div className="error-inline">{errors.lastName}</div>}
            </td>
            <td>
                {displayField('phone')}
                {errors.phone && <div className="error-inline">{errors.phone}</div>}
            </td>
            <td>
                {isEditing ? (
                    <button onClick={handleSave}>Зберегти</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Редагувати</button>
                )}
            </td>
        </tr>
    );
};

export default TableRow;