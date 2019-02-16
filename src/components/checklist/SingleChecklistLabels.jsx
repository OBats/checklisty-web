import React from 'react';
import { Grid, Label } from 'semantic-ui-react';
import style from './css/SingleChecklistItem.module.css';

const SingleChecklistLabels = (props) => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={1} />
                <Grid.Column width={6} className={style.labelStyleBottomPadding}>
                    {props.propsData.tags.map((elem, index) =>
                        <Label key={index.toString()} size="medium">
                            <span className={style.labelStyle}>
                                {elem}
                            </span>
                        </Label>
                    )
                    }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default SingleChecklistLabels;
