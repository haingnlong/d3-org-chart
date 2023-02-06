import { OrgChart } from "d3-org-chart";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DataChart } from "../../../types/Chart.type";
import ReactDOMServer from "react-dom/server";
import ContentOrgChart from "../ContentOrgChart";
import { Button, Modal } from "antd";
import ModalOrgChart from "../ModalOrgChart";
import { useDataOrgChart } from "../../../stores/orgChart.store";
import { usePopper } from "react-popper";

type Props = {
  setClick: (callback: unknown) => void;
  onNodeClick: (d: string) => void;
};

export const OrgChartComponent = ({ onNodeClick, setClick }: Props) => {
  const data = useDataOrgChart((state) => state.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idNode, setIdNode] = useState("");
  const [currentNode] = data.filter((item) => item.id === idNode);
  console.log("currentNode", currentNode);
  const d3Container = useRef(null);
  let chart: OrgChart<DataChart>;

  useEffect(() => {
    if (!(data && d3Container.current)) return;
    if (!chart) {
      chart = new OrgChart();
    }
    chart
      .container(d3Container.current)
      .data(data)
      .nodeWidth((d) => 200)
      .nodeHeight((d) => 120)
      .onNodeClick((d) => {
        onNodeClick(`${d}`);
        setIdNode(`${d}`);
        // setIsModalOpen(true);
      })
      .childrenMargin((d) => 40)
      .compactMarginBetween((d) => 15)
      .compactMarginPair((d) => 80)
      .buttonContent(({ node, state }) => {
        const children =
          "_directSubordinates" in node.data && node.data._directSubordinates;
        return `<div style="border-radius:3px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border:1px solid #e4e2e9;"> <span style="font-size:9px">${
          node.children
            ? `<i style="border:solid #716e7b;border-width:0 2px 2px 0;display:inline-block;padding:3px;margin-bottom:-3px;transform:rotate(-135deg);-webkit-transform:rotate(-135deg);"></i>`
            : `<i style="border:solid #716e7b;border-width:0 2px 2px 0;display:inline-block;padding:3px;transform:rotate(45deg);-webkit-transform:rotate(45deg);"></i>`
        }</span> <span style="margin-left:2px;">${children}</span></div>`;
      })
      .nodeContent((d, i, arr, state) => {
        return ReactDOMServer.renderToStaticMarkup(
          <ContentOrgChart data={d.data} />
        );
      })
      .render();
  }, [data, d3Container.current]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addNode = (node: DataChart) => {
    chart.addNode(node);
  };

  const addNewNode = () => {};

  setClick(addNode);

  return (
    <div>
      <div ref={d3Container} />
      <Modal
        title={currentNode?.name}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Button onClick={addNewNode}>Thêm node cho node này</Button>
        <Button>Sửa</Button>
        <Button>Xóa</Button>
      </Modal>
    </div>
  );
};
