import React from 'react';
import { Button, Segment, Icon, Checkbox, Modal } from 'semantic-ui-react';
import styles from './css/NewChecklistMarkdown.module.css';

const MarkdownButtons = (props) => {
  const {
    isPrivate,
    setIsPrivate,
    handleMarkdownChange,
    handleSaveChecklist,
    isMdValid,
    slug,
    isSaving,
    isOpen,
    setIsConfirmOpen,
    handleClear,
    isConfirmOpen,
    handleReject,
    mdValue,
    checkList,
    handleClick,
    setIsOpen,
    handleAccept,
  } = props;

  return (
    <div className={styles.btnWrapper}>
      <Segment compact>
        <Button className={styles.btn} onClick={() => handleClick()}>Upload markdown...</Button>
        <Button className={styles.btn} onClick={() => setIsOpen(true)}>Clear markdown</Button>
        <span className={styles.saveCloseWrapper}>
          <div className={styles.isPrivateWrapper}>
            <Icon
              className={styles.transition}
              color={isPrivate ? 'red' : 'green'}
              name={isPrivate ? 'lock' : 'unlock'}
              size="large"
            />
            <Checkbox
              fitted
              label={isPrivate ? 'Private' : 'Public'}
              name="isPrivate"
              toggle
              checked={isPrivate}
              onChange={() => {
                setIsPrivate(!isPrivate);
                handleMarkdownChange(mdValue, !isPrivate);
              }}
            />
          </div>
          <Button
            loading={isSaving}
            positive
            onClick={() => handleSaveChecklist(checkList, slug)}
            disabled={isMdValid}
          >
            Save
          </Button>
          <Button
            negative
            onClick={() => setIsConfirmOpen(true)}
            disabled={isMdValid}
          >
            Close
          </Button>
        </span>
        <Modal
          size="mini"
          className={styles.confirmModal}
          open={isOpen}
          closeOnEscape
          closeOnDimmerClick
          onClose={() => setIsOpen(false)}
        >
          <Modal.Content>
            <p>Are you sure you want to clear markdown?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative content="No" onClick={() => setIsOpen(false)} />
            <Button
              positive
              content="Yes"
              onClick={() => handleClear()}
            />
          </Modal.Actions>
        </Modal>
        <Modal
          size="mini"
          className={styles.confirmModal}
          open={isConfirmOpen}
          closeOnEscape
          closeOnDimmerClick
          onClose={() => setIsConfirmOpen(false)}
        >
          <Modal.Content>
            <p>Do you want to save your checklist before closing?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative content="No" onClick={() => handleReject()} />
            <Button
              positive
              content="Yes"
              onClick={() => handleAccept(checkList, slug)}
            />
          </Modal.Actions>
        </Modal>
      </Segment>
    </div>
  );
};

export default MarkdownButtons;
