import React from 'react';
import { Accordion, Grid } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

const SingleChecklistDetails = props => (
  <Accordion.Content active={props.accordionIndex === 0}>
    <Grid>
      <Grid.Column width={2} />
      <Grid.Column width={12}>
        <ReactMarkdown source={props.propsData.details} />
      </Grid.Column>
    </Grid>
  </Accordion.Content>
);

export default SingleChecklistDetails;
