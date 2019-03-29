import React from 'react';
import { Icon, Button, Confirm, Popup, Table, Header } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';

const Checklist = ({
  list,
  deleteList,
  openModal,
  updateStatusOfModal,
  deletedId,
  updateDeletedId,
}) => {
  const { author } = list;

  const showCreationData = data => data.slice(0, 10).split('-').reverse().join('/');
  const showAuthorName = (author) => {
    if (!author) return 'unknown';
    return author.username;
  };
  const showModal = (id) => {
    updateStatusOfModal(true);
    updateDeletedId(id);
  };

  const handleConfirm = () => {
    deleteList(deletedId);
    updateStatusOfModal(false);
  };

  const handleCancel = () => updateStatusOfModal(false);

  return (
    <Table.Row>
      <Table.Cell>
        <Header as="a" href={`/${list.slug}`}>
          <Header.Content>
            {list.title}
          </Header.Content>
        </Header>
        <Popup
          trigger={<Icon name="info circle" style={{ color: '#00b5ad', float: 'right' }} />}
          header={showAuthorName(list.author)}
          content={showCreationData(list.creation_date)}
        />
      </Table.Cell>
      <Table.Cell textAlign="right">
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
            <Button icon onClick={() => showModal(list.id)}>
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
      </Table.Cell>
    </Table.Row>
  );
};

export default Checklist;
