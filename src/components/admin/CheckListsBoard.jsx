import React from 'react';
import { Table } from 'semantic-ui-react';
import Checklist from './Checklist';

const CheckListsBoard = ({
  data,
  deleteData,
  deletedId,
  updateDeletedId,
}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Title</Table.HeaderCell>
        <Table.HeaderCell>Tools</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {data.map(list => (
        <Checklist
          key={list.id}
          list={list}
          deleteList={deleteData}
          deletedId={deletedId}
          updateDeletedId={updateDeletedId}
        />
      ))}
    </Table.Body>
  </Table>
);

export default CheckListsBoard;
