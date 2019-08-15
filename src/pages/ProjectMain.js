import React, { Component } from 'react';
import {Typography, Container, Grid, CssBaseline, Paper, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles"
import ProjectMainStyle from "../styles/ProjectMain";
import {readMain, readNormalMain} from "../store/reducers/meta";
import {connect} from "react-redux";
import ProjectDetails from "../components/ProjectDetails";
import StepperComponent from "../components/Stepper";

import "../styles/ProjectMain.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export class ProjectMain extends Component {
  onNextPageBtnClick = () => {
    const {isNormalProject} = this.props;

    if(!isNormalProject) this.props.readMain();
    else this.props.readNormalMain();
  }

  render() {
    const {classes, project} = this.props;
    const {type} = this.props.project;

    return (
      <Container fixed>
        <CssBaseline/>
        <Grid container className={classes.projectMainContainer}>
          <StepperComponent isIntro={true} projectType={type}/>
          <Grid item xs={12}>
            <Paper className={classes.instrWrapper}>
              <Typography component="h4">
                이제부터 같은 팀에 배정된 4명의 팀원과 협력하여 문제를 해결하는 과제가 진행됩니다.
              </Typography>
              <Typography component="h4">
                아래에 제시된 문제와 관련 자료를 충분히 읽고, 다음 페이지로 이동해 주시기 바랍니다. 
              </Typography>
            </Paper>
          </Grid>
          
          <ProjectDetails/>

          <Grid item xs={12} className={classes.toolbarContainer}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onNextPageBtnClick}>
              다음페이지
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({project: state.meta.project});
const mapDispatchToProps = (dispatch) => ({
  readMain: () => dispatch(readMain()),
  readNormalMain: () => dispatch(readNormalMain())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(ProjectMainStyle)(ProjectMain));
