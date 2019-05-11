import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';
import { Search, Segment, Container, Button, Icon, Checkbox, Header, Popup } from 'semantic-ui-react';
import { findChecklists, createNestedChecklist } from '../../../api/checklist-api';
import ShowListOfCheckList from '../../main/MainPage/ShowListOfCheckList';
import style from './css/CreateNestedChecklist.module.css';
import { ErrorHandling, SuccessHandling } from '../../toasters/MessagesHandling';

const CreateNestedChecklist = (props) => {
  const [searching, setSearching] = useState(false);
  const [seacrhResults, setSeacrhResults] = useState([]);
  const [filtredResults, setFiltredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [nestedChecklist, setNestedChecklist] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const author = props.userData._id;

  const filterSearchingResults = (seacrhResults) => {
    const filteredArr = [];
    let match = false;

    for (let i = 0; i < seacrhResults.length; i += 1) {
      match = false;
      for (let j = 0; j < nestedChecklist.length; j += 1) {
        if (seacrhResults[i].id === nestedChecklist[j].id) {
          match = true;
        }
      }
      if (!match) {
        filteredArr.push(seacrhResults[i]);
      }
    }
    setFiltredResults(filteredArr);
  };

  useEffect(() => {
    filterSearchingResults(seacrhResults);
  }, [filterSearchingResults, nestedChecklist, seacrhResults]);

  const changeTitle = (value) => {
    setTitle(value);
  };

  const handleResultSelect = (e, { result }) => {
    setNestedChecklist([result, ...nestedChecklist]);
  };

  const handleSearchChange = debounce(50, (value) => {
    setSearching(true);
    setSearchQuery(value);

    if (value.length > 0) {
      findChecklists(value)
        .then((res) => {
          setSeacrhResults(res.data);
          setSearching(false);
          filterSearchingResults(res.data);
        })
        .catch(() => {
          setSearching(false);
          setSeacrhResults([]);
        });
    } else {
      setSearching(false);
      setSeacrhResults([]);
    }
  });

  const handleCreating = (title, author, isPrivate, checklistData) => {
    setIsSaving(true);
    const values = {
      title,
      author_id: author,
      isPrivate,
      checklistData,
    };
    createNestedChecklist(values)
      .then(() => {
        setIsSaving(false);
        SuccessHandling('Your checklist has been saved successfully');
        props.history.push('/');
      })
      .catch(() => {
        ErrorHandling('Somethin go wrong!');
        setIsSaving(false);
      });
  };

  const handleRemove = (id) => {
    setNestedChecklist(nestedChecklist.filter(list => list.id !== id));
  };

  return (
    <>
      <div className={style.nestedChecklistWrapper}>
        <Container>
          <div className={style.searchBarWrapper}>
            <Search
              id="searchInput"
              className={style.searchBar}
              loading={searching}
              onResultSelect={handleResultSelect}
              onSearchChange={e => handleSearchChange(e.target.value, nestedChecklist)}
              results={filtredResults}
              value={searchQuery}
              placeholder="Search checklists..."
            />
            <div className={style.btnWrapper}>
              <Segment color="blue" className={style.isPrivateWrapper}>
                <Icon
                  color={isPrivate ? 'red' : 'green'}
                  name={isPrivate ? 'lock' : 'unlock'}
                  size="large"
                />
                <Checkbox
                  fitted
                  label={isPrivate ? 'Private' : 'Public'}
                  name="isPrivate"
                  toggle
                  checked={!!isPrivate}
                  onChange={() => setIsPrivate(!isPrivate)}
                />
              </Segment>
              {nestedChecklist.length < 1 || title.length < 1
                ? (
                  <Popup
                    trigger={(
                      <div>
                        <Button
                          positive
                          content="Save"
                          disabled
                        />
                      </div>
                    )}
                    wide="very"
                    content="Add title and at least one checklist to save"
                    position="bottom right"
                    verticalOffset={5}
                    horizontalOffset={-15}
                  />
                )
                : (
                  <Button
                    positive
                    content="Save"
                    loading={isSaving}
                    onClick={() => handleCreating(title, author, isPrivate, nestedChecklist)}
                  />
                )}
            </div>
          </div>
          <div className={style.segmentWrapper}>
            <div className={style.titleInputWrapper}>
              <input
                className={style.titleInput}
                value={title}
                onChange={e => changeTitle(e.target.value)}
                type="text"
                placeholder="Title..."
              />
            </div>
            <Segment className={style.listWrapper}>
              {nestedChecklist.length > 0
                ? (
                  <ShowListOfCheckList
                    data={nestedChecklist}
                    removeChecklist={handleRemove}
                    createNestedPage
                  />
                )
                : (
                  <>
                    <label htmlFor="searchInput" className={style.headerWrapper}>
                      <Header as="h2" icon>
                        <Icon name="search plus" />
                        Find and add checklists...
                      </Header>
                    </label>
                  </>
                )
              }
            </Segment>
          </div>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps)(CreateNestedChecklist);
