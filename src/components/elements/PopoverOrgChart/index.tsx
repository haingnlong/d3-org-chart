import { CloseOutlined, MenuOutlined, ToolOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import OrgChartModal from "../../../pages/OrgChart/OrgChartModal";
import { useDataOrgChart } from "../../../stores/orgChart.store";
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
      <OrgChartModal parentId={id} type="create" symbol={"add new"} />
      <OrgChartModal parentId={id} type="update" symbol={<ToolOutlined />} />
      <Button
        type="primary"
        icon={<CloseOutlined />}
        onClick={removeNode}
      ></Button>
    </div>
  );
};

export default PopoverOrgChart;
