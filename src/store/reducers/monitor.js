import produce from "immer";
import Firebase from "../fb";

const NEW_MONITORS = "monitor/NEW_MONITORS";
const TOGGLE_MONITOR = "monitor/TOGGLE_MONITOR";

const TARGET_MONITOR_COUNT = 3;

const initialState = {
  communication: null,
  positiveVibe: null,
  mission: null,
  comprehension: null,
  reselect: null,
  alertRuleName: null,
}

const fb = new Firebase();

export const newMonitors = (_monitors) => {
  return {
    type: NEW_MONITORS,
    payload: _monitors
  }
}

export const toggleMonitor = (_ruleName, _uid, _projectId) => {
  return async (dispatch, getState) => {
    const monitorObj = getState().monitor[_ruleName];
    const targetRef = fb.DB.ref(`/monitors/${_projectId}/${_ruleName}/${_uid}`);
    const oldValue = !!(monitorObj && monitorObj[_uid]);

    fb.DB.ref(`/ruleLog/${_projectId}`).push({
      timestamp: new Date().getTime(),
      uid: _uid,
      value: oldValue,
      ruleName: _ruleName
    });

    if(monitorObj && monitorObj[_uid])
      targetRef.remove();
    else
      targetRef.set(true);
  }
}

export const clearMonitor = (_ruleName, _projectId) => {
  fb.DB.ref(`/monitors/${_projectId}/${_ruleName}`).remove();
}

export default function monitor(state = initialState, action) {
  switch(action.type) {
    case NEW_MONITORS: {
      return produce(state, draft => {
        for(let ruleName in state)
          draft[ruleName] = action.payload ? action.payload[ruleName] : null;
      });
    }
    default:
      return state;
  }
}