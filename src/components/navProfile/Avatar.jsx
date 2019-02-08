import React from 'react';
import AvatarEdit from 'react-avatar-edit';
import { Card, Image, Icon, Modal, Button } from 'semantic-ui-react';
import style from './Avatar.module.css';

class AvatarForProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: null,
      preview: null,
      modalOpen: false,
    };
  }

  openModal = () => this.setState({
    modalOpen: true,
  });

  handleAddPhoto = () => setTimeout(
    () => this.setState({
      modalOpen: false, avatarUrl: this.state.preview,
    }),
    1000,
  );

  close = () => this.setState({
    modalOpen: false,
  });

  onClose = () => this.setState({
    preview: null,
  });

  onCrop = preview => this.setState({
    preview,
  });

  handleUpload = () => this.setState({
    modalOpen: true,
  });

  render() {
    const { modalOpen } = this.state;
    return (
      <div>
        <div>
          <Modal
            trigger={(
              <span
                role="button"
                onClick={this.handleUpload}
                className={style.hvrRadialOut}
              >
                <Image
                  src={
                    this.state.avatarUrl
                    || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                  }
                  className={{
                  }}
                  size="medium"
                  circular
                />
              </span>
            )}
            size="mini"
            onClose={this.close}
            open={modalOpen}
          >
            <AvatarEdit
              class="avatar"
              width={360}
              height={295}
              onCrop={this.onCrop}
              onClose={this.onClose}
            />
            <Modal.Actions>
              <Button onClick={this.close} negative>
                Close
              </Button>
              <Button type="button" onClick={this.handleAddPhoto} positive>
                Add photo
              </Button>
            </Modal.Actions>
          </Modal>
        </div>

        <Card>
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Meta>
              <span className="date">Joined in 2015</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default AvatarForProfile;
