import React from 'react';
import { Button, Segment, Grid, Icon, Divider, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import logo from './team.svg';
import CreateTeamBtn from './createTeam/CreateTeamBtn';


const NoTeam = ({ history }) => (
  <div className={styles.container}>
    <div>
      <img src={logo} alt="team-icon" />
    </div>
    <h1>It seems like you don`t have any teams</h1>
    <Segment placeholder className={styles.noTeamContainer}>
      <Grid columns={2} stackable textAlign="center">
        <Divider vertical>Or</Divider>
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Header icon>
              <Icon name="home" size="massive" />
              <p className={styles.goBackText}>Go back to Home Page</p>
            </Header>
            <Link to="/"><Button color="red">Go Back</Button></Link>
          </Grid.Column>

          <Grid.Column>
            <Header icon className={styles.teamCreate}>
              <img src={logo} alt="team-icon" className={styles.teamIcon} />
                    Create New Team
            </Header>
            <CreateTeamBtn history={history} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>
);

export default NoTeam;
