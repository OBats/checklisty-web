import React from 'react';
import { Header, Container, Segment, Statistic } from 'semantic-ui-react';
import { connect } from 'react-redux';
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
    http.get(`/api/checklists/author=${this.state.user._id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ loading: false, checklists: res.data });
      });
  };

  render() {
    const { checklists } = this.state;
    return (
      <Container>
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
          <ListItem lists={checklists} />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps)(MyList);
