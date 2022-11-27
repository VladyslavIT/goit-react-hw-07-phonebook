import React from 'react';
import Notiflix from 'notiflix';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactSlice';
import { useDeleteContactMutation } from 'redux/contactSlice';

import { List, ListItem, ListButton } from './Contacts.styled';

const Contact = () => {
  const { data: contacts } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const filter = useSelector(state => state.filter);

  const contactShow = () => {
    const toLower = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(toLower)
    );
  };

  const deleteItem = id => {
    deleteContact(id);
    Notiflix.Notify.info(`Contact has been deleted`);
  };

  const contactList = contactShow();

  return (
    <List>
      {contactList.map(({ id, name, number }) => (
        <ListItem key={id}>
          {name}: {number}
          <ListButton onClick={() => deleteItem(id)}>Delete</ListButton>
        </ListItem>
      ))}
    </List>
  );
};

export { Contact };
