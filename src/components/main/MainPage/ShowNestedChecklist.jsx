import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { getNestedChecklist } from '../../../api/checklist-api';
import ShowListOfCheckList from './ShowListOfCheckList';
import loader from '../loader.module.css';
import styles from './ShowNestedChecklist.module.css';

const ShowNestedChecklist = (props) => {
  const [checklistData, setChecklistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { match } = props;
  const slug = match.params.id;

  useEffect(() => {
    try {
      getNestedChecklist(slug)
        .then((res) => {
          setChecklistData(res.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div className={loader.loader}>Loading...</div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Container>
        <ShowListOfCheckList data={checklistData.checklists_data} />
      </Container>
    </div>
  );
};

export default ShowNestedChecklist;
