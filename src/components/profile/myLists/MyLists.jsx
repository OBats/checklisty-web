import React from 'react';
import { Header, Container, Segment, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { SuccessHandling, ErrorHandling, MessageContainer } from '../../toasters/MessagesHandling';
import http from '../../../api/http';
import ListItem from './ListItem';
import ListStatistic from './ListsStatistic';
import NoLists from './NoLists';

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userData,
      checklists: [],
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
      http.get(`/api/checklists/author=${this.state.user._id}`)
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
          const checklists = this.state.checklists.filter(list => id !== list.id);
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

  render() {
    const { checklists, loading, filtered, searching, openModal } = this.state;

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
                lists={searching ? filtered : checklists}
                del={this.deleteList}
                open={openModal}
                update={this.update}
              />
            </Segment>
          </Container>
        ));
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps)(MyList);
