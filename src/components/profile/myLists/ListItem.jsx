import React from 'react';
import { List, Icon, Label, Button } from 'semantic-ui-react';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

const getRandom = max => Math.floor(Math.random() * (max + 1));

const showCreationData = data => `Created: ${data.slice(0, 10).split('-').reverse().join('/')}`;
const showTags = (tags) => {
  if (tags !== undefined && tags[0] && tags[0].length) {
    return (
      <div style={{ marginLeft: '10px' }}>
        {tags.map(tag => (
          <Label key={tag} tag color={colors[getRandom(colors.length)]}>
            {tag}
          </Label>
        ))}
      </div>
    );
  }
};

const ListItem = ({ lists, del }) => (
  <List size="huge" divided link>
    {lists && lists.map(list => (
      <List.Item
        key={list.id}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <List.Icon name="th list" />
        <List.Content>
          <List.Header as="a" href={`/checklist/${list.slug}`}>{list.title}</List.Header>
          <List.Description as="div" style={{ display: 'flex', alignItems: 'center' }}>
            {showCreationData(list.creation_date)}
            {showTags(list.tags[0])}
          </List.Description>
        </List.Content>
        <List.Content floated="right">
          <Button icon>
            <Icon name="edit" color="yellow" />
          </Button>
        </List.Content>
        <List.Content floated="right" style={{ margin: 0 }}>
          <Button icon onClick={() => del(list.id)}>
            <Icon name="remove" color="red" />
          </Button>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

export default ListItem;
