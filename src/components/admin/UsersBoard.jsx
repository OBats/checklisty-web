import React from 'react';
import { Table } from 'semantic-ui-react';
import User from './User';

const UsersBoard = ({
  data,
  deleteData,
  deletedId,
  updateDeletedId,
}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell textAlign="center">Username</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Role</Table.HeaderCell>
        <Table.HeaderCell textAlign="center">Status</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {data.map(user => user.role !== 'admin' && (
        <User
          key={user._id}
          user={user}
          deleteUser={deleteData}
          deletedId={deletedId}
          updateDeletedId={updateDeletedId}
        />
      ))}
    </Table.Body>
  </Table>
);

export default UsersBoard;
