import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDataOrgChart } from "../../../stores/orgChart.store";
import ModalOrgChart from "../ModalOrgChart";
import "./PopoverOrgChart.css";

type PropsContent = {
  id: string;
};

const PopoverOrgChart = ({ id }: PropsContent) => {
  const dataNode = useDataOrgChart((state) => state.dataNode);
  const getDataNode = useDataOrgChart((state) => state.getDataNode);
  const removeData = useDataOrgChart((state) => state.removeData);

  useEffect(() => {
    getDataNode(id);
  }, [id]);

  const removeNode = () => {
    removeData(id);
  };

  return (
    <div className="popover">
      <div>{dataNode.name}</div>
      <ModalOrgChart parentId={id} type="create" />
      <ModalOrgChart parentId={id} type="update" />
      <Button
        type="primary"
        icon={<CloseOutlined />}
        onClick={removeNode}
      ></Button>
    </div>
  );
};

export default PopoverOrgChart;
