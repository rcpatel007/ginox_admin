import api from "../api/api";
import { constants as API_CONST } from "../api/url";

export const AuthLogin = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .post(API_CONST.LOGIN, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const AddSectionAPI = (payData) => {
  return new Promise((resolve, reject) => {
    return api
      .postWithToken(API_CONST.ADD_SECTION, payData)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const GetAllSections = (pagination) => {
  return new Promise((resolve, reject) => {
    return api
      .getWithToken(API_CONST.ADD_SECTION + pagination)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const DeleteSectionAPI = (section_id) => {
  return new Promise((resolve, reject) => {
    return api
      .deleteWithToken(API_CONST.ADD_SECTION + `?home_section_id=${section_id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const EditSectionAPI = (section_id, payData) => {
  return new Promise((resolve, reject) => {
    return api
      .putWithToken(
        API_CONST.ADD_SECTION + `?home_section_id=${section_id}`,
        payData
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
