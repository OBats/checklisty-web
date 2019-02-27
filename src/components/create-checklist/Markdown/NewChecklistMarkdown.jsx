import React from 'react';
import { Button } from 'semantic-ui-react';
import AceEditor from 'react-ace';
import styles from './NewChecklistMarkdown.module.css';
// import brace from 'brace';
import 'brace/mode/markdown';
import 'brace/theme/twilight';
import 'brace/theme/textmate';
import MainChecklistBlock from '../../checklist/MainChecklistBlock';

class NewChecklistMarkdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mdValue: '',
      checkList: {
        sections_data: [
          {
            section_title: 'Section title',
            items_data: [
              {
                tags: [
                  'css',
                ],
                item_title: 'Item title',
                description: 'description',
                details: 'details',
                priority: 1,
              },
              {
                tags: [
                  'js',
                ],
                item_title: 'Item title',
                description: 'description',
                details: 'details',
                priority: 2,
              },
            ],
          },
        ],
      },
    };
  }

  handleFileRead = (e) => {
    const content = e.target.result;
    this.setState({
      mdValue: content,
    });
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
  }

  handleInputReset = (e) => {
    e.target.value = null;
  }

  handleClear = () => {
    this.setState({ mdValue: '' });
  }

  handleClick = () => {
    const input = this.refs.input_reader;
    input.click();
  };

  render() {
    const { mdValue, checkList } = this.state;
    return (
      <div className={styles.markdownSection}>
        <div className={styles.markdownWrapper}>
          <div className={styles.markdownEditor}>
            <AceEditor
              mode="markdown"
              theme="textmate"
              name="mdEditor"
              height="100%"
              width="100%"
              onChange={this.handleMarkdownChange}
              fontSize={18}
              showPrintMargin
              showGutter
              highlightActiveLine
              value={mdValue}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: false,
                tabSize: 2,
              }}
            />
          </div>
          <div className={styles.markdownPreview}>
            <MainChecklistBlock checkListData={checkList} />
          </div>
        </div>
        <div className={styles.markdownButtons}>
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
          <Button className={styles.btn}>Preview</Button>
        </div>
      </div>
    );
  }
}

export default NewChecklistMarkdown;
