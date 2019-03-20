import React from 'react';
import { Button, Segment, Icon, Checkbox } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import { getChecklist, updateChecklist } from '../../../api/checklist-api';
import { mdParse } from '../../create-checklist/Markdown/MakdownParser';
import Markdown from '../../create-checklist/Markdown/Markdown';
import styles from '../../create-checklist/Markdown/css/NewChecklistMarkdown.module.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import previewExample from '../../create-checklist/Markdown/mdExample';
import jsonToMd from '../../create-checklist/Markdown/JsonToMdParser';

class EditChecklistMarkdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdValue: '',
      errorArr: [],
      checklistData: previewExample,
      isMdValid: false,
      isPrivate: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const checklistSlug = match.params.slug;

    getChecklist(checklistSlug)
      .then((res) => {
        const parsedJson = jsonToMd(res.data);
        this.setState({
          checklistData: res.data,
          mdValue: parsedJson,
          isPrivate: res.data.isPrivate,
        });
      });
  }

  handleFileRead = (e) => {
    const content = e.target.result;
    const parsedData = mdParse(content);
    this.setState({ mdValue: content, checkList: parsedData.fullyParsedData });
  }

  handleFileChosen = (file) => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;
    if (file) {
      this.fileReader.readAsText(file);
    }
  }

  handleInputReset = (e) => {
    e.target.value = null;
  }

  handleMarkdownChange = (newValue, isPrivate) => {
    const parsedData = mdParse(newValue, isPrivate);
    this.setState({
      mdValue: newValue,
      errorArr: parsedData.errorArr,
      checklistData: parsedData.fullyParsedData,
      isMdValid: parsedData.isMdValid,
    });
  }

  handleConfirmClear = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className={styles.ConfirmPopup}>
          <h1>Are you sure?</h1>
          <p>You want to clear markdown to starting template?</p>
          <Button negative className={styles.PopupBtn} onClick={onClose}>No</Button>
          <Button
            positive
            className={styles.PopupBtn}
            onClick={() => {
              this.setState({ mdValue: '', checklistData: '' });
              onClose();
            }}
          >
            Yes
          </Button>
        </div>
      ),
    });
  }

  handleClick = () => {
    const input = this.refs.input_reader;
    input.click();
  };

  handleUpdateChecklist = (checklistData) => {
    const { match, history } = this.props;
    const checklistSlug = match.params.slug;

    updateChecklist(checklistSlug, checklistData)
      .then((res) => {
        this.setState({ isMdValid: false });
        history.push(`/${res.data.list.slug}`);
      });
  }

  render() {
    const { mdValue, errorArr, checklistData, index, isMdValid, isPrivate } = this.state;

    return (
      <div className={styles.md}>
        <Markdown
          mdValue={mdValue}
          checkList={checklistData}
          handleMarkdownChange={newValue => this.handleMarkdownChange(newValue, isPrivate)}
          errorArr={errorArr}
          index={index}
        />
        <div className={styles.btnWrapper}>
          <Segment color="blue" compact>
            <Button className={styles.btn} onClick={this.handleClick}>Upload markdown...</Button>
            <input
              type="file"
              ref="input_reader"
              accept=".md"
              style={{ display: 'none' }}
              onClick={this.handleInputReset}
              onChange={e => this.handleFileChosen(e.target.files[0])}
            />
            <Button className={styles.btn} onClick={this.handleConfirmClear}>Clear markdown</Button>
            <div style={{ display: 'inline-block', width: 150, marginBottom: 10 }}>
              <Icon color="green" name="lock" size="large" />
              <Checkbox
                fitted
                label={isPrivate ? 'Priviate' : 'Public'}
                name="isPrivate"
                toggle
                checked={isPrivate}
                onChange={() => {
                  this.setState({ isPrivate: !isPrivate });
                  this.handleMarkdownChange(mdValue, !isPrivate);
                }}
              />
            </div>
            <Button
              className={[styles.btn, styles.createChecklistBtn].join(' ')}
              onClick={() => this.handleUpdateChecklist(checklistData)}
              disabled={!isMdValid}
            >
              Save and close
            </Button>
          </Segment>
        </div>
      </div>
    );
  }
}

export default EditChecklistMarkdown;
