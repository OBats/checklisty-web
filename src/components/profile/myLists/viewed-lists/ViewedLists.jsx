import React from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import http from '../../../../api/http';
import ViewedListsHeader from './ViewedListsHeader';
import ViewedListsItems from './ViewedListsItems';
import { saveHistoryLoader } from '../../../../actions/historyPagination';
import NoViewedLists from './NoViewedLists';
import loaderStyle from '../../../main/loader.module.css';
import style from '../css/viewedLists.module.css';

class ViewedLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checklistData: null,
      loading: true,
      checkboxData: null,
      confirmOpened: false,
      activePage: 1,
      perPage: 10,
      totalPages: null,
      amountOfLists: null,
    };
  }

  async componentDidMount() {
    this.getData();
  }

  getData = async (activePage = 1, perPage = 10) => {
    const { userData, saveHistoryLoader } = this.props;

    const url = `api/checklists/get-viewed-checklists/userid=${userData._id}/page=${activePage}/perpage=${perPage}`;
    const response = await http.get(url);

    const { checklist, progress, totalPages } = response.data;

    saveHistoryLoader(false);
    this.setState({
      activePage,
      checklistData: checklist,
      checkboxData: progress,
      loading: false,
      totalPages: Math.ceil((totalPages) / perPage),
      amountOfLists: totalPages,
    });
  }

  openConfirm = () => { this.setState({ confirmOpened: true }); };

  closeConfirm = () => { this.setState({ confirmOpened: false }); };

  handlePaginationChange = activePage => (this.getData(activePage, this.state.perPage));

  handleSelectChange = perPage => (this.getData(this.state.activePage, perPage));

  render() {
    const {
      loading,
      confirmOpened,
      checklistData,
      checkboxData,
      activePage,
      totalPages,
      amountOfLists,
    } = this.state;
    if (loading) {
      return (
        <div className={style.loaderBlock}>
          <div className={loaderStyle.loader}>Loading...</div>
        </div>
      );
    }
    if (checklistData.length) {
      return (
        <Container>
          <ViewedListsHeader
            amountOfLists={amountOfLists}
            getData={this.getData}
            confirmOpened={confirmOpened}
            closeConfirm={this.closeConfirm}
            openConfirm={this.openConfirm}
          />
          <ViewedListsItems
            checklist={checklistData}
            checkboxData={checkboxData}
            activePage={activePage}
            totalPages={totalPages}
            handlePaginationChange={this.handlePaginationChange}
            handleSelectChange={this.handleSelectChange}
          />
        </Container>
      );
    }
    return <NoViewedLists />;
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});
const mapDispatchToProps = dispatch => ({
  saveHistoryLoader: (loaderValue) => {
    dispatch(saveHistoryLoader(loaderValue));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewedLists);
