/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-first-prop-new-line */
import React from 'react';
import { List } from 'semantic-ui-react';

const ProfileItem = (props) => {
  const { data } = props;
  return (
    <div>
      {data.map((item, _id) => (
        <List key={`items-${item.name}`}>
          <List.Item icon={item.icon} content={item.name} />
          {item.email && (
            <List.Item icon="mail"
              content={<a href={`mailto${item.email}`}>{item.email}</a>}
            />
          )}
          {item.url && (<List.Item icon="linkify" content={<a href={item.url}>{item.url}</a>} />)}
        </List>
      ))}
    </div>
  );
};

export default ProfileItem;
