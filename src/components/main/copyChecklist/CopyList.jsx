/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Dropdown, Icon, Button } from 'semantic-ui-react';
import { SuccessHandling, ErrorHandling, InfoToaster } from '../../toasters/MessagesHandling';
import http from '../../../api/http';

import styles from './CopyList.module.css';

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

  const text = isCopied ? 'Already Copied' : 'Coppy list';

  return (
    <Dropdown
      className={styles.dropdown}
      icon="bars"
      multiple
      item
      pointing="top right"
    >
      <Dropdown.Menu>
        <Dropdown.Item>
          <Button onClick={copy} className={styles.dropdownButton}>
            <Icon name="edit" color={isCopied ? 'green' : 'grey'} />
            {text}
          </Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CopyList;
