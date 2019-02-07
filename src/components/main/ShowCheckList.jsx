import React, { Component } from 'react';
import PropTypes from 'prop-types';
import checkListData from './simpleData';

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
    setTimeout(() => {
      const getId = parseInt(match.params.id, 10);
      const found = checkListData.find(checkListType => checkListType.id === getId);
      this.setState({
        checkList: found,
        loading: false,
      });
    }, 2000);
  }

  render() {
    const { checkList, loading } = this.state;
    if (loading) {
      return (
        <h1>Loading</h1>
      );
    } if (!checkList) {
      return (
        <div>Check list not found</div>
      );
    }
    return (
      <div>
        <h1>{`Here will be ${checkList.title} check list`}</h1>
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
