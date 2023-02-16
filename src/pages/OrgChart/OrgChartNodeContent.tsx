import { DataChart } from "../../types/Chart.type";
import "./OrgChart.css";

type ContentOrgChartProps = { data: DataChart };
const ContentOrgChart = ({ data }: ContentOrgChartProps) => {
  return (
    <div className="chartNode" onClick={(e) => console.log(e)}>
      <div className="chartNode_name">{data.name}</div>
      <div className="chartNode_values">
        <p>{data?.fte}</p>
        <p>{data?.ftePosition}</p>
      </div>
    </div>
  );
};

export default ContentOrgChart;
