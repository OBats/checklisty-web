import React from 'react';
import { Segment, Icon, Progress } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import style from '../css/viewedLists.module.css';
import ViewedListsItemPagination from './ViewedListsItemsPagination';
import { saveHistoryLoader } from '../../../../actions/historyPagination';
import loaderStyle from '../../../main/loader.module.css';

const ViewedListsItems = (
  {
    checklist,
    checkboxData,
    activePage,
    handlePaginationChange,
    totalPages,
    loaderValue,
    handleSelectChange,
  },
) => {
  const showCreationData = data => `Created: ${data.slice(0, 10).split('-').reverse().join('/')}`;

  if (checklist.length) {
    return (
      <React.Fragment>
        <div className={style.itemsDiv}>
          {!loaderValue ? (
            <>
              {checklist && checklist.map((elem, index) => {
                if (elem) {
                  return (
                    <Segment key={index.toString()}>
                      <div className={style.viewedItem}>
                        <div className={style.itemDetails}>
                          <Icon name="list" color="teal" size="large" />
                          <div className={style.dateWithTitle}>
                            <Link to={`/checklist/${elem.slug}`} className={style.linkStyle}>
                              {elem.title}
                            </Link>
                            <span className={style.date}>
                              {showCreationData(elem.creation_date)}
                            </span>
                          </div>
                        </div>
                        <div className={style.progressBlock}>
                          <div className={style.progress}>
                            <Progress progress indicating percent={checkboxData[index]} />
                          </div>
                        </div>
                      </div>
                    </Segment>
                  );
                } return null;
              })}
            </>
          ) : (
            <div className={style.loaderPosition}>
              <div className={loaderStyle.loader}>Loading...</div>
            </div>
          )}
        </div>
        <div className={style.pagination}>
          <ViewedListsItemPagination
            activePage={activePage}
            handlePaginationChange={handlePaginationChange}
            totalPages={totalPages}
            handleSelectChange={handleSelectChange}
          />
        </div>
      </React.Fragment>
    );
  }
  return <h1>It seems like you have no checklists</h1>;
};

const mapStateToProps = ({ historyPagination }) => ({
  loaderValue: historyPagination.loaderValue,
});
const mapDispatchToProps = dispatch => ({
  saveHistoryLoader: (loaderValue) => {
    dispatch(saveHistoryLoader(loaderValue));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewedListsItems);
