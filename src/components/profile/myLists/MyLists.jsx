import React from 'react';
import { Header, Container, Segment, Statistic, Loader, Search } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { SuccessHandling, ErrorHandling, MessageContainer } from '../../toasters/MessagesHandling';
import http from '../../../api/http';
import CreateChecklistModal from '../../create-checklist/checklist-modal';
import ListItem from './ListItem';

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userData,
      checklists: null,
      loading: true,
    };
  }

  componentDidMount() {
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

  countLists = lists => (lists.length > 1 ? 'lists' : ' list');

  render() {
    const { checklists, loading } = this.state;

    if (loading) {
      return (
        <Loader active inline="centered" size="large" content="Loading..." />
      );
    }
    return (
      <Container>
        <MessageContainer />
        <Header as="h1">
          <Header.Content>Your Lists</Header.Content>
        </Header>
        <Segment.Group horizontal>
          <Segment basic>
            <Statistic>
              <Statistic.Value>{checklists.length}</Statistic.Value>
              <Statistic.Label>{this.countLists(checklists)}</Statistic.Label>
            </Statistic>
          </Segment>
          <Segment basic style={{ margin: 'auto' }}>
            <Search placeholder="Search lists..." />
          </Segment>
          <Segment basic textAlign="right" style={{ margin: 'auto', border: 'none' }}>
            <CreateChecklistModal />
          </Segment>
        </Segment.Group>
        <Segment>
          <ListItem lists={checklists} del={this.deleteList} />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps)(MyList);
