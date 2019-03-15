import React, { Component } from 'react';
import { Button, Segment, Divider, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import style from '../css/Message.module.css';

class PortalExampleControlled extends Component {
  state = {
    isOpened: true,
    show: false,
  }

  closeMessage = () => {
    this.setState({ isOpened: false });
  }

  render() {
    const { property } = this.props;
    const { isOpened } = this.state;
    if (property && isOpened) {
      return (
        <Segment
          color="yellow"
          raised
          className={style.messageSegment}
        >
          <div className={style.headerRow}>
            <h3 className={style.header}>Warning!</h3>
            <button type="button" onClick={this.closeMessage} className={style.closeButton}>
              <Icon name="close" size="large" fitted />
            </button>
          </div>
          <Divider />
          {'Pay attention that your progress won\'t be saved, because you are not signed in!'}
          <div className={style.signinButton}>
            <Link to="/auth/signin">
              <Button primary>
                {'Sign In now!'}
              </Button>
            </Link>
          </div>
        </Segment>
      );
    }
    return null;
  }
}

export default PortalExampleControlled;
