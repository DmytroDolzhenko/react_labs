import React, { useState } from 'react';

const ContactForm = ({ onAddContact }) => {
    const [data, setData] = useState({ firstName: '', lastName: '', phone: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = onAddContact(data);

        if (result.success) {
            setData({ firstName: '', lastName: '', phone: '' });
            setErrors({});
        } else {
            setErrors(result.errors);
        }
    };

    const ErrorMessage = ({ fieldName }) =>
        errors[fieldName] ? <div className="error-message">{errors[fieldName]}</div> : null;

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <h3>Додати Новий Контакт</h3>

            <div>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={data.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'input-error' : ''}
                />
                <ErrorMessage fieldName="firstName" />
            </div>

            <div>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={data.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'input-error' : ''}
                />
                <ErrorMessage fieldName="lastName" />
            </div>

            <div>
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={data.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'input-error' : ''}
                />
                <ErrorMessage fieldName="phone" />
            </div>

            <button type="submit">Додати</button>
        </form>
    );
};

export default ContactForm;