import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../navbar/logo.png';
import styles from './MainPage.module.css';

const ShowListOfCheckList = (props) => {
  const countingItems = (checklist) => {
    const howMuchItems = checklist.reduce((acc, current) => acc + current.items_data.length, 0);
    const msg = howMuchItems === 1 || howMuchItems === 0 ? `${howMuchItems} item` : `${howMuchItems} items`;
    return msg;
  };

  const showCreationData = data => `Created: ${data.slice(0, 10).split('-').reverse().join('/')}`;
  const { data } = props;
  if (data) {
    return (
      data.map(currentCheckList => (
        <Link
          to={`/${currentCheckList.slug}`}
          className={styles.checkListLink}
          key={currentCheckList.id}
        >
          <div className={styles.imageContainer}>
            <div>
              <img src={logo} alt="checklist-logo" />
            </div>
          </div>
          <div className={styles.checkListInfo}>
            <div className={styles.titleAndAuthor}>
              <div className={styles.title}>
                {currentCheckList.title}
              </div>
              <div className={styles.author}>
                {currentCheckList.author === null ? 'User was deleted' : currentCheckList.author.username}
              </div>
            </div>
            <div className={styles.checkListAmount}>
              <div>
                {countingItems(currentCheckList.sections_data)}
              </div>
              <div>
                {showCreationData(currentCheckList.creation_date)}
              </div>
            </div>
          </div>
        </Link>
      ))
    );
  }
  return null;
};

export default ShowListOfCheckList;
