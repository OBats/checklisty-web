/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { List } from 'semantic-ui-react';

const ProfileItem = (props) => {
  const { data } = props;
  return (
    <div>
      {data.map((item, id) => (
        <List key={`items${id}-${item.name}`}>
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
