/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { List, Image, Button } from 'semantic-ui-react';

const FriendElement = (props) => {
  const { data } = props;
  return (
    <List size="big" divided relaxed>
      {data.map((item, id) => (
        <List.Item key={`items${id}-${item.name}`}>
          <List.Content floated="right">
            <Button>Send message</Button>
          </List.Content>
          <Image avatar src={item.src || 'https://react.semantic-ui.com/images/avatar/small/rachel.png'} />
          <List.Content>
            <List.Header as="a">{item.name}</List.Header>
            <List.Description>{item.email}</List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default FriendElement;
