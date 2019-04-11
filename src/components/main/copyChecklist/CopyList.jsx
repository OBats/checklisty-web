/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react';
import { SuccessHandling, ErrorHandling, InfoToaster } from '../../toasters/MessagesHandling';
import http from '../../../api/http';

const CopyList = ({ user, checkList }) => {
  const [isCopied, setCopied] = useState(checkList.copiedBy.includes(user._id));
  const copy = () => {
    if (isCopied) {
      InfoToaster('List already copied');
    } else {
      http.get(`/api/checklists/copy/${checkList.slug}`)
        .then((res) => {
          if (res.status === 200) {
            SuccessHandling('List copied');
            setCopied(true);
          } else {
            ErrorHandling('Something go wrong');
          }
        });
    }
  };

  return (
    <Segment
      compact
      floated="right"
      style={{ marginTop: 0 }}
    >
      <Button
        icon
        basic
        onClick={copy}
      >
        <Icon
          name="copy"
          color={isCopied ? 'green' : 'grey'}
          size="large"
        />
      </Button>
    </Segment>
  );
};

export default CopyList;
