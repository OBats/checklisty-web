import React, { Component } from 'react';
import http from '../../../api/http';
import loaderStyle from '../loader.module.css';
import Header from '../Header';
import styles from './ShowCheckList.module.css';
import Footer from '../Footer';
import ChecklistTeamBlock from '../../checklist/team-checklist/ChecklistTeamBlock';

class ShowTeamChecklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkList: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const slug = match.params.id;

    http.get(`/api/checklists/${slug}`)
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
        <Header title={checkList.title} />
        <div className={styles.checkListContainer}>
          <ChecklistTeamBlock checkListData={checkList} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default ShowTeamChecklist;
