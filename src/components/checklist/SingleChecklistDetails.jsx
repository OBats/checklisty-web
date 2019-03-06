import React from 'react';
import { Accordion } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import style from './css/SingleChecklistItem.module.css';

const SingleChecklistDetails = (props) => {
  const { propsData, accordionIndex } = props;
  return (
    <Accordion.Content active={accordionIndex === 0}>
      <div className={style.detailsStyle}>
        <ReactMarkdown source={propsData.details} />
      </div>
    </Accordion.Content>
  );
};

export default SingleChecklistDetails;
