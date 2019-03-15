import React from 'react';
import { Button } from 'semantic-ui-react';
import { confirmAlert } from 'react-confirm-alert';
import createChecklist from '../../../api/checklist-api';
import { mdParse } from './MakdownParser';
import { previewExample, mdExample } from './mdExample';
import Markdown from './Markdown';
import styles from './NewChecklistMarkdown.module.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

class NewChecklistMarkdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdValue: mdExample,
      errorArr: [],
      checkList: previewExample,
      index: null,
      isMdValid: false,
    };
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

  handleMarkdownChange = (newValue) => {
    const parsedData = mdParse(newValue);
    // console.log(parsedData.index);
    this.setState({
      mdValue: newValue,
      errorArr: parsedData.errorArr,
      checkList: parsedData.fullyParsedData,
      index: parsedData.index,
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
              this.setState({ mdValue: '', checkList: '' });
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

  handleCreatingChecklist = (checkList) => {
    createChecklist(checkList)
      .then(this.setState({ isMdValid: false }))
      .then(res => this.props.history.push(`/checklist/${res.data.slug}`));
  }

  render() {
    const { mdValue, errorArr, checkList, index, isMdValid } = this.state;
    return (
      <div>

        <Markdown
          mdValue={mdValue}
          checkList={checkList}
          handleMarkdownChange={this.handleMarkdownChange}
          errorArr={errorArr}
          index={index}
        />


        <div className={styles.btnWrapper}>
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
          <Button
            className={[styles.btn, styles.createChecklistBtn].join(' ')}
            onClick={() => this.handleCreatingChecklist(checkList)}
            disabled={!isMdValid}
          >
            Save and close
          </Button>
        </div>
      </div>
    );
  }
}

export default NewChecklistMarkdown;
