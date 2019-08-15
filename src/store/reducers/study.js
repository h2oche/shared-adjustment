import Firebase from "../fb";
import {projectStates} from "../event";

const fb = new Firebase();

export const endStudy = (_projectId) => {
  fb.DB.ref(`/projects/${_projectId}/state`).set(projectStates.complete);
}

export const submitStudy = (_projectId) => {
  fb.DB.ref(`/projects/${_projectId}/state`).set(projectStates.studyAccepting);
}

const TARGET_ACCEPTING_COUNT = 3;
const ACCEPT_STUDY = "study/ACCEPT_STUDY";
export const acceptStudy = async (_projectId, _uid) => {
  await fb.DB.ref(`/projects/${_projectId}/accepting/${_uid}`).set(true);
  let acceptSnapshot = await fb.DB.ref(`/projects/${_projectId}/accepting`).once('value');
  let count = Object.keys(acceptSnapshot.val()).length;
  if(count === TARGET_ACCEPTING_COUNT) {
    await fb.DB.ref(`/projects/${_projectId}/accepting`).remove();
    fb.DB.ref(`/projects/${_projectId}/state`).set(projectStates.complete);
  }
  else
    window.location.reload();
}

export const rejectStudy = async (_projectId) => {
  await fb.DB.ref(`/projects/${_projectId}/accepting`).remove();
  fb.DB.ref(`/projects/${_projectId}/state`).set(projectStates.study);
}