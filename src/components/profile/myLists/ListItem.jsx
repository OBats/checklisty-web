import React from 'react';
import { List, Icon, Button, Confirm } from 'semantic-ui-react';
import Tags from './Tags';

const showCreationData = data => `Created: ${data.slice(0, 10).split('-').reverse().join('/')}`;

const ListItem = ({ lists, del, open, update }) => {
  const show = () => update({ openModal: true });

  const handleConfirm = (id) => {
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
          <List.Content floated="right">
            <Button icon>
              <Icon name="edit" color="yellow" />
            </Button>
          </List.Content>
          <List.Content floated="right" style={{ margin: 0 }}>
            <Button icon onClick={show}>
              <Icon name="remove" color="red" />
            </Button>
            <Confirm
              open={open}
              content="Are you realy want to delete list"
              onCancel={handleCancel}
              onConfirm={() => handleConfirm(list.id)}
            />
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default ListItem;
