import React, { useState } from 'react';
import infoIcon from './img/info.svg';
import closeIcon from './img/close.svg';
import styles from './css/NewChecklistMarkdown.module.css';

const MarkdownDescr = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleIsOpen = (isOpen) => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <button
        type="button"
        className={styles.mdDescrBtn}
        onClick={() => toggleIsOpen(isOpen)}
        title="Press to show/hide information window"
      >
        {isOpen ? <img src={closeIcon} alt="close-icon" /> : <img src={infoIcon} alt="info-icon" />}
      </button>
      <div className={isOpen ? styles.mdDescr : styles.mdDescrHidden}>
        <ul className={styles.mdDescrList}>
          <li style={{ fontWeight: 'bold', fontSize: '1.2em' }}>To create a new checklist:</li>
          <li>
1. Type
            <span className={styles.bold}> &quot;# &quot; </span>
            {' '}
to add checklist title. (e.g. # Movies)
          </li>
          <li>
2. Type
            <span className={styles.bold}> &quot;## &quot; </span>
            {' '}
to add section title. (e.g. ## Actions)
          </li>
          <li>
3. Type
            <span className={styles.bold}> &quot;### &quot; </span>
            {' '}
to add item title. (e.g. ### Gladiator)
          </li>
          <li>
4. Type
            <span className={styles.bold}> &quot;description: &quot;</span>
            {' '}
            {`to add item's description. (e.g description: A man robbed of his name
 and his dignity strives to win them back ...)`}
          </li>
          <li>Also you can:</li>
          <li>- Set priority for checklist:</li>
          <li>
Type
            <span className={styles.bold}> &quot;priority: &quot; </span>
            {' '}
and set value from 0 to 2 or appropriate word (low, medium, high)
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
          <li>(If you do not specify a priority or set invalid value it will 0 - low by default)</li>
          <li>- Add details:</li>
          <li>
              Just type your details after item. (e.g. text, links, images, markdown, code and others).
(Markdown guide
            {' '}
            <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noopener noreferrer">here</a>
)
          </li>
          <li>- Add tags:</li>
          <li>
Type
            <span className={styles.bold}>&quot;tags: &quot;</span>
            {' '}
and some tags via comma.
          </li>
          <li>- You can add as many sections and items as you want.</li>
          <li>
              Just type one more
            {' '}
            {' '}
            <span className={styles.bold}>&quot;## &quot; </span>
              and
            {' '}
            {' '}
            <span className={styles.bold}>&quot;### &quot; </span>
from the new line.
          </li>
          <li>
- You can upload your own markdown from .md file by clicking
              &quot;Upload markdown...&quot; button below markdown editor.
          </li>
          <li>
- You can clear the markdown to the original template by clicking
              &quot;Clear markdown...&quot; button below markdown editor.
          </li>
          <li>
- You can save your progress by clicking on &quot;Save&quot; button below markdown editor.
          </li>
          <li>
              When your checklist is finished, press the button
            {' '}
            <span className={styles.bold}>&quot;Close&quot; </span>
              below markdown editor.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MarkdownDescr;
