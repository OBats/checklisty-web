import React from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Popup } from 'semantic-ui-react';
import style from '../css/TeamChecklistBlock.module.css';
import PopupContent from './LogPopup';
import timeChecker from './functions';

const Log = ({ messages, userData }) => {
  const isMyMessage = (username) => {
    if (username === userData.username) return true;
    return false;
  };

  if (!messages.length) {
    return (
      <Segment className={style.emptyMessage}>
        <Header as="h2" icon textAlign="center">
          <Icon name="pencil" />
          <Header.Content>
            {'Log seems to be empty!'}
            <Header.Subheader>
              All activity of your team with this checklist will appear here!
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
    );
  }
  return (
    <Segment className={style.logsegment}>
      {messages.map((elem, index) => (
        <div
          key={index.toString()}
          className={!isMyMessage(elem.userData.username)
            ? style.wholeMessage : style.wholeMessageAlternative}
        >
          {!isMyMessage(elem.userData.username) ? (
            <Popup
              trigger={(
                <div className={style.photo}>
                  <img src={elem.userData.image} alt="user" className={style.userPhoto} />
                </div>
              )}
              content={<PopupContent user={elem.userData} />}
            />
          ) : null
          }
          <div className={!isMyMessage(elem.userData.username)
            ? style.logItem : style.logItemAlternative}
          >
            <div>
              <span className={style.usernameLog}>
                {!isMyMessage(elem.userData.username) ? (elem.userData.username) : 'You'}
              </span>
            </div>
            <div className={style.textInfo}>
              {elem.itemValue
                ? <Icon name="check circle" color="green" />
                : <Icon name="minus circle" color="red" />
              }
              {'Setted '}
              <span className={style.valueLog}>
                {elem.itemValue ? '\'Done\'' : '\'Not done\''}
              </span>
              {elem.forSection ? (
                <span>
                  {' for whole section '}
                  <span className={style.titleLog}>
                    {`#${elem.checklistData.sectionIndex + 1} ${elem.sectionTitle}`}
                  </span>
                </span>
              ) : (
                <span>
                  {' on checklist '}
                  <span className={style.titleLog}>
                    {`#${elem.checklistData.elementIndex + 1} ${elem.title}`}
                  </span>
                  {' in section '}
                  <span className={style.titleLog}>
                    {`#${elem.checklistData.sectionIndex + 1} ${elem.sectionTitle}`}
                  </span>
                </span>
              )}

            </div>
            <div className={style.dateBlockStyle}>
              <span className={!isMyMessage(elem.username)
                ? style.dateStyle : style.dateStyleAlternative}
              >
                {timeChecker(elem.date)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </Segment>
  );
};

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps)(Log);
