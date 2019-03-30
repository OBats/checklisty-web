import React, { useState, useEffect } from 'react';
import { updateChecklist, getChecklist } from '../../../api/checklist-api';
import { mdParse } from '../../create-checklist/Markdown/MakdownParser';
import previewExample from '../../create-checklist/Markdown/mdExample';
import Markdown from '../../create-checklist/Markdown/Markdown';
import { ErrorHandling, SuccessHandling } from '../../toasters/MessagesHandling';
import styles from '../../create-checklist/Markdown/css/NewChecklistMarkdown.module.css';
import jsonToMd from '../../create-checklist/Markdown/JsonToMdParser';
import MarkdownButtons from '../../create-checklist/Markdown/MarkdownButtons';
import loaderStyle from '../../main/loader.module.css';
import NotFound404 from '../../utils/404-page';

const NewChecklistMarkdown = (props) => {
  const [mdValue, setMdValue] = useState('');
  const [errorArr, setErrorArr] = useState([]);
  const [checkList, setCheckList] = useState(previewExample);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isMdValid, setIsMdValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [slug, setSlug] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  let inputFile;
  let teamId;

  if (props.location.query) teamId = props.location.query.teamId;

  useEffect(() => {
    const checklistSlug = props.match.params.slug;
    getChecklist(checklistSlug)
      .then((res) => {
        const parsedJson = jsonToMd(res.data);
        setCheckList(res.data);
        setMdValue(parsedJson);
        setIsPrivate(res.data.isPrivate);
        setSlug(res.data.slug);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setCheckList(null);
          setLoading(false);
        } else {
          ErrorHandling('Server is down. Please try again later.');
        }
      });
  }, []);

  const handleFileRead = (e) => {
    const content = e.target.result;
    const parsedData = mdParse(content);
    setMdValue([...mdValue, content].toString().split(',').join(''));
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

  const handleClear = () => {
    setMdValue('');
    setCheckList('');
    setIsOpen(false);
  };

  const handleClick = () => {
    inputFile.click();
  };

  const handleSaveChecklist = (checkList, slug) => {
    if (teamId) checkList.teamId = teamId;

    setIsSaving(true);
    updateChecklist(slug, checkList)
      .then((res) => {
        setSlug(res.data.list.slug);
        setIsSaving(false);
        SuccessHandling('Your checklist has been saved successfully');
      })
      .catch((error) => {
        setIsSaving(false);
        if (error.response) {
          ErrorHandling(error.response.data.message);
        } else {
          ErrorHandling('Server is down. Please try again later.');
        }
      });
  };

  const handleAccept = (checkList, slug) => {
    if (teamId) checkList.teamId = teamId;

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
  };

  const handleReject = () => {
    setIsConfirmOpen(false);
    teamId ? props.history.push(`/profile/myteam/${teamId}`) : props.history.push('/profile/mylists');
  };

  if (loading) {
    return (
      <div className={loaderStyle.loader}>Loading...</div>
    );
  }

  if (!checkList) {
    return <NotFound404 />;
  }

  return (
    <div className={styles.md}>
      <Markdown
        mdValue={mdValue}
        checkList={checkList}
        handleMarkdownChange={newValue => handleMarkdownChange(newValue, isPrivate)}
        errorArr={errorArr}
      />
      <div className={styles.btnWrapper}>
        <input
          type="file"
          ref={(input) => { inputFile = input; }}
          accept=".md"
          style={{ display: 'none' }}
          onClick={(e) => { e.target.value = null; }}
          onChange={(e) => { handleFileChosen(e); }}
        />
        <MarkdownButtons
          isSaving={isSaving}
          isPrivate={isPrivate}
          isOpen={isOpen}
          isMdValid={!isMdValid}
          isConfirmOpen={isConfirmOpen}
          checkList={checkList}
          slug={slug}
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
