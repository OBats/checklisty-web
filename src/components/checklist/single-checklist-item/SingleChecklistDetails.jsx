import React from 'react';
import ReactMarkdown from 'react-markdown';
import style from '../css/SingleChecklistItem.module.css';
import MarkdownHighlighter from './tools/MarkdownHighlighter';

const SingleChecklistDetails = (props) => {
  const { propsData, accordionIndex } = props;
  return (
    <div className={
      accordionIndex === 0 ? style.animatedDetailsOpened : style.animatedDetailsClosed
    }
    >
      <div className={style.detailsStyle}>
        <ReactMarkdown
          source={propsData.details}
          renderers={{ code: MarkdownHighlighter }}
        />
      </div>
    </div>
  );
};

export default SingleChecklistDetails;
