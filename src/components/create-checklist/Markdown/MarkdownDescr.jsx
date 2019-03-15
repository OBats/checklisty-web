import React from 'react';
import iconInfo from './info.svg';
import iconClose from './close.svg';
import styles from './NewChecklistMarkdown.module.css';

class MarkdownDescr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescr: false,
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
            <li>...</li>
            {/* <li>
1. Type
              <span className={styles.bold}> &quot;# &quot; </span>
              {' '}
and some value to add checklist title. (e.g. # Movies)
            </li>
            <li>
2. Type
              <span className={styles.bold}> &quot;## &quot; </span>
              {' '}
and some value to add section title. (e.g. ## Actions)
            </li>
            <li>
3. Type
              <span className={styles.bold}> &quot;### &quot; </span>
              {' '}
and some value to add item title. Item title always should have description. (e.g. ### Gladiator)
            </li>
            <li>
4. Type
              <span className={styles.bold}> &quot;description: &quot;</span>
              {' '}
and some value to add description for item. (e.g description: A man robbed of his name
 and his dignity strives to win them back ...)
            </li>
            <li>Also you can:</li>
            <li>- Set priority for checklist:</li>
            <li>
Type
              <span className={styles.bold}> &quot;priority: &quot; </span>
              {' '}
and set value from 0 to 2
            </li>
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
            <li>(If you do not specify a priority or set invalid value it will 0 by default)</li>
            <li>- Add details:</li>
            <li>
              Type
              {' '}
              <span className={styles.bold}>&quot;details: &quot;</span>
              {' '}
and some value. (e.g. text, link, markdown or code)
            </li>
            <li>
              <span className={styles.bold}>Pay attention!</span>
              {' '}
              You should always add a vertical bar (pipe) &quot;|&quot;
after the last line of your description to close it.
            </li>
            <li>- Add tags:</li>
            <li>
Type
              <span className={styles.bold}>&quot;tags: &quot;</span>
              {' '}
and some tags via commas.
            </li>
            <li>- You can add as many sections and items as you want.</li>
            <li>
              Just type one more
              {' '}
              {' '}
              <span className={styles.bold}>&quot;## &quot; </span>
              or
              {' '}
              {' '}
              <span className={styles.bold}>&quot;### &quot; </span>
from the new line.
            </li>
            <li>
- You can clear the markdown to the original template by clicking
              the appropriate button below markdown editor.
            </li>
            <li>
- You can upload your own markdown from .md file by clicking
              the appropriate button below markdown editor.
            </li>
            <li>
              When your checklist is finished, press the button
              {' '}
              <span className={styles.bold}>&quot;Create checklist&quot; </span>
              below markdown editor.
            </li>
            <li>Now you can use your checklist from the home page.</li> */}
          </ul>
        </div>
      </div>
    );
  }
}

export default MarkdownDescr;
