import React from 'react';
import AvatarEdit from 'react-avatar-edit';
import { Image, Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import style from './Avatar.module.css';
import http from '../../../api/http';
import loaderStyle from '../../main/loader.module.css';
import { ErrorHandling } from '../../errors/ErrorsHandling';
import { saveUserData } from '../../../actions/user';

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
      avatarUrl: props.userData.image,
      preview: null,
      modalOpen: false,
      loading: false,
    };
  }

  handleAddPhoto = () => {
    http
      .post('/api/profile/avatar', {
        img: this.state.preview,
      })
      .then((res) => {
        this.setState({
          modalOpen: false,
          avatarUrl: res.data.image,
          loading: false,
        });
        this.props.saveUserData(res.data);
      }).catch((err) => {
        ErrorHandling('File have to be less than 70kb!');
        this.setState(() => ({
          modalOpen: false,
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
    const { modalOpen, loading } = this.state;
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
              label="Choose a photo..."
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: (data) => {
    dispatch(saveUserData(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarForProfile);
