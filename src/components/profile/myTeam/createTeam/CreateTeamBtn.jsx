import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Modal, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import http from '../../../../api/http';
import styles from './createModal.module.css';
import SearchUser from './SearchUser';
import SelectedUsers from './SelectedUsers';
import { addSelectedUser } from '../../../../actions/selectUserAction';
import customNameSchema from './validationSchema';


const CreateTeamBtn = (props) => {
  const { addSelectedUser, arrayOfSelectedUsers, history } = props;

  const createTeam = async (values) => {
    const { data } = await http.post('/api/team', values);
    history.push(`/${data.team._id}`);
  };

  const resetPreviousData = () => {
    addSelectedUser([]);
  };
  return (
    <Modal trigger={<Button color="green" onClick={resetPreviousData}>Create new team...</Button>} closeIcon>
      <Modal.Header className={styles.modalHeader}>Create your own team!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Formik
            className={styles.formContainer}
            validationSchema={customNameSchema}
            initialValues={{
              name: '', requested: arrayOfSelectedUsers,
            }}
            onSubmit={(values) => {
              values.requested = arrayOfSelectedUsers.map(currentUser => currentUser._id);
              createTeam(values);
            }}
          >
            {(
              {
                values,
                handleSubmit,
                handleChange,
                touched,
                errors,
                handleBlur,
                isValid,
                isSubmitting,
              },
            ) => (
              <Form onSubmit={handleSubmit}>
                <div className={styles.nameContainer}>
                  <label className={styles.nameLabel}>
                    <h2>Name</h2>
                    <Input
                      className={touched.name && errors.name
                        ? styles.errorInput : styles.nameInput}
                      required
                      placeholder="Enter a team name..."
                      name="name"
                      onChange={handleChange}
                      value={values.teamName}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <div className={styles.validError}>
                        {touched.name && errors.name}
                      </div>
                    )}
                  </label>
                </div>
                <div className={styles.searchUserContainer}>
                  <SearchUser />
                </div>
                <SelectedUsers value={values.arrayOfSelectedUsers} />
                <div className={styles.buttonContainer}>
                  <Button
                    color="green"
                    inverted
                    disabled={isSubmitting || !isValid}
                  >
Create team...
                  </Button>
                </div>
              </Form>
            )}

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
