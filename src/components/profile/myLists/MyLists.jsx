import React from 'react';
import { Header, Container, Segment, Statistic } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { SuccessHandling, ErrorHandling, MessageContainer } from '../../toasters/MessagesHandling';
import http from '../../../api/http';
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

  render() {
    const { checklists } = this.state;
    return (
      <Container>
        <MessageContainer />
        <Header as="h1">
          <Header.Content>Your Lists</Header.Content>
        </Header>
        <Segment.Group horizontal>
          <Segment>
            <Statistic>
              <Statistic.Value>{checklists && checklists.length}</Statistic.Value>
              <Statistic.Label>Lists</Statistic.Label>
            </Statistic>
          </Segment>
          <Segment>
            <Statistic>
              <Statistic.Value>31,200</Statistic.Value>
              <Statistic.Label>Your favorite tags</Statistic.Label>
            </Statistic>
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
