import React, { useState } from 'react';
import { List, Icon, Button, Confirm, Popup, Header, Progress } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import Tags from './Tags';

const showCreationData = data => `Created: ${data.slice(0, 10).split('-').reverse().join('/')}`;

const ListItem = ({ lists, del }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setId] = useState(null);

  const show = (id) => {
    setOpenModal(true);
    setId(id);
  };

  const handleConfirm = () => {
    del(currentId);
    setOpenModal(false);
  };

  const handleCancel = () => setOpenModal(false);

  if (lists.length === 0) {
    return (
      <Header as="h2" textAlign="center">
        List not found
      </Header>
    );
  }

  return (
    <List size="huge" divided link>
      {lists.map(list => (
        <List.Item
          key={list.id}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <List.Icon name={list.isPrivate ? 'lock' : 'unlock'} color={list.isPrivate ? 'red' : 'green'} />
          <List.Content style={{ paddingLeft: '25px' }}>
            <List.Header as="a" href={`/${list.slug}`}>{list.title}</List.Header>
            <List.Description as="div" style={{ display: 'flex', alignItems: 'center' }}>
              {showCreationData(list.creation_date)}
              {<Tags tags={list.tags} />}
            </List.Description>
          </List.Content>
          <Progress
            progress
            percent={list.progress}
            color="green"
            style={{ margin: '0 1em', width: '10em' }}
          />
          <Popup
            inverted
            content="Edit via form"
            trigger={(
              <Link to={`/edit-checklist/${list.slug}`}>
                <Button icon>
                  <Icon name="list" color="teal" style={{ padding: 0 }} />
                </Button>
              </Link>
            )}
          />
          <Popup
            inverted
            content="Edit via markdown"
            trigger={(
              <Link to={`/edit-checklist-markdown/${list.slug}`}>
                <Button icon>
                  <Icon name="code" color="blue" />
                </Button>
              </Link>
            )}
          />
          <Popup
            inverted
            content="Remove checklist"
            trigger={(
              <Button icon onClick={() => show(list.id)}>
                <Icon name="remove" color="red" />
              </Button>
            )}
          />
          <Confirm
            open={openModal}
            content="Are you realy want to delete list"
            onCancel={handleCancel}
            onConfirm={() => handleConfirm()}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ListItem;
