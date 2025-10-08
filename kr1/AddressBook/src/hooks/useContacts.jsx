import { useState, useCallback, useMemo } from 'react';

const createNewContact = (firstName, lastName, phone) => ({
    id: Date.now(),
    firstName,
    lastName,
    phone,
});

const validateContact = (contact) => {
    const errors = {};
    if (!contact.firstName || contact.firstName.trim() === '') {
        errors.firstName = 'The first name is required';
    }
    if (!contact.lastName || contact.lastName.trim() === '') {
        errors.lastName = 'The last name is required';
    }
    if (!contact.phone || contact.phone.trim() === '') {
        errors.phone = 'The phone is required';
    }
    return errors;
};


const useContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const addContact = useCallback((contactData) => {
        const errors = validateContact(contactData);
        if (Object.keys(errors).length > 0) {
            return { success: false, errors };
        }

        const newContact = createNewContact(
            contactData.firstName.trim(),
            contactData.lastName.trim(),
            contactData.phone.trim()
        );

        setContacts((prev) => [...prev, newContact]);
        return { success: true };
    }, []);

    const editContact = useCallback((id, updatedData) => {
        const errors = validateContact(updatedData);
        if (Object.keys(errors).length > 0) {
            return { success: false, errors };
        }

        setContacts((prev) =>
            prev.map((contact) =>
                contact.id === id
                    ? {
                        ...contact,
                        firstName: updatedData.firstName.trim(),
                        lastName: updatedData.lastName.trim(),
                        phone: updatedData.phone.trim(),
                    }
                    : contact
            )
        );
        return { success: true };
    }, []);

    const filteredContacts = useMemo(() => {
        if (!searchTerm) {
            return contacts;
        }

        const term = searchTerm.toLowerCase();
        return contacts.filter((contact) =>
            contact.firstName.toLowerCase().includes(term) ||
            contact.lastName.toLowerCase().includes(term) ||
            contact.phone.includes(term)
        );
    }, [contacts, searchTerm]);

    return {
        contacts: filteredContacts,
        setSearchTerm,
        addContact,
        editContact,
    };
};

export default useContacts;