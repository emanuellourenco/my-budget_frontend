import React from "react";
import { Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function ActionButtons(props) {
  const { t } = useTranslation();
  const { record, handleChangeModal, removeData } = props;

  return (
    <div className="action-buttons">
      <Tooltip title={t("Edit")}>
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => handleChangeModal(record.key)}
        />
      </Tooltip>
      <Tooltip title={t("Delete")}>
        <Button
          type="danger"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => removeData(record.key)}
        />
      </Tooltip>
    </div>
  );
}

ActionButtons.defaultProps = {
  record: {},
  handleChangeModal: () => {},
  removeData: () => {},
};

ActionButtons.propTypes = {
  record: PropTypes.object,
  handleChangeModal: PropTypes.func,
  removeData: PropTypes.func,
};

export default ActionButtons;
