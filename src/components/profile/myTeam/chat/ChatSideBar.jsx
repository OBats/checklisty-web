import React, { useState, useEffect } from 'react';
import { Loader, Image, List, Icon } from 'semantic-ui-react';
import http from '../../../../api/http';
import avatar from '../../Avatar/avatar.png';

const ChatSideBar = ({ teamId }) => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState(null);

  useEffect(() => {
    http.get(`/api/team/${teamId}/members`)
      .then((res) => {
        setTeamMembers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setTeamMembers(undefined);
        setLoading(false);
      });
  });

  if (loading) return <Loader>Loading</Loader>;
  if (teamMembers === undefined) return <div>Oops, something went wrong!</div>;

  return (
    <List divided>
      { teamMembers.map(member => (
        <List.Item key={member.id}>
          <Image avatar src={member.image || avatar} />
          <List.Content>
            <List.Header>
              { member.firstName && member.lastName
                ? `${member.firstName} ${member.lastName}` : member.username }
            </List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default ChatSideBar;
