import axios from "axios";
import { SET_GLOBAL_DATA } from "../actionTypes";
import { notification } from "antd";
import store from "../store";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function setGlobalData(content) {
  return {
    type: SET_GLOBAL_DATA,
    content,
  };
}
const AvailableRoles = ['IMO', 'CE','NVS-ADMIN'];
function getSingleRole(roles) {
  const matchingRole = AvailableRoles.find(role => roles.includes(role)) || '';
  return matchingRole;
}

export function updateUserInfo(obj, keycloak) {
  return (dispatch) => {
    dispatch(
      setGlobalData({
        emailId: obj.email,
        keycloak: keycloak,
        userId: obj.sub,
        userName: obj.name,
        userRoles: obj?.realm_access?.roles || [],
        userRole: getSingleRole(obj?.realm_access?.roles || [])
      })
    );
  };
}

export function updateGlobalData(obj) {
  return (dispatch) => {
    dispatch(setGlobalData(obj));
  };
}

