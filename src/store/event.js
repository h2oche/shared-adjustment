import Firebase from "./fb";
import {authChange, projectStateChange, projectSeleteRuleChange, projectStartAtChange} from "./reducers/meta";
import {newChat} from "./reducers/chat";
import {newRules} from "./reducers/rules";
import {newMonitors} from "./reducers/monitor";

const fb = new Firebase();

export const FB_ON_AUTH_STATE_CHANGE = "firebase/ON_AUTH_STATE_CHANGE";
export const FB_ON_PROJECT_STATE_CHANGE = "firebase/ON_PROJECT_STATE_CHANGE";
export const FB_ON_NEW_CHAT = "firebase/ON_NEW_CHAT";
export const FB_ON_RULES_CHECK = "firebase/ON_RULES_CHECK";
export const FB_ON_RESELECT_RULES_CHECK = "firebase/ON_RESELECT_RULES_CHECK";
export const FB_ON_MONITOR_STATE_CHANGE = "firebase/ON_MONITOR_STATE_CHANGE";
export const FB_ON_SELECT_RULE_CHANGE = "firebase/FB_ON_SELECT_RULE_CHANGE";
export const FB_ON_PROJECT_START_CHANGE = "firebase/FB_ON_PROJECT_START_CHANGE";
const TARGET_THRESHOLD = 3;

export const projectStates = {
  rulePending: "rule-pending",
  rule: "rule",
  ruleAccepting: "rule-accepting",
  study: "study",
  studyAccepting: "study-accepting",
  ruleReselect: "rule-reselect",
  ruleReselectAccepting: "rule-reselect-accepting",
  complete: "complete"
}

const ruleNames = ["communication", "positiveVibe", "comprehension", "mission"];

const eventListnerMapper = {
  [FB_ON_PROJECT_START_CHANGE]: (dispatch, etc) => {
    const {projectId} = etc;

    console.log(`listen ${FB_ON_PROJECT_START_CHANGE} event...`, projectId);

    fb.DB.ref(`/projects/${projectId}/startAt`).on('value', _snapshot => {
      const newStartAt = _snapshot.val();
      console.log(newStartAt);
      dispatch(projectStartAtChange(newStartAt));
    });
  },
  [FB_ON_SELECT_RULE_CHANGE]: (dispatch, etc) => {
    const {projectId} = etc;

    console.log(`listen ${FB_ON_SELECT_RULE_CHANGE} event...`, projectId);

    fb.DB.ref(`/projects/${projectId}/selectedRules`).on('value', _snapshot => {
      const newSelectedRules = _snapshot.val();
      dispatch(projectSeleteRuleChange(newSelectedRules));
    });
  },
  [FB_ON_AUTH_STATE_CHANGE]: (dispatch, etc) => {
    console.log(`listen ${FB_ON_AUTH_STATE_CHANGE} event...`);
    fb.auth.onAuthStateChanged(_authUser => {
      console.log(_authUser);
      dispatch(authChange(_authUser));
    });
  },
  [FB_ON_PROJECT_STATE_CHANGE]: (dispatch, etc) => {
    const {projectId} = etc;

    console.log(`listen ${FB_ON_PROJECT_STATE_CHANGE} event...`, projectId);

    fb.DB.ref(`/projects/${projectId}/state`).on('value', _snapshot => {
      const newProjectState = _snapshot.val();
      dispatch(projectStateChange(newProjectState));
    });
  },
  [FB_ON_NEW_CHAT]: (dispatch, etc) => {
    console.log(`listen ${FB_ON_NEW_CHAT} event...`);

    const {projectId} = etc;
    fb.DB.ref(`/chats/${projectId}`).on('value', _snapshot => {
      const fbChats = _snapshot.val();
      const chats = [];
      
      for(var id in fbChats) {
        fbChats[id].id = id;
        chats.push(fbChats[id]);
      }

      dispatch(newChat(chats));
    });
  },
  [FB_ON_RULES_CHECK]: (dispatch, etc) => {
    console.log(`listen ${FB_ON_RULES_CHECK} event...`);
    const {projectId} = etc;
    fb.DB.ref(`/projects/${projectId}/rules`).on('value', _snapshot => {
      const fbRules = _snapshot.val();
      dispatch(newRules(fbRules));
    });
  },
  [FB_ON_RESELECT_RULES_CHECK]: (dispatch, etc) => {
    console.log(`listen ${FB_ON_RESELECT_RULES_CHECK} event...`);
    const {projectId} = etc;
    fb.DB.ref(`/projects/${projectId}/reselectRules`).on('value', _snapshot => {
      const fbRules = _snapshot.val();
      dispatch(newRules(fbRules, true));
    });
  },
  [FB_ON_MONITOR_STATE_CHANGE]: (dispatch, etc) => {
    console.log(`listen ${FB_ON_MONITOR_STATE_CHANGE} event...`);
    const {projectId} = etc;
    fb.DB.ref(`/monitors/${projectId}`).on('value', async (_snapshot) => {
      const fbMonitor = _snapshot.val();
      console.log(fbMonitor);

      //TODO : reselect 가 3이상이 되면, reselect page로 넘어가야 함
      if(fbMonitor && fbMonitor.reselect && Object.keys(fbMonitor.reselect).length >= TARGET_THRESHOLD) {
        /*TODO:
        1. 이전 rule은 log 에 저장
        2. 이전 monitor value 삭제
        3. project state 변경(reselect)
        */
        const ruleSnapshot = await fb.DB.ref(`/projects/${projectId}/rules`).once('value');
        await fb.DB.ref(`/monitors/${projectId}`).remove();
        await fb.DB.ref(`/ruleLog/${projectId}`).push({
          timestamp: new Date().getTime(),
          ruleName: "rules",
          value: ruleSnapshot.val()
        });
        fb.DB.ref(`/projects/${projectId}/state`).set(projectStates.ruleReselect);
      }
      
      ruleNames.forEach(ruleName => {
        if(fbMonitor && fbMonitor[ruleName] && Object.keys(fbMonitor[ruleName]).length >= TARGET_THRESHOLD)
          fbMonitor.alertRuleName = ruleName;
      });

      dispatch(newMonitors(fbMonitor));
    });
  }
}

export default function listen(events, dispatch, etc) {
  events.forEach(_event => {
    eventListnerMapper[_event](dispatch, etc);  
  });
}