import { OrgChart } from "d3-org-chart";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DataChart } from "../../types/Chart.type";
import ReactDOMServer from "react-dom/server";
import ContentOrgChart from "./OrgChartNodeContent";
import OrgChartNodeDetail from "./OrgChartNodeDetail";
import { useDataOrgChart } from "../../stores/orgChart.store";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";
import { throttle } from "lodash";

type Props = {
  setClick: (callback: unknown) => void;
  onNodeClick: (d: string) => void;
};

type MutationList = {
  type: string
}

export const OrgChartComponent = ({ onNodeClick, setClick }: Props) => {
  const data = useDataOrgChart((state) => state.data);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [idNode, setIdNode] = useState({
    preId: "",
    currentId: ""
  });
  const [savedPosition, setSavedPosition] = useState({
    x: 0,
    y: 0,
    active: false
  })
  const [usedPosition, setUsedPosition] = useState({
    x: 0,
    y: 0
  })

  const d3Container = useRef(null);
  let chart: OrgChart<DataChart>;

  useLayoutEffect(() => {
    if (!(data && d3Container.current)) return;
    if (!chart) {
      chart = new OrgChart();
    }
    chart
      .container(d3Container.current)
      .data(data)
      .nodeWidth(() => 200)
      .nodeHeight(() => 120)
      .onNodeClick((d) => {
        onNodeClick(`${d}`);
        setIdNode((prevState) => ({ preId: prevState.currentId, currentId: `${d}` }));
        setSavedPosition((prevState) => ({ ...prevState, active: true }))
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

    const svgElement = document.querySelector('.svg-chart-container');
    if (svgElement) {
      // close popover if chart change SVG
      const config = { attributes: true, childList: true, subtree: true };
      const callback = (mutationList: MutationList[]) => {
        for (let i = 0; i < mutationList.length; i++) {
          if (mutationList[i].type === 'childList') {
            setIsOpenPopover(false);
            setIdNode({ preId: "", currentId: "" })
            break;
          } else if (mutationList[i].type === 'attributes') {
            setIsOpenPopover(false);
            setIdNode({ preId: "", currentId: "" })
            break;
          }
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(svgElement, config);
      return () => observer.disconnect();
    }
  }, [data, d3Container.current]);

  useEffect(() => {
    if (idNode.currentId !== "") {
      setIsOpenPopover(true)
    }
    if (idNode.preId === idNode.currentId
        && idNode.currentId !== ""
        && idNode.preId !== ""
        && isOpenPopover
    ) {
      // close popover when click current node again
      setIsOpenPopover(false)
    }
  }, [idNode])

  useEffect(() => {
    if (savedPosition.active) {
      setUsedPosition({
        x: savedPosition.x,
        y: savedPosition.y
      })
    }
  }, [savedPosition])

  const addNode = (node: DataChart) => {
    chart.addNode(node);
  };

  const onMouseMoveChart = useCallback(throttle((e: React.MouseEvent<EventTarget>) => {
    setSavedPosition({
      x: e.clientX,
      y: e.clientY,
      active: false
    })
  }, 100), []);

  return (
    <>
      <div id="react-tooltip-chart">
        <div
          ref={d3Container}
          onMouseMove={onMouseMoveChart}
        />
      </div>
      <Tooltip
        anchorId="react-tooltip-chart"
        position={usedPosition}
        isOpen={isOpenPopover}
        children={<OrgChartNodeDetail id={idNode.currentId}></OrgChartNodeDetail>}
        clickable
      />
    </>
  );
};
