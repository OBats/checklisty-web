import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import style from './socialButton.module.css';

const SignInWithSocials = () => (
  <Grid columns={3}>
    <Grid.Column>
      <a href="http://localhost:3030/api/auth/google">
        <div className={[style.buttonBlock, style.googleButton].join(' ')}>
          <Icon name="google" size="large" className={style.iconColor} />
              Google
        </div>
      </a>
    </Grid.Column>
    <Grid.Column>
      <a href="http://localhost:3030/api/auth/facebook">
        <div className={[style.buttonBlock, style.facebookButton].join(' ')}>
          <Icon name="facebook f" size="large" className={style.iconColor} />
          <div>Facebook</div>
        </div>
      </a>
    </Grid.Column>
    <Grid.Column>
      <a href="http://localhost:3030/api/auth/github">
        <div className={[style.buttonBlock, style.githubButton].join(' ')}>
          <Icon name="github" size="large" className={style.iconColor} />
              Github
        </div>
      </a>
    </Grid.Column>
  </Grid>
);

export default SignInWithSocials;
