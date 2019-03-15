import React from 'react';
import AceEditor from 'react-ace';
import MainChecklistBlock from '../../checklist/MainChecklistBlock';
import styles from './NewChecklistMarkdown.module.css';
import 'brace/mode/markdown';
import 'brace/theme/textmate';
import MarkdownDescr from './MarkdownDescr';

const Markdown = props => (
  <div className={styles.markdownSection}>
    <div className={styles.markdownWrapper}>
      <div className={styles.markdownEditor}>
        <AceEditor
          className={styles.aceEditor}
          mode="markdown"
          theme="textmate"
          name="mdEditor"
          height="100%"
          width="100%"
          annotations={[{ row: props.index, type: 'error', text: props.mdError }]}
          onChange={props.handleMarkdownChange}
          fontSize={20}
          showPrintMargin
          showGutter
          focus
          highlightActiveLine
          value={props.mdValue}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 1,
          }}
        />
        <MarkdownDescr />
      </div>
      <div className={styles.markdownPreview}>
        <h1 className={styles.checklistTitle}>{props.checkList.title}</h1>
        <MainChecklistBlock checkListData={props.checkList} hideMainProgressbar />
      </div>
    </div>
  </div>
);

export default Markdown;
