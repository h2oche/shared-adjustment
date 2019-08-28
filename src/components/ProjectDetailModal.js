import React, { Component } from 'react';
import {Button, Modal} from "@material-ui/core";
import ProjectDetails from "./ProjectDetails";

export class ProjectDetailModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.toggleOpen}
        style={{overflow:"scroll"}}>
        <div style={{padding: "30px"}}>
          <ProjectDetails/>
          <Button
            onClick={this.props.toggleOpen}
            type="submit"
            variant="contained"
            color="default"
            fullWidth
            style={{marginTop: "15px"}}>
            나가기
          </Button>
        </div>
      </Modal>
    )
  }
}

export default ProjectDetailModal
