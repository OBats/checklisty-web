import React, { useState } from 'react';
import { createChecklist, updateChecklist } from '../../../api/checklist-api';
import { mdParse } from './MakdownParser';
import previewExample from './mdExample';
import Markdown from './Markdown';
import styles from './css/NewChecklistMarkdown.module.css';
import { ErrorHandling,
  SuccessHandling } from '../../toasters/MessagesHandling';
import MarkdownButtons from './MarkdownButtons';

const NewChecklistMarkdown = (props) => {
  const [mdValue, setMdValue] = useState('');
  const [errorArr, setErrorArr] = useState([]);
  const [checkList, setCheckList] = useState(previewExample);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isMdValid, setIsMdValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [slug, setSlug] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  let inputFile; let
    teamId;

  if (props.location.query) teamId = props.location.query.teamId;

  const handleFileRead = (e) => {
    const content = e.target.result;
    const parsedData = mdParse(content);
    setMdValue(
      [...mdValue, content]
        .toString()
        .split(',')
        .join(''),
    );
    setCheckList(parsedData.fullyParsedData);
  };

  const handleFileChosen = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    if (file) {
      fileReader.readAsText(file);
    }
  };

  const handleMarkdownChange = (newValue, isPrivate) => {
    const parsedData = mdParse(newValue, isPrivate);
    const { errorArr, fullyParsedData, isMdValid } = parsedData;
    setMdValue(newValue);
    setErrorArr(errorArr);
    setCheckList(fullyParsedData);
    setIsMdValid(isMdValid);
  };

  const handleClick = () => {
    inputFile.click();
  };

  const handleClear = () => {
    setMdValue('');
    setCheckList('');
    setIsOpen(false);
  };

  const handleSaveChecklist = (checkList) => {
    if (teamId) checkList.teamId = teamId;

    setIsSaving(true);
    if (!isSaved) {
      createChecklist(checkList)
        .then((res) => {
          setIsSaved(true);
          setIsSaving(false);
          setSlug(res.data.slug);
          SuccessHandling('Your checklist has been saved successfully');
        })
        .catch((error) => {
          setIsSaving(false);
          if (error) {
            ErrorHandling('Server is down. Please try again later.');
          }
        });
    } else {
      updateChecklist(slug, checkList)
        .then((res) => {
          setIsSaving(false);
          setSlug(res.data.list.slug);
          SuccessHandling('Your checklist has been saved successfully');
        })
        .catch((error) => {
          setIsSaving(false);
          if (error) {
            ErrorHandling('Server is down. Please try again later.');
          }
        });
    }
  };

  const handleAccept = (checkList) => {
    if (teamId) checkList.teamId = teamId;

    if (!isSaved) {
      createChecklist(checkList)
        .then((res) => {
          teamId ? props.history.push(`/profile/myteam/${teamId}/${res.data.list.slug}`) : props.history.push('/profile/mylists');
          SuccessHandling('Your checklist has been saved successfully');
        })
        .catch((error) => {
          if (error.response) {
            ErrorHandling(error.response.data.message);
          } else {
            ErrorHandling('Server is down. Please try again later.');
          }
        });
    } else {
      updateChecklist(slug, checkList)
        .then((res) => {
          teamId ? props.history.push(`/profile/myteam/${teamId}/${res.data.list.slug}`) : props.history.push('/profile/mylists');
          SuccessHandling('Your checklist has been saved successfully');
        })
        .catch((error) => {
          if (error.response) {
            ErrorHandling(error.response.data.message);
          } else {
            ErrorHandling('Server is down. Please try again later.');
          }
        });
    }
  };

  const handleReject = () => {
    setIsConfirmOpen(false);
    teamId ? props.history.push(`/profile/myteam/${teamId}`) : props.history.push('/profile/mylists');
  };

  return (
    <div className={styles.md}>
      <Markdown
        mdValue={mdValue}
        checkList={checkList}
        handleMarkdownChange={newValue => handleMarkdownChange(newValue, isPrivate)
        }
        errorArr={errorArr}
      />
      <div className={styles.btnWrapper}>
        <input
          type="file"
          ref={(input) => {
            inputFile = input;
          }}
          accept=".md"
          style={{ display: 'none' }}
          onClick={(e) => {
            e.target.value = null;
          }}
          onChange={(e) => {
            handleFileChosen(e);
          }}
        />
        <MarkdownButtons
          isSaving={isSaving}
          isPrivate={isPrivate}
          isOpen={isOpen}
          isMdValid={!isMdValid}
          isConfirmOpen={isConfirmOpen}
          checkList={checkList}
          mdValue={mdValue}
          handleClick={handleClick}
          setIsOpen={setIsOpen}
          setIsPrivate={setIsPrivate}
          handleMarkdownChange={handleMarkdownChange}
          handleSaveChecklist={handleSaveChecklist}
          setIsConfirmOpen={setIsConfirmOpen}
          handleClear={handleClear}
          handleReject={handleReject}
          handleAccept={handleAccept}
          teamId={teamId}
        />
      </div>
    </div>
  );
};

export default NewChecklistMarkdown;
