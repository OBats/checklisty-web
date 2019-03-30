import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid, Menu } from 'semantic-ui-react';
import CheckListsBoard from './CheckListsBoard';
import UsersBoard from './UsersBoard';
import MenuItemContent from './MenuItemContent';
import { ErrorHandling } from '../toasters/MessagesHandling';

import style from './AdminBoard.module.css';

import http from '../../api/http';

const getChecklists = (activePage, searchText, perPage) => http.get(`api/checklists/page=${activePage}/search=${searchText}/limit=${perPage}`);

const handleChecklistsResponse = (response, selectItemsNumber) => {
  const totalPages = Math.ceil((response.totalItems) / selectItemsNumber);

  return { data: response.result, totalPages };
};

const removeChecklist = id => http.delete(`/api/checklists/${id}`);

const getUsers = (activePage, searchText, perPage) => (
  http.get(`api/admin/users?page=${activePage}&search=${searchText}&perPage=${perPage}`)
);

const handleUsersResponse = response => (
  { data: response.usersPerPage, totalPages: response.totalPages }
);

const removeUser = id => http.delete(`api/admin/users/${id}`);

const AdminBoard = ({ userData }) => {
  if (userData.role !== 'user') {
    const activePage = (userData.role === 'moderator') ? 'checklists' : 'users';
    const [activeItem, setActiveItem] = useState(activePage);

    const handleItemClick = (e, { name }) => {
      setActiveItem(name);
    };

    return (
      <Grid className={style.grid}>
        <Grid.Column width={4} className={style.columnMenuBar}>
          <Menu fluid vertical tabular>
            {userData.role === 'admin'
            && (
              <Menu.Item
                name="users"
                active={activeItem === 'users'}
                onClick={handleItemClick}
              />
            )
            }
            <Menu.Item
              name="checklists"
              active={activeItem === 'checklists'}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12} className={style.columnContent}>
          {activeItem === 'checklists'
              && (
                <MenuItemContent
                  fetchData={getChecklists}
                  handleResponse={handleChecklistsResponse}
                  removeData={removeChecklist}
                  component={CheckListsBoard}
                  intialSearchText="undefined"
                />
              )
          }
          {userData.role === 'admin' && activeItem === 'users'
            && (
              <MenuItemContent
                fetchData={getUsers}
                handleResponse={handleUsersResponse}
                removeData={removeUser}
                component={UsersBoard}
                intialSearchText=""
              />
            )}
        </Grid.Column>
      </Grid>
    );
  }
  ErrorHandling('You have no permission to admin tools!');
  return <Redirect to={{ pathname: '/' }} />;
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps, null)(AdminBoard);
