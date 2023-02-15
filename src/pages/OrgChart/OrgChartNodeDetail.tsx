import React from "react";
import { Collapse, Divider } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { DataChart } from "../../types/Chart.type";
import { useDataOrgChart } from "../../stores/orgChart.store";
const { Panel } = Collapse;

type PropsContent = {
    nodeDetail: DataChart | null,
    onClosePopover: () => void
};

const OrgChartNodeDetail = ({ nodeDetail, onClosePopover }: PropsContent) => {
    const { setIsOpenUpdateModal } = useDataOrgChart((state) => state);
    return (
        <div className="flex flex-col">
            <div className="flex justify-between p-4">
                <div className="flex flex-col items-start">
                    <div className="font-semibold">Đơn vị kinh doanh</div>
                    <div>{nodeDetail?.name?.toUpperCase()}</div>
                    <div>kể từ Hôm nay</div>
                </div>
                <div className="flex">
                    <MenuOutlined className="cursor-pointer" onClick={() => setIsOpenUpdateModal(true)}/>
                    <CloseOutlined  className="ml-2 cursor-pointer" onClick={() => onClosePopover()}/>
                </div>
            </div>

            <Collapse bordered={false} size="small" defaultActiveKey={['1', '2', '3']}>
                <Panel className="flex flex-col bg-white panel" header={"Chi tiết"} key="1">
                    <div className="flex">
                        <div className="mr-4">Tên</div>
                        <div>KHỐI HỖ TRỢ</div>
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
                    <div className="pl-4">448 Cac vi tri co trang thai duoc tuyen dung</div>
                    <Divider />
                    <div>80 cac thuc the trong tong 4 cap do ben duoi</div>
                    <div>39 cac thuc the loai phong</div>
                    <div className="pl-4">209 nhan vien voi 221 FTE</div>
                    <div className="pl-4">440 Cac vi tri voi 220/2.276 FTE</div>
                    <div className="pl-4">404 Cac vi tri co trang thai duoc tuyen dung</div>
                    <div>17 cac thuc the loai nhom/phong1</div>
                </Panel>
            </Collapse>
        </div>
    )
}

export default OrgChartNodeDetail