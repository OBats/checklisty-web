import React from 'react';
import Link from 'react-router-dom/Link';
import styles from './index.module.css';
import logo from './team.svg';
import CreateTeamBtn from './createTeam/CreateTeamBtn';

const countMembers = (members) => {
  if (members <= 1) {
    return `${members} member`;
  }
  return `${members} members`;
};
const countChecklists = (checklists) => {
  if (checklists <= 1) {
    return `${checklists} checklist`;
  }
  return `${checklists} checklists`;
};

const ShowUserTeams = (props) => {
  const { teams, history } = props;
  return (
    <div className={styles.teamContainer}>
      {teams.map(currentTeam => (
        <Link
          key={currentTeam._id}
          className={styles.teamBlock}
          to={`/profile/myteam/${currentTeam._id}`}
        >
          <div className={styles.teamLogo}>
            <img src={logo} alt="team-logo" />
          </div>
          <div className={styles.teamInfo}>
            <div className={styles.mainTeamInfo}>
              <div className={styles.teamName}>
                {currentTeam.name}
              </div>
              <div className={styles.teamCreator}>
                {currentTeam.creator.username}
              </div>
            </div>
            <div className={styles.additionalInfo}>
              <div>
                {countMembers(currentTeam.members.length)}
              </div>
              <div className={styles.teamCreationDate}>
                {countChecklists(currentTeam.checklists.length)}
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div className={styles.createNewTeam}>
        <CreateTeamBtn history={history} />
      </div>
    </div>
  );
};

export default ShowUserTeams;
