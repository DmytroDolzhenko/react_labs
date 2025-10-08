import React from 'react';
import useContacts from './hooks/useContacts';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import SearchBar from './components/Search';
import './App.css';

const App = () => {
    const {
        contacts,
        searchTerm,
        setSearchTerm,
        addContact,
        editContact,
    } = useContacts();

    return (
        <div className="address-book-app">
            <h1>Address Book</h1>

            <ContactForm onAddContact={addContact} />

            <div className="controls">
                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
            </div>

            <ContactTable
                contacts={contacts}
                onEditContact={editContact}
            />
        </div>
    );
};

export default App;