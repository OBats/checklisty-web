import React, { useState } from 'react';
import { Icon, Button, Image, Table, Header, Modal } from 'semantic-ui-react';
import Select from 'react-select';
import http from '../../api/http';
import { ErrorHandling, InfoToaster } from '../toasters/MessagesHandling';
import styles from './User.module.css';

const User = ({
  user,
  deleteUser,
  deletedId,
  updateDeletedId,
}) => {
  const roles = [
    { value: 'moderator', label: 'moderator' },
    { value: 'user', label: 'user' },
  ];
  const userRole = roles.filter(role => role.value === user.role)[0];

  const statuses = [
    { value: 'active', label: 'active' },
    { value: 'blocked', label: 'blocked' },
  ];
  const userStatus = statuses.filter(status => status.value === (user.isBlocked ? 'blocked' : 'active'))[0];

  const [valueOfRole, setValueOfRole] = useState(userRole);
  const [status, setIsBlocked] = useState(userStatus);
  const [loadingOnStatus, setLoadingOnStatus] = useState(false);
  const [loadingOnRole, setLoadingOnRole] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const showModal = (id) => {
    setOpenModal(true);
    updateDeletedId(id);
  };

  const handleConfirm = () => {
    setOpenModal(false);
    deleteUser(deletedId);
  };

  const handleCancel = () => setOpenModal(false);

  const handleChangeOfRole = async (role) => {
    if (role.value === valueOfRole.value) return InfoToaster(`The role is already: ${role.value}`);
    if (status.value === 'blocked' && role.value === 'moderator') {
      return ErrorHandling('You can not give moderator rights to blocked user!');
    }
    try {
      setLoadingOnRole(true);
      const response = await http.put(`api/admin/users/${user._id}/role?userRole=${role.value}`);
      setValueOfRole(role);
      InfoToaster(response.data);
      setLoadingOnRole(false);
    } catch {
      ErrorHandling('The request failed, please try again!');
    }
  };

  const handleChangeOfStatus = async (status) => {
    try {
      setLoadingOnStatus(true);
      const response = await http.put(`api/admin/users/${user._id}/status?userStatus=${status.value}`);
      setIsBlocked(status);
      InfoToaster(response.data.message);
      setLoadingOnStatus(false);
    } catch {
      ErrorHandling('The request failed, please try again!');
    }
  };

  return (
    <Table.Row>
      <Table.Cell className={styles.userContent}>
        <Header as="h4" image>
          <Image avatar rounded src={user.image} />
          <Header.Content>
            {user.username}
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell className={styles.gridColum}>
        <Select
          className={styles.roleSelector}
          isLoading={loadingOnRole}
          value={valueOfRole}
          isSearchable={false}
          onChange={value => handleChangeOfRole(value)}
          options={roles}
        />
      </Table.Cell>
      <Table.Cell className={styles.gridColum}>
        <Select
          className={(userStatus.value === 'active' ? styles.statusSelector : styles.statusBlocked)}
          value={status}
          isSearchable={false}
          isLoading={loadingOnStatus}
          onChange={value => handleChangeOfStatus(value)}
          options={statuses}
        />
      </Table.Cell>
      <Table.Cell className={styles.deleteButton}>
        <Button
          icon
          onClick={() => showModal(user._id)}
        >
          <Icon name="remove" color="red" />
        </Button>
      </Table.Cell>
      <Modal
        size="mini"
        className={styles.confirmModal}
        open={openModal}
        closeOnEscape
        closeOnDimmerClick
        onClose={() => setOpenModal(false)}
      >
        <Modal.Content>
          <p>
            Are you sure want to delete
            {' '}
            {user.username}
            ?
          </p>
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
    </Table.Row>
  );
};

export default User;
