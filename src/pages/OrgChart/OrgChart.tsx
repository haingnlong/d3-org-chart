import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./OrgChart.css";
import OrgChartNodeDetail from "./OrgChartNodeDetail";
import { useDataOrgChart } from "../../stores/orgChart.store";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { debounce } from "lodash";
import OrgChartAddModal from "./OrgChartAddModal";
import OrgChartAddNodeModal from "./OrgChartAddNodeModal";
import OrgChartUpdateNodeModal from "./OrgChartUpdateNodeModal";
import OrgChartTool from "./OrgChartTool";
import { Empty } from 'antd';
import { NODE_WIDTH, NODE_HEIGHT } from "./orgChartConstant";
import * as d3 from "d3";

export default function OrgChartComponent() {
  const { chart, data, setDataNode } = useDataOrgChart((state) => state);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [idNode, setIdNode] = useState("");
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  const d3Container = useRef(null);

  useLayoutEffect(() => {
    if (!(data.length > 0 && d3Container.current)) return;
    const chartSVG = document.querySelector(".chart");
    const root = document.querySelector("#root");
    chart
      .container(d3Container.current)
      .data(data)
      .nodeWidth(() => NODE_WIDTH)
      .nodeHeight(() => NODE_HEIGHT)
      .onNodeClick((d) => {
        setIdNode(`${d}`);
        setPosition({
          x: d3.pointer(event, root)[0] - d3.pointer(event)[0] + NODE_WIDTH/2,
          y: d3.pointer(event, root)[1] - d3.pointer(event)[1] + NODE_HEIGHT/2
        })
      })
      .childrenMargin(() => 40)
      .compactMarginBetween(() => 15)
      .compactMarginPair(() => 80)
      .buttonContent(({ node}) => {
        const children =
          "_directSubordinates" in node.data && node.data._directSubordinates;
        return `<div style="border-radius:3px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border:1px solid #e4e2e9;"> <span style="font-size:9px">${
          node.children
            ? `<i style="border:solid #716e7b;border-width:0 2px 2px 0;display:inline-block;padding:3px;margin-bottom:-3px;transform:rotate(-135deg);-webkit-transform:rotate(-135deg);"></i>`
            : `<i style="border:solid #716e7b;border-width:0 2px 2px 0;display:inline-block;padding:3px;transform:rotate(45deg);-webkit-transform:rotate(45deg);"></i>`
        }</span> <span style="margin-left:2px;">${children}</span></div>`;
      })
      .nodeContent((d, i, arr, state) => {
          let htmlString = `<div style="display: flex;height: 120px;justify-content: space-around;flex-direction: column;text-align: center;border:1px solid #E4E2E9;border-left: 5px solid #25A6F0"><div style="margin-top: 10px;text-transform: uppercase;font-size: 16px">${d.data.name}</div>`
          if (d.data.fte && d.data.ftePosition) {
              htmlString += `<div style="display: flex;justify-content: space-around; align-items: center;margin-bottom: 10px"><div>${d.data.fte}</div><div>${d.data.ftePosition}</div></div>`
          }
          htmlString += `</div>`;
          return htmlString
      })
      .render();
    if (chartSVG) {
      const debounceClosePopup = debounce(() => {
          setIsOpenPopover(false);
          setIdNode("");
          setDataNode("")
      }, 100);
      const observer = new MutationObserver(function() {
        debounceClosePopup()
      });
      observer.observe(chartSVG, {
        attributes: true,
        attributeFilter: ['transform']
      });
      return () => observer.disconnect();
    }
  }, [data]);

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
        {data.length > 0 && (
           <>
               <div id="react-tooltip-chart">
                   <div ref={d3Container} />
               </div>
               <Tooltip
                   classNameArrow="popover-arrow"
                   anchorId="react-tooltip-chart"
                   position={position}
                   isOpen={isOpenPopover}
                   children={
                       <OrgChartNodeDetail
                           id={idNode}
                           onClosePopover={onClosePopover}
                       ></OrgChartNodeDetail>
                   }
                   offset={0}
                   clickable
               />
           </>
        )}
        {data.length === 0 && (
            <Empty className="mt-8" description="Không có tổ chức nào" />
        )}
    </div>
  );
}
