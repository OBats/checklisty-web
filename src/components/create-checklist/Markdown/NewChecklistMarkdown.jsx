import React from 'react';
import { Button } from 'semantic-ui-react';
import createChecklist from '../../../api/checklist-api';
import { mdParse } from './MakdownParser';
import { mdExample, previewExample } from './mdExample';
import Markdown from './Markdown';
import styles from './NewChecklistMarkdown.module.css';

class NewChecklistMarkdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdValue: mdExample,
      mdError: '',
      checkList: previewExample,
      index: null,
      isMdValid: false,
    };
  }

  handleFileRead = (e) => {
    const content = e.target.result;
    this.setState({
      mdValue: content,
    });
    const parsedData = mdParse(content);
    this.setState({ checkList: parsedData.fullyParsedData });
  }

  handleFileChosen = (file) => {
    const { handleFileRead } = this;
    let { fileReader } = this;
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    if (file) {
      fileReader.readAsText(file);
    }
  }

  handleMarkdownChange = (newValue) => {
    this.setState({ mdValue: newValue });
    const parsedData = mdParse(newValue);
    this.setState({
      mdError: parsedData.errorMsg,
      checkList: parsedData.fullyParsedData,
      index: parsedData.index,
      isMdValid: parsedData.isMdValid,
    });
  }

  handleInputReset = (e) => {
    e.target.value = null;
  }

  handleClear = () => {
    this.setState({ mdValue: mdExample });
    const parsedData = mdParse(mdExample);
    this.setState({ checkList: parsedData.fullyParsedData });
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
    const { mdValue, mdError, checkList, index, isMdValid } = this.state;
    return (
      <div>
        <Markdown
          mdValue={mdValue}
          checkList={checkList}
          handleMarkdownChange={this.handleMarkdownChange}
          mdError={mdError}
          index={index}
        />
        <div className={styles.btnWrapper}>
          <Button className={styles.btn} onClick={this.handleClick}>Upload markdown</Button>
          <input
            type="file"
            ref="input_reader"
            accept=".md"
            style={{ display: 'none' }}
            onClick={this.handleInputReset}
            onChange={e => this.handleFileChosen(e.target.files[0])}
          />
          <Button className={styles.btn} onClick={this.handleClear}>Clear markdown</Button>
          <Button
            className={styles.btn}
            onClick={() => this.handleCreatingChecklist(checkList)}
            disabled={!isMdValid}
          >
            Create checklist
          </Button>
        </div>
      </div>
    );
  }
}

export default NewChecklistMarkdown;
