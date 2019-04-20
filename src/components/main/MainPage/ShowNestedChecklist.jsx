import React, { useState, useEffect } from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { getNestedChecklist } from '../../../api/checklist-api';
import ShowListOfCheckList from './ShowListOfCheckList';
import loader from '../loader.module.css';
import styles from './ShowNestedChecklist.module.css';
import NotFound404 from '../../utils/404-page';
import { ErrorHandling } from '../../toasters/MessagesHandling';
import Footer from '../Footer';
import Header from '../Header';

const ShowNestedChecklist = (props) => {
  const [checklistData, setChecklistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const { match } = props;
  const slug = match.params.id;

  useEffect(() => {
    getNestedChecklist(slug)
      .then((res) => {
        setChecklistData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setFetchError(true);
          setLoading(false);
        } else {
          ErrorHandling('Something go wrong. Please try again later.');
        }
      });
  }, [slug]);

  if (loading) {
    return (
      <div className={loader.loader}>Loading...</div>
    );
  }

  if (fetchError) {
    return <NotFound404 />;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Header checkList={checklistData} title={checklistData.title} />
        <Container>
          <div className={styles.itemsWrapper}>
            <Segment style={{ padding: 0 }}>
              <ShowListOfCheckList data={checklistData.checklists_data} showNestedPage />
            </Segment>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ShowNestedChecklist;
