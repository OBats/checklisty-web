/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Header, Container, Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { SuccessHandling, ErrorHandling, MessageContainer } from '../../toasters/MessagesHandling';
import http from '../../../api/http';
import ListItem from './ListItem';
import ListStatistic from './ListsStatistic';
import NoLists from './NoLists';
import Pagination from './PaginationPage';

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userData,
      checklists: [],
      currentChecklists: [],
      currentChecklistId: null,
      filtered: [],
      loading: true,
      searching: false,
      openModal: false,
    };
  }

  componentWillMount() {
    this.getLists();
  }

  getLists = () => {
    try {
      const { user } = this.state;
      http.get(`/api/checklists/author=${user._id}`)
        .then((res) => {
          this.setState({ loading: false, checklists: res.data });
        });
    } catch {
      ErrorHandling('Somethin go wrong!');
    }
  };

  deleteList = (id) => {
    try {
      http.delete(`/api/checklists/${id}`)
        .then((res) => {
          let { checklists } = this.state;
          checklists = checklists.filter(list => id !== list.id);
          this.setState({ checklists });
          SuccessHandling(res.data.message);
        });
    } catch {
      ErrorHandling('Somethin go wrong!');
    }
  };

  update = (config) => {
    this.setState(config);
  };

  onPageChanged = (data) => {
    const { checklists } = this.state;
    const { currentPage, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentChecklists = checklists.slice(offset, offset + pageLimit);

    this.setState({ currentChecklists });
  };

  render() {
    const {
      checklists, loading, filtered, searching, currentChecklistId,
      openModal, currentChecklists,
    } = this.state;

    const totalChecklists = checklists.length;

    if (totalChecklists === null) return null;

    if (loading) {
      return (
        <Loader active inline="centered" size="large" content="Loading..." />
      );
    }
    return (
      !checklists.length
        ? (
          <NoLists />
        )
        : (
          <Container>
            <MessageContainer />
            <Header as="h1">
              <Header.Content>Your Lists</Header.Content>
            </Header>
            <ListStatistic update={this.update} lists={checklists} />
            <Segment>
              <ListItem
                lists={searching ? filtered : currentChecklists}
                id={currentChecklistId}
                del={this.deleteList}
                open={openModal}
                update={this.update}
              />
            </Segment>
            <Segment.Inline style={{ textAlign: 'center' }}>
              <Pagination
                totalRecords={totalChecklists}
                pageLimit={5}
                onPageChanged={this.onPageChanged}
              />
            </Segment.Inline>
          </Container>
        ));
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps)(MyList);
