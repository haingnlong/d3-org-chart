import "./App.css";
import ModalOrgChart from "./components/elements/ModalOrgChart";
import { OrgChartComponent } from "./components/elements/OrgChart";
import { useGetData } from "./queries/Chart.query";
import { useDataOrgChart } from "./stores/orgChart.store";
import { DataChart } from "./types/Chart.type";

const App = () => {
  // const { data: dataChart } = useGetData();
  const data = useDataOrgChart((state) => state.data);
  let addNodeChildFunc = (callback: unknown) => {};

  const addNode = (params: DataChart) => {
    addNodeChildFunc(params);
  };

  const onNodeClick = (nodeId: any) => {
    // alert("clicked " + nodeId);
  };

  return (
    <div className="container">
      {data[0]?.id ? "Add more node: " : "Create root node: "}
      <ModalOrgChart parentId={data[0]?.id || ""} type="create" />
      <OrgChartComponent
        setClick={(click: any) => (addNodeChildFunc = click)}
        onNodeClick={onNodeClick}
      />
    </div>
  );
};

export default App;
