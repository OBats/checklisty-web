import React, { useState } from 'react';
import { List, Icon, Button, Confirm, Popup } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import loaderStyle from '../../../main/loader.module.css';
import http from '../../../../api/http';
import { ErrorHandling } from '../../../toasters/MessagesHandling';

const TeamLists = ({ lists, listLoad, teamId, setLists }) => {
  if (listLoad) {
    return (
      <div className={loaderStyle.loader}>Loading...</div>
    );
  }

  if (lists === 1) {
    return <span>Not Found!</span>;
  }

  const [isOpen, setIsOpen] = useState(false);

  const deleteReq = (id) => {
    http.delete(`/api/checklists/${id}?teamId=${teamId}`)
      .then((res) => {
        setLists(0);
      })
      .catch((err) => {
        ErrorHandling('Something went wrong! List was not deleted!');
      });

    setIsOpen(false);
  };

  return (
    <List size="huge" divided link>
      { lists.map(list => (
        <List.Item
          key={list.id}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <List.Icon name="th list" />
          <List.Content style={{ paddingLeft: '25px' }}>
            <List.Header as={Link} to={`/profile/myteam/${teamId}/${list.slug}`}>{list.title}</List.Header>
            <List.Description as="div" style={{ display: 'flex', alignItems: 'center' }}>
              {`Created: ${(new Date(list.date)).toLocaleDateString('en-GB')}`}
            </List.Description>
          </List.Content>
          <Popup
            inverted
            content="Edit via form"
            trigger={(
              <Link to={{ pathname: `/edit-checklist/${list.slug}`, query: { teamId } }}>
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
              <Link to={{ pathname: `/edit-checklist-markdown/${list.slug}`, query: { teamId } }}>
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
              <Button icon onClick={e => setIsOpen(true)}>
                <Icon name="remove" color="red" />
              </Button>
            )}
          />
          <Confirm
            open={isOpen}
            content="Are you realy want to delete this list?"
            onCancel={e => setIsOpen(false)}
            onConfirm={(e) => { deleteReq(list.id); }}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default TeamLists;
