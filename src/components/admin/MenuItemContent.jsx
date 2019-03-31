import React, { useState, useEffect } from 'react';
import { SuccessHandling, ErrorHandling } from '../toasters/MessagesHandling';
import loaderStyle from '../main/loader.module.css';

import Search from './Search';
import Pagination from './Pagination';
import ItemsPerPage from './ItemsPerPage';
import NotFoundResult from './NotFoundResult';

const MenuItemContent = ({
  fetchData,
  handleResponse,
  removeData,
  component: Component,
  intialSearchText,
}) => {
  const [data, setData] = useState([]);
  const [deletedId, setDeletedId] = useState(null);

  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [selectItemsNumber, setSelectItemsNumber] = useState(5);

  const [searchText, setSearchText] = useState(intialSearchText);

  const updateData = () => {
    try {
      setLoading(true);
      fetchData(activePage, searchText, selectItemsNumber)
        .then((response) => {
          const result = handleResponse(response.data, selectItemsNumber);
          setData(result.data);
          setTotalPage(result.totalPages);
          setFetching(false);
          setLoading(false);
        });
    } catch {
      ErrorHandling('Somethin go wrong!');
    }
  };

  useEffect(() => {
    updateData();
  }, [activePage, searchText, selectItemsNumber]);

  const deleteData = async (id) => {
    try {
      const result = await removeData(id);
      await updateData();
      SuccessHandling(result.data.message);
    } catch {
      ErrorHandling('Somethin go wrong!');
    }
  };

  const updateDeletedId = (value) => {
    setDeletedId(value);
  };

  if (fetching) return <div className={loaderStyle.loader}>Loading...</div>;

  return (
    <>
      <Search loading={loading} setActivePage={setActivePage} setSearchFilter={setSearchText} />
      {!data.length ? <NotFoundResult searchText={searchText} /> : (
        <>
          <Component
            data={data}
            deleteData={deleteData}
            deletedId={deletedId}
            updateDeletedId={updateDeletedId}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              activePage={activePage}
              totalPage={totalPage}
              setActivePage={setActivePage}
              setTotalPage={setTotalPage}
            />
            <ItemsPerPage
              setActivePage={setActivePage}
              setSelectItemsNumber={setSelectItemsNumber}
            />
          </div>
        </>
      )}
    </>
  );
};

export default MenuItemContent;
