/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import checkListData from './simpleData';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAllCheckList: null,
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showAllCheckList: checkListData,
        loading: false,
      });
    }, 2000);
  }

  render() {
    const { showAllCheckList, loading } = this.state;
    if (loading) {
      return (
        <h1>Loading ...</h1>
      );
    }
    return (
      <div>
        <h1> CheckLists </h1>
        <div className="list-of-checklist">
          {showAllCheckList && showAllCheckList.map(currentCheckList => (
            <Link
              key={currentCheckList.id}
              to={`/home/${currentCheckList.id}`}
            >
              {currentCheckList.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default MainPage;
