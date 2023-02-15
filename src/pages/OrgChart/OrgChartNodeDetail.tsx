import { useEffect } from "react";
import { Collapse, Divider } from "antd";
import { CloseOutlined, EditOutlined, DeleteOutlined, MenuOutlined } from "@ant-design/icons";
import { useDataOrgChart } from "../../stores/orgChart.store";

const { Panel } = Collapse;

type PropsContent = {
  id: string;
  onClosePopover: () => void;
};

const OrgChartNodeDetail = ({ id, onClosePopover }: PropsContent) => {
  const { setIsOpenAddNodeModal, setIsOpenUpdateModal, dataNode, getDataNode, removeData } = useDataOrgChart((state) => state);

  useEffect(() => {
    getDataNode(id);
  }, [id]);

  const removeNode = () => {
    removeData(id);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-4">
        <div className="flex flex-col items-start">
          <div className="font-semibold">Đơn vị kinh doanh</div>
          <div>{dataNode?.name}</div>
          <div>Kể từ: Hôm nay</div>
        </div>
        <div className="flex">
          <div className="flex gap-2">
            <MenuOutlined onClick={() => setIsOpenAddNodeModal(true)}></MenuOutlined>
            <EditOutlined onClick={() => setIsOpenUpdateModal(true)}/>
            <DeleteOutlined onClick={removeNode}/>
            <CloseOutlined onClick={onClosePopover}/>
          </div>
        </div>
      </div>

      <Collapse
        bordered={false}
        size="small"
        defaultActiveKey={["1", "2", "3"]}
      >
        <Panel
          className="flex flex-col bg-white panel"
          header={"Chi tiết"}
          key="1"
        >
          <div className="flex">
            <div className="mr-4">Tên</div>
            <div>{dataNode?.name}</div>
          </div>
        </Panel>
        <Panel className="bg-white panel" header="Lịch sử" key="2">
          <div className="mb-2">Đơn vị kinh doanh có hiệu lực từ</div>
          <div className="flex justify-between">
            <div>01-01-1900</div>
            <div>119 nam 9 thang</div>
          </div>
        </Panel>
        <Panel className="bg-white panel" header="Chi tiết về phân cấp" key="3">
          <div>17 cac thuc the truc tiep ben duoi</div>
          <div>17 cac the loai ban</div>
          <div className="pl-4">221 nhan vien voi 221 FTE</div>
          <div className="pl-4">486 Cac vi tri voi 220/2.276 FTE</div>
          <div className="pl-4">
            448 Cac vi tri co trang thai duoc tuyen dung
          </div>
          <Divider />
          <div>80 cac thuc the trong tong 4 cap do ben duoi</div>
          <div>39 cac thuc the loai phong</div>
          <div className="pl-4">209 nhan vien voi 221 FTE</div>
          <div className="pl-4">440 Cac vi tri voi 220/2.276 FTE</div>
          <div className="pl-4">
            404 Cac vi tri co trang thai duoc tuyen dung
          </div>
          <div>17 cac thuc the loai nhom/phong1</div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default OrgChartNodeDetail;
