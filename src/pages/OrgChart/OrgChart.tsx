import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { OrgChart } from "d3-org-chart";
import { DataChart } from "../../types/Chart.type";
import ReactDOMServer from "react-dom/server";
import ContentOrgChart from "./OrgChartNodeContent";
import OrgChartNodeDetail from "./OrgChartNodeDetail";
import { useDataOrgChart } from "../../stores/orgChart.store";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { debounce } from "lodash";
import OrgChartTool from "./OrgChartTool";
import OrgChartAddModal from "./OrgChartAddModal";
import OrgChartAddNodeModal from "./OrgChartAddNodeModal";
import OrgChartUpdateNodeModal from "./OrgChartUpdateNodeModal";
import * as d3 from "d3";

let chart: OrgChart<DataChart> = new OrgChart();

export default function OrgChartComponent() {
  const { data, setDataNode } = useDataOrgChart((state) => state);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [idNode, setIdNode] = useState("");
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  const d3Container = useRef(null);

  useLayoutEffect(() => {
    if (!(data && d3Container.current)) return;
    const chartContainer = document.querySelector(".chart");
    chart
      .container(d3Container.current)
      .data(data)
      .nodeWidth(() => 200)
      .nodeHeight(() => 120)
      .onNodeClick((d) => {
        setIdNode(`${d}`);
        setPosition({
          x: d3.pointer(event, chartContainer)[0] - d3.pointer(event)[0] + 100,
          y: d3.pointer(event, chartContainer)[1] - d3.pointer(event)[1] + 60
        })
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
    if (chartContainer) {
      if (!chartContainer.hasAttribute("transform")) {
        chartContainer.setAttribute("transform", "")
      }
      const debounceClosePopup = debounce(() => {
        setIsOpenPopover(false);
      }, 100);
      const observer = new MutationObserver(function() {
        debounceClosePopup()
      });
      observer.observe(chartContainer, {
        attributes: true,
        attributeFilter: ['transform']
      });
      return () => observer.disconnect();
    }
  }, [data, d3Container.current]);

  useEffect(() => {
    if (idNode !== "") {
      setIsOpenPopover(true);
      setDataNode(idNode);
    }
  }, [idNode]);

    const onClosePopover = () => {
     setIsOpenPopover(false);
     setIdNode("");
     setDataNode("")
    }

  return (
    <div className="orgChart">
      <OrgChartAddModal />
      <OrgChartAddNodeModal />
      <OrgChartUpdateNodeModal />
      <OrgChartTool></OrgChartTool>
      <div id="react-tooltip-chart">
        <div ref={d3Container} />
      </div>
      <Tooltip
        anchorId="react-tooltip-chart"
        position={position}
        isOpen={isOpenPopover}
        children={
          <OrgChartNodeDetail
            id={idNode}
            onClosePopover={onClosePopover}
          ></OrgChartNodeDetail>
        }
        clickable
      />
    </div>
  );
}
