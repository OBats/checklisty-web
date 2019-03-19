import React from 'react';
import { List, Icon, Button, Confirm, Popup } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import Tags from './Tags';

const showCreationData = data => `Created: ${data.slice(0, 10).split('-').reverse().join('/')}`;

const ListItem = ({ lists, del, open, update, id }) => {
  const show = id => update({ openModal: true, currentChecklistId: id });

  const handleConfirm = () => {
    del(id);
    update({ openModal: false });
  };

  const handleCancel = () => update({ openModal: false });

  return (
    <List size="huge" divided link>
      {lists.length && lists.map(list => (
        <List.Item
          key={list.id}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <List.Icon name="th list" />
          <List.Content style={{ paddingLeft: '25px' }}>
            <List.Header as="a" href={`/checklist/${list.slug}`}>{list.title}</List.Header>
            <List.Description as="div" style={{ display: 'flex', alignItems: 'center' }}>
              {showCreationData(list.creation_date)}
              {<Tags tags={list.tags[0]} />}
            </List.Description>
          </List.Content>
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
              <Button icon onClick={show}>
                <Icon name="remove" color="red" />
              </Button>
            )}
          />
          <Confirm
            open={open}
            content="Are you realy want to delete list"
            onCancel={handleCancel}
            onConfirm={() => handleConfirm(list.id)}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ListItem;
