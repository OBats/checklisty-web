import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import http from '../../api/http';

class Pagination extends Component {
  state = { getAll: null }

  componentDidMount() {
    http.get('/api/checklists/')
      .then((res) => {
        this.setState({
          getAll: res.data,
        });
      });
  }

  loadCorrectPage = () => {

  }

  render() {
    const { getAll } = this.state;
    const howManyPage = getAll === null ? '' : Math.ceil(getAll.length / 5);
    let counter = 0;
    return (
      <div>
        {getAll && getAll.map(function (currentList, index) {
          while (counter !== howManyPage) {
            counter += 1;
            return (
              <Link
                key={currentList.id}
                to={`/home/page=${index + 1}`}
                onClick={this.loadCorrectPage}
              >
                {counter}
              </Link>
            );
          } return false;
        })}
      </div>
    );
  }
}

export default Pagination;
