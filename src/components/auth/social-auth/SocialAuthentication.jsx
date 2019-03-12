import React from 'react';
import { Icon } from 'semantic-ui-react';
import style from './css/socialButton.module.css';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3030';

const SocialAuthentiation = () => (
  <div className={style.socialBlock}>
    <div>
      <a href={`${baseURL}/api/auth/google`}>
        <div className={[style.buttonBlock, style.googleButton].join(' ')}>
          <Icon name="google" size="large" className={style.iconColor} />
          {'Google'}
        </div>
      </a>
    </div>
    <div>
      <a href={`${baseURL}/api/auth/facebook`}>
        <div className={[style.buttonBlock, style.facebookButton].join(' ')}>
          <Icon name="facebook f" size="large" className={style.iconColor} />
          {'Facebook'}
        </div>
      </a>
    </div>
    <div>
      <a href={`${baseURL}/api/auth/github`}>
        <div className={[style.buttonBlock, style.githubButton].join(' ')}>
          <Icon name="github" size="large" className={style.iconColor} />
          {'Github'}
        </div>
      </a>
    </div>
  </div>
);

export default SocialAuthentiation;
