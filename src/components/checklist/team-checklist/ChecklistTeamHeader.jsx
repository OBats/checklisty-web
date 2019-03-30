import React from 'react';
import Log from './Log';
import styles from '../css/TeamChecklistBlock.module.css';
import Buttons from './Buttons';

class ChecklistTeamHeader extends React.Component {
    state = { isOpened: false }

    onLogButton = () => {
      this.setState({ isOpened: !this.state.isOpened });
    }

    render() {
      return (
        <div className={styles.container}>
          <Buttons onLogButton={this.onLogButton} />
          <div>
            {this.state.isOpened && <Log messages={this.props.messages} />}
          </div>
        </div>
      );
    }
}

export default ChecklistTeamHeader;
