import React from 'react';
import { Modal, Icon, Segment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import style from './CreateChecklistModal.module.css';

const FormSegment = () => (
  <Segment className={style.contentItem}>
    <Header size="small" icon>
      <Icon name="list" color="teal" />
      {'Create with form fields'}
    </Header>
    <p className={style.descriptionText}>
      {`This option is recommended for regular user.
        Here you can add some information using good
        known user-friendly form fields for quick checklists
        creation.`}
    </p>
  </Segment>
);

const MarkdownSegment = () => (
  <Segment className={style.contentItem}>
    <Header size="small" icon>
      <Icon name="code" color="blue" />
      {'Create with markdown'}
    </Header>
    <p className={style.descriptionText}>
      {`This option is recommended for advanced user.
        Here you can simply add markdown from your local file
        or put something down in the field on the next page.`}
    </p>
  </Segment>
);

const ContentForModal = (props) => {
  if (props.loggedUser) {
    return (
      <Modal.Content>
        <div className={style.contentBlock}>
          <div className={style.regularBlock}>
            <div className={style.bigScreenStyle}>
              <FormSegment />
            </div>
            <div className={style.smallScreenStyle}>
              <Link to="/create-checklist">
                <FormSegment />
              </Link>
            </div>
          </div>
          <div className={style.regularBlock}>
            <div className={style.bigScreenStyle}>
              <MarkdownSegment />
            </div>
            <div className={style.smallScreenStyle}>
              <Link to="/create-checklist/markdown">
                <MarkdownSegment />
              </Link>
            </div>
          </div>
        </div>
      </Modal.Content>
    );
  }
  return (
    <Modal.Content>
      <div className={style.unsignedModal}>
        <Header as="h1" icon>
          <Icon name="user secret" />
          {'We couldn\'t recognise you!'}
          <Header.Subheader>
            {'To create your own checklist you should sign in!'}
          </Header.Subheader>
          <Header.Subheader>
            {'Would you like to do it now? Just click the button you like!'}
          </Header.Subheader>
        </Header>
      </div>
    </Modal.Content>
  );
};

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

export default connect(mapStateToProps)(ContentForModal);
