import produce from "immer";
import Firebase from "../fb";
import {projectStates} from "../event";

const CHECK_PRIVATE_RULE = "rules/CHECK_PRIVATE_RULE";
const SUBMIT_PRIVATE_RULE = "rules/SUBMIT_PRIVATE_RULE";
const NEW_RULES = "rules/NEW_RULES";
const NEW_RESELECT_RULES = "rules/NEW_RESELECT_RULES";

const TARGET_PRIVATE_RULE_COUNT = 4;
const TARGET_ACCEPTING_COUNT = 3;

const fb = new Firebase();

export const ruleConst = {
  communication: "communication",
  positiveVibe: "positiveVibe",
  mission: "mission",
  comprehension: "comprehension",
}

export const checkPrivateRule = (_ruleName) => {
  return {
    type: CHECK_PRIVATE_RULE,
    payload: _ruleName
  }
}

export const submitPrivateRule = () => {
  return async (dispatch, getState) => {
    const authUser = getState().meta.authUser;
    const user = getState().meta.user;
    const {privateRules} = getState().rules;

    await fb.DB.ref(`/projects/${user.projectId}/selectedRules/${authUser.uid}`).set(privateRules);
    await fb.DB.ref(`/users/${authUser.uid}/selectRule`).set(true);

    //project 상태 점검해서 4개 모두 제출되었으면 state 변경
    const ruleSnapshot = await fb.DB.ref(`/projects/${user.projectId}/selectedRules`).once('value');
    const count = Object.keys(ruleSnapshot.val()).length;
    if(count === TARGET_PRIVATE_RULE_COUNT)
      await fb.DB.ref(`/projects/${user.projectId}/state`).set(projectStates.rule);
    dispatch({type: SUBMIT_PRIVATE_RULE});
  };
}

export const newRules = (_newRules, _isReselect) => {
  if(!_isReselect)
    return { type: NEW_RULES, payload: _newRules}
  else return {type: NEW_RESELECT_RULES, payload: _newRules}
}

export const checkRule = (_projectId, _ruleName, _original, _isReselect) => {
  if(!_isReselect)
    fb.DB.ref(`/projects/${_projectId}/rules/${_ruleName}`).set(!_original);
  else
    fb.DB.ref(`/projects/${_projectId}/reselectRules/${_ruleName}`).set(!_original);
}

export const submitRule = (_projectId, _isReselect) => {
  if(!_isReselect)
    fb.DB.ref(`/projects/${_projectId}/state`).set(projectStates.ruleAccepting);
  else
    fb.DB.ref(`/projects/${_projectId}/state`).set(projectStates.ruleReselectAccepting);
};

export const acceptCurrentRule = async (_projectId, _uid, _isReselect) => {
  await fb.DB.ref(`/projects/${_projectId}/accepting/${_uid}`).set(true);
  const acceptSnapshot = await fb.DB.ref(`/projects/${_projectId}/accepting`).once('value');
  const count = Object.keys(acceptSnapshot.val()).length;

  if(count === TARGET_ACCEPTING_COUNT) {
    let timestamp = new Date().getTime();
    await fb.DB.ref(`/projects/${_projectId}/accepting`).remove();
    if(!_isReselect)
      await fb.DB.ref(`/projects/${_projectId}/startAt`).set(timestamp);
    else {
      let reselectSnapshot = await fb.DB.ref(`/projects/${_projectId}/reselectRules`).once('value');
      await fb.DB.ref(`/projects/${_projectId}/rules`).set(reselectSnapshot.val());
      await fb.DB.ref(`/projects/${_projectId}/reselectRules`).remove();
    }
    await fb.DB.ref(`/projects/${_projectId}/state`).set(projectStates.study);
  }
  else window.location.reload();
}

export const rejectCurrentRule = async (_projectId, _isReselect) => {
  console.log(_projectId);
  await fb.DB.ref(`/projects/${_projectId}/accepting`).remove();
  if(!_isReselect)
    fb.DB.ref(`/projects/${_projectId}/state`).set(projectStates.rule);
  else
    fb.DB.ref(`/projects/${_projectId}/state`).set(projectStates.ruleReselect);
}

const initialState = {
  privateSelected: false,
  privateRules: {
    communication: false,
    positiveVibe: false,
    mission: false,
    comprehension: false,
  },
  reselectRules: {
    communication: false,
    positiveVibe: false,
    mission: false,
    comprehension: false
  },
  communication: false,
  positiveVibe: false,
  mission: false,
  comprehension: false
}
 
export default function rules(state = initialState, action) {
  switch(action.type) {
    case CHECK_PRIVATE_RULE: {
      return produce(state, draft => {
        draft.privateRules[action.payload] = !draft.privateRules[action.payload];
      });
    }
    case SUBMIT_PRIVATE_RULE: {
      return produce(state, draft => {
        draft.privateSelected = true;
      });
    }
    case NEW_RULES: {
      return produce(state, draft => {
        for(let key in ruleConst)
          if(action.payload)
            draft[key] = action.payload[key];
      });
    }
    case NEW_RESELECT_RULES: {
      return produce(state, draft => {
        for(let key in ruleConst)
          if(action.payload)
            draft.reselectRules[key] = action.payload[key];
      });
    }
    default:
      return state;
  }
}