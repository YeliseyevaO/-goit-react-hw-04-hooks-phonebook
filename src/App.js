import React from "react";
import { useState, useEffect } from "react";
import ContactForm from "./Components/ContactForm";
import ContactList from "./Components/ContactList";
import Filter from "./Components/Filter";
import shortid from "shortid";
import Container from "./Components/Copntainer";

const ferstContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];
export default function App() {
  const [contacts, setContacts] = useState(ferstContacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));

    if (parsedContacts) {
      setContacts([...parsedContacts]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const changeContacts = (name, number) => {
    console.log(name, number);
    if (verifyContact(name)) {
      alert("уже есть такой контакт");
      return;
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts([contact, ...contacts]);
  };

  const verifyContact = (name) => {
    return contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
  };
  const inputChange = (e) => {
    const { value } = e.currentTarget;

    setFilter(value);
  };

  const getNecessaryName = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const getName = getNecessaryName(filter);

  return (
    <>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={changeContacts} />
        <h2>Contacts</h2>
        <Filter filter={filter} takeFilterName={inputChange} />
        <ContactList listName={getName} onDeleteContact={deleteContact} />
      </Container>
    </>
  );
}
