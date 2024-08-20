import { SET_GLOBAL_DATA } from '../actionTypes';

const INITIAL_STATE = {
  userId: 0,
  userName: '',
  userRoles: [],
  userRole:'',
  selectedRole:'',
  preferredUserName: '',
  emailId: '',
  keycloak: {},
  collapsed: false,
  locale: 'en',
  languageList: [],
  googleKey: '',
  topbarTitle: '',
  processQuestions: [],
  roiQuestions: [],
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_GLOBAL_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
