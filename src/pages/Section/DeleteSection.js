import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { NotificationManager } from "react-notifications";
import { constants as ERROR_CONST } from "../../Constant/Error&Success";
import { DeleteSectionAPI } from "../../services/AuthService";

const DeleteSection = (props) => {
  let { sectionId, isOpen, GetAllSectionData, activePage } = props;

  const handleSubmit = () => {
    DeleteSectionAPI(sectionId)
      .then((res) => {
        NotificationManager.success(ERROR_CONST.SUCC_4, "", 1000);
        GetAllSectionData(activePage);
      })
      .catch((err) => {
        const errorMessage =
          err && err.response && err.response.data && err.response.data.error;
        if (errorMessage === "err_8") {
          NotificationManager.error(ERROR_CONST.ERROR_8, "", 1000);
        } else if (errorMessage === "err_9") {
          NotificationManager.error(ERROR_CONST.ERROR_9, "", 1000);
        } else {
          NotificationManager.error(ERROR_CONST.SOMETHING_WRONG, "", 1000);
        }
      });
    isOpen();
  };

  return (
    <SweetAlert
      title="Are you sure?"
      warning
      showCancel
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      onConfirm={handleSubmit}
      onCancel={isOpen}
    ></SweetAlert>
  );
};

export default DeleteSection;
