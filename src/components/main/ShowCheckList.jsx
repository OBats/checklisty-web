import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChecklistView from '../checklist/ChecklistView';
import http from '../../api/http';
import loaderStyle from './loader.module.css';

class ShowCheckList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkList: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const getId = match.params.id;

    http.get(`/api/checklists/${getId}`)
      .then((res) => {
        this.setState({
          checkList: res.data,
          loading: false,
        });
      });
  }

  render() {
    const { loading, checkList } = this.state;
    if (loading) {
      return (
        <div className={loaderStyle.loader}>Loading...</div>
      );
    } if (!checkList) {
      return (
        <div>Check list not found</div>
      );
    }
    return (
      <div>
        <h1>{`Here will be ${checkList.title} check list`}</h1>
        <ChecklistView checkListData={checkList} />
      </div>
    );
  }
}

ShowCheckList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ShowCheckList;
