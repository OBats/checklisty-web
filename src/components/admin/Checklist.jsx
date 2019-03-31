import React, { useState } from 'react';
import { Icon, Button, Popup, Table, Header, Modal } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import styles from './Checklist.module.css';

const Checklist = ({
  list,
  deleteList,
  deletedId,
  updateDeletedId,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const showCreationData = data => data.slice(0, 10).split('-').reverse().join('/');
  const showAuthorName = (author) => {
    if (!author) return 'unknown';
    return author.username;
  };
  const showModal = (id) => {
    setOpenModal(true);
    updateDeletedId(id);
  };

  const handleConfirm = () => {
    deleteList(deletedId);
    setOpenModal(false);
  };

  const handleCancel = () => setOpenModal(false);

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
        <Modal
          size="mini"
          className={styles.confirmModal}
          open={openModal}
          closeOnEscape
          closeOnDimmerClick
          onClose={() => setOpenModal(false)}
        >
          <Modal.Content>
            <p>Are you sure want to delete list?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative content="No" onClick={() => handleCancel()} />
            <Button
              positive
              content="Yes"
              onClick={() => handleConfirm()}
            />
          </Modal.Actions>
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
};

export default Checklist;
