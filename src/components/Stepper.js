import React, { Component } from 'react';
import {Stepper, Step, StepLabel} from "@material-ui/core";
import {projectStates} from "../store/event";
import {withStyles} from "@material-ui/core/styles";

export class StepperComponent extends Component {
  steps = ["프로젝트 소개", "점검요소 선정", "본학습", "학습완료"]
  reselectSteps = ["프로젝트 소개", "점검요소 재선정", "본학습", "학습완료"]
  normalSteps = ["프로젝트 소개", "본학습", "학습완료"]

  render() {
    const {projectType, ruleReselect, projectState, isIntro} = this.props;
    let activeStep = 0;
    let selectedSteps = this.steps;

    /* select step array */
    if(ruleReselect) selectedSteps = this.reselectSteps;
    else if(projectType === "normal") selectedSteps = this.normalSteps;
    
    /* get active step */
    if(!isIntro) {
      if(projectState === projectStates.study)
        activeStep = projectType === "normal" ? 1 : 2;
      else
        activeStep = 1;
    }

    return (
      <Stepper
        activeStep={activeStep}
        style={{width:"100%", marginBottom: "10px"}}>
        {selectedSteps.map((label, index) => {
          return (
            <Step key={label} >
              <StepLabel>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    )
  }
}

export default StepperComponent
