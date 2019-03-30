import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import { Button, Modal } from 'semantic-ui-react';
import { updateSlug } from '../../../../api/checklist-api';
import { ErrorHandling, SuccessHandling } from '../../../toasters/MessagesHandling';
import successIcon from './success.svg';
import closeIcon from './close.svg';
import modalStyles from './CustomUrlModal.module.css';
import errorStyles from '../utils/css/Errors.module.css';

const url = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_FRONT_URL
  : 'localhost:3000';

const CustomUrlModal = (props) => {
  const [newSlug, setNewSlug] = useState('');

  const {
    isSubmitting,
    isValid,
    isOpen,
    slug,
    checklistId,
    setSlug,
    handleChange,
    handleBlur,
    query,
  } = props;

  let teamId;

  if (query) teamId = query.teamId;

  const onSlugChange = (e) => {
    setNewSlug(e.target.value);
  };

  const onUpdateSlugClick = () => {
    updateSlug(checklistId, newSlug)
      .then((res) => {
        setSlug(newSlug);
        SuccessHandling(res.data.message);
      })
      .catch((error) => {
        if (error.response) {
          return ErrorHandling(error.response.data.message);
        }

        return ErrorHandling('Server is down. Please try again later.');
      });
  };

  return (
    <Modal
      className={modalStyles.container}
      size="tiny"
      closeOnDimmerClick={false}
      closeOnEscape={false}
      open={isOpen}
      trigger={
        <Button primary fluid type="submit" disabled={isSubmitting || !isValid}>Submit</Button>
      }
    >
      <header className={modalStyles.header}>
        <p>Your checklist was successfully created!</p>
        <img src={successIcon} alt="success" />
      </header>

      <p className={modalStyles.link}>
        { teamId ? <Link to={`profile/myteam/${teamId}/${slug}`}>{`${url}/profile/myteam/${teamId}/${slug}`}</Link>
          : <Link to={`/${slug}`}>{`${url}/${slug}`}</Link> }
      </p>

      <div className={modalStyles.slug}>
        <p>You can customize your checklist url:</p>
        <div className={modalStyles.custom_link}>
          <div className={modalStyles.pseudo_link}>
            <span>{`${url}/`}</span>
          </div>
          <input
            className={isValid ? modalStyles.input_valid : modalStyles.input_invalid}
            type="text"
            name="custom_url"
            placeholder={slug}
            onChange={(e) => { handleChange(e); onSlugChange(e); }}
            onBlur={handleBlur}
            required
          />
          <button
            className={modalStyles.slug_button}
            type="button"
            onClick={onUpdateSlugClick}
            disabled={!isValid}
          >
          Update
          </button>
        </div>
        <p className={errorStyles.container}>
          <ErrorMessage name="custom_url" />
        </p>
      </div>
      { teamId
        ? (
          <Link className={modalStyles.close_link} to={`/profile/myteam/${teamId}/${slug}`}>
            <img src={closeIcon} alt="close modal" />
          </Link>
        )
        : (
          <Link className={modalStyles.close_link} to={`/${slug}`}>
            <img src={closeIcon} alt="close modal" />
          </Link>
        ) }
    </Modal>
  );
};

CustomUrlModal.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  checklistId: PropTypes.string.isRequired,
  setSlug: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default CustomUrlModal;
