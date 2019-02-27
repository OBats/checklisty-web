import React from 'react';
import AvatarEdit from 'react-avatar-edit';
import { Image, Modal, Button } from 'semantic-ui-react';
import style from './Avatar.module.css';
import http from '../../../api/http';
import loaderStyle from '../../main/loader.module.css';
import { ErrorHandling, ErrorContainer } from '../../errors/ErrorsHandling';


const labelStyles = {
  fontSize: '1.25em',
  fontWeight: '700',
  color: 'green',
  fontFamily: 'sans-serif',
  width: '100%',
  display: 'block',
  cursor: 'pointer',
};

class AvatarForProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: null,
      preview: null,
      modalOpen: false,
      loading: true,
      err: false,
    };
  }

  async componentDidMount() {
    http.get('/api/profile/avatar').then((res) => {
      this.setState(() => ({
        avatarUrl: res.data,
        loading: false,
      }));
    });
  }

  handleAddPhoto = () => {
    http
      .post('/api/profile/avatar', {
        img: this.state.preview,
      })
      .then((res) => {
        this.setState({
          modalOpen: false,
          avatarUrl: res.data,
          loading: false,
          err: false,
        });
      }).catch((err) => {
        ErrorHandling('File is too big!');
        this.setState(() => ({
          modalOpen: false,
          err: true,
        }));
      });
  };

  close = () => this.setState({
    modalOpen: false,
  });

  onClose = () => this.setState({
    preview: null,
  });

  onCrop = preview => this.setState({
    preview,
  });

  openModal = () => this.setState({
    modalOpen: true,
  });

  handleUpload = () => this.setState({
    modalOpen: true,
  });

  render() {
    const { modalOpen, loading, err } = this.state;
    if (loading) {
      return (
        <div className={loaderStyle.loader}>Loading...</div>
      );
    }
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
              labelStyle={labelStyles}
              class="avatar"
              width="100%"
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
          <ErrorContainer />
        </div>
      </div>
    );
  }
}

export default AvatarForProfile;
