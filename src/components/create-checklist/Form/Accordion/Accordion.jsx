import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import Textarea from 'react-textarea-autosize';
import accordionStyles from './Accordion.module.css';

const Accordion = (props) => {
  const { name, handleBlur, handleChange } = props;

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
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </Collapsible>
  );
};

Accordion.propTypes = {
  name: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Accordion;
