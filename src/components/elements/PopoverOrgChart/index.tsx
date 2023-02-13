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

  useEffect(() => {
    getDataNode(id);
  }, [id]);

  return (
    <div className="popover">
      <div>{dataNode.name}</div>
      <ModalOrgChart parentId={id} type="create" />
      <ModalOrgChart parentId={id} type="fix" />
    </div>
  );
};

export default PopoverOrgChart;
