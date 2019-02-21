import React from 'react';
import { Accordion, Container, Grid, Progress, Button, Header, Icon } from 'semantic-ui-react';
import SingleChecklistItem from './SingleChecklistItem';
import style from './css/ChecklistView.module.css';

const ChecklistViewComponents = props => (
  <Container>
    <div className={props.styleSectionDivider}>
      <Grid container>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={6}>
            <Header size="large">{props.data.section_title}</Header>
          </Grid.Column>
          <Grid.Column width={4}>
            <Progress percent={props.currentProgress} indicating size="medium">
              {`Current progress: ${props.currentProgress}%`}
            </Progress>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={1} className={style.toRightAlign}>
            <Button size="medium" icon color="teal" onClick={props.handleSetAllCheckboxes}>
              <Icon name="check" />
            </Button>
          </Grid.Column>
          <Grid.Column width={1} className={style.toLeftAlign}>
            <Button size="medium" icon color="red" onClick={props.handleResetAllCheckboxes}>
              <Icon name="expand" />
            </Button>
          </Grid.Column>
          <Grid.Column width={1} className={style.toRightAlign}>
            <Button size="medium" icon color="teal" onClick={props.handleOpenAllAccordions}>
              <Icon name="angle double down" />
            </Button>
          </Grid.Column>
          <Grid.Column width={1} className={style.toLeftAlign}>
            <Button size="medium" icon color="red" onClick={props.handleCloseAllAccordions}>
              <Icon name="angle double up" />
            </Button>
          </Grid.Column>
          <Grid.Column width={1}>
            <Button size="medium" icon color={props.isWholeChecklistHidden ? 'red' : 'grey'} onClick={props.handleClickEyeButton}>
              <Icon name={props.isWholeChecklistHidden ? 'eye' : 'eye slash'} />
            </Button>
          </Grid.Column>
        </Grid.Row>
        {!props.isWholeChecklistHidden && (
          <Grid.Row>
            <Accordion className={style.accordionStyle} fluid>
              {
                props.data.items_data.map((elem, index) => (
                  <SingleChecklistItem
                    key={index.toString()}
                    propsData={elem}
                    index={index}
                    handleClickAccordion={props.handleClickAccordion}
                    accordionIndex={props.accordionIndexArray[index]}
                    handleChecked={props.handleChecked}
                    checkedIndex={props.checkboxArray[index]}
                    iconName={props.iconNameArray[index]}
                    className={style.checklistItem}
                  />
                ))}
            </Accordion>
          </Grid.Row>
        )}
      </Grid>
    </div>
  </Container>
);

export default ChecklistViewComponents;
