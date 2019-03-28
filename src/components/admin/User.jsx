import React, { useState } from 'react';
import { Icon, Button, Confirm, Image, Table, Header } from 'semantic-ui-react';
import Select from 'react-select';
import http from '../../api/http';
import { SuccessHandling, ErrorHandling } from '../toasters/MessagesHandling';
import styles from './User.module.css';

const User = ({
  user,
  deleteUser,
  openModal,
  updateStatusOfModal,
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

  const showModal = (id) => {
    updateStatusOfModal(true);
    updateDeletedId(id);
  };

  const handleConfirm = () => {
    deleteUser(deletedId);
    updateStatusOfModal(false);
  };

  const handleCancel = () => updateStatusOfModal(false);

  const handleChangeOfRole = async (role) => {
    if (role.value === valueOfRole.value) return SuccessHandling(`The role is already: ${role.value}`);
    if (status.value === 'blocked' && role.value === 'moderator') {
      return ErrorHandling('You can not give moderator rights to blocked user!');
    }
    try {
      setLoadingOnRole(true);
      const response = await http.put(`api/admin/users/${user._id}/role?userRole=${role.value}`);
      setValueOfRole(role);
      setLoadingOnRole(false);
      SuccessHandling(response.data);
    } catch {
      ErrorHandling('The request failed, please try again!');
    }
  };

  const handleChangeOfStatus = async (status) => {
    try {
      setLoadingOnStatus(true);
      const response = await http.put(`api/admin/users/${user._id}/status?userStatus=${status.value}`);
      setIsBlocked(status);
      setLoadingOnStatus(false);
      SuccessHandling(response.data.message);
    } catch {
      ErrorHandling('The request failed, please try again!');
    }
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Header as="h4" image>
          <Image avatar rounded src={user.image} />
          <Header.Content>
            {user.username}
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Select
          className={styles.roleSelector}
          value={valueOfRole}
          isLoading={loadingOnRole}
          onChange={value => handleChangeOfRole(value)}
          options={roles}
        />
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Select
          className={styles.statusSelector}
          value={status}
          isLoading={loadingOnStatus}
          onChange={value => handleChangeOfStatus(value)}
          options={statuses}
        />
      </Table.Cell>
      <Table.Cell>
        <Button
          floated="right"
          icon
          onClick={() => showModal(user._id)}
        >
          <Icon name="remove" color="red" />
        </Button>
      </Table.Cell>
      <Confirm
        open={openModal}
        content="Are you realy want to delete list"
        onCancel={handleCancel}
        onConfirm={() => handleConfirm()}
      />
    </Table.Row>
  );
};

export default User;
