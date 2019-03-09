import React from 'react';
import iconInfo from './info.svg';
import iconClose from './close.svg';
import styles from './NewChecklistMarkdown.module.css';

class MarkdownDescr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescr: true,
    };
  }

  toggleShowDescr = (showDescr) => {
    this.setState({ showDescr: !showDescr });
  }

  render() {
    const { showDescr } = this.state;
    return (
      <div>
        <button type="button" className={styles.mdDescrBtn} onClick={() => this.toggleShowDescr(showDescr)}>
          {showDescr ? <img src={iconClose} alt="close-icon" /> : <img src={iconInfo} alt="info-icon" />}
        </button>
        <div className={showDescr ? styles.mdDescr : styles.mdDescrHidden}>
          <ul className={styles.mdDescrList}>
            <li style={{ fontWeight: 'bold', fontSize: '1.2em' }}>To create a new checklist:</li>
            <li>1. Type &quot;# &quot; and some value to add checklist title.</li>
            <li>2. Type &quot;## &quot; and some value to add section title.</li>
            <li>3. Type &quot;### &quot; and some value to add item title.</li>
            <li>4. Type &quot;description: &quot; and some value to add description for item.</li>
            <li>Also you can:</li>
            <li>- Set priority for checklist:</li>
            <li>Type &quot;priority: &quot; and set value from 0 to 2</li>
            <li>Where:</li>
            <li>
              <i className={styles.priorityLow} aria-hidden />
              <span> 0 - low priority</span>
            </li>
            <li>
              <i className={styles.priorityMedium} aria-hidden />
              <span> 1 - medium priority</span>
            </li>
            <li>
              <i className={styles.priorityHigh} aria-hidden />
              <span> 2 - high priority</span>
            </li>
            <li>(If you do not specify a priority, it will 0 by default)</li>
            <li>- Add details:</li>
            <li>
              Type &quot;details: &quot; and some value. It can be text, link, markdown or code.
            </li>
            <li>
              <span style={{ fontWeight: 'bold' }}>Pay attention!</span>
              {' '}
              You should always add a vertical bar (pipe) &quot;|&quot;
after the last line of your description to close it.
            </li>
            <li>- Add tags:</li>
            <li>Type &quot;tags: &quot; and some tags via commas.</li>
            <li>- You can add as many sections and items as you want.</li>
            <li>Just type one more &quot;## &quot; or &quot;### &quot; from the new line.</li>
            <li>
- You can clear the markdown to the original template by clicking
              the appropriate button below markdown editor.
            </li>
            <li>
- You can upload your own markdown form md file by clicking
              the appropriate button below markdown editor.
            </li>
            <li>
When your checklist is finished, press the button &quot;Create checklist&quot;
              below markdown editor.
            </li>
            <li>Now you can use your checklist from the home page.</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default MarkdownDescr;
