import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Modal, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styles from './createModal.module.css';
import SearchUser from './SearchUser';
import SelectedUsers from './SelectedUsers';
import { addSelectedUser } from '../../../actions/selectUserAction';


const CreateTeamBtn = (props) => {
  const { addSelectedUser } = props;
  const resetPreviousData = () => {
    addSelectedUser([]);
  };
  return (
    <Modal trigger={<Button color="green" onClick={resetPreviousData}>Create new team...</Button>}>
      <Modal.Header>Create your own team!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Formik>
            <Form className={styles.formContainer}>
              <div className={styles.nameContainer}>
                <label className={styles.nameLabel}>
                  <h2>Name</h2>
                  <Input className={styles.nameInput} />
                </label>
              </div>
              <div className={styles.searchUserContainer}>
                <SearchUser />
              </div>
              <SelectedUsers />
              <Button color="green" inverted>Create team...</Button>
            </Form>
          </Formik>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = ({ selectedUsers }) => (
  {
    arrayOfSelectedUsers: selectedUsers.arrayOfSelectedUsers,
  });

const mapDispatchToProps = dispatch => ({
  addSelectedUser: (arrayOfSelectedUsers) => {
    dispatch(addSelectedUser(arrayOfSelectedUsers));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeamBtn);
