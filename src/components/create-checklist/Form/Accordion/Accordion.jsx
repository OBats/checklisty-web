import React from 'react';
import Collapsible from 'react-collapsible';
import Textarea from 'react-textarea-autosize';
import accordionStyles from './Accordion.module.css';

const Accordion = (props) => {
  const { name, onBlur, onChange } = props;

  return (
    <Collapsible
      className={accordionStyles.accordion}
      openedClassName={accordionStyles.accordion_open}
      contentInnerClassName={accordionStyles.inner_content}
      trigger="Click to add additional details in MarkDown"
    >
      <Textarea
        minRows={3}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
      />
    </Collapsible>
  );
};

export default Accordion;
