import React, {useState} from "react";
import { Select, DatePicker } from 'antd';
import type { SelectProps } from 'antd';
import { StarOutlined, MinusOutlined, PlusOutlined, DiffOutlined, DownloadOutlined } from '@ant-design/icons';
import {useDataOrgChart} from "../../stores/orgChart.store";

const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

export default function OrgChartTool() {
    const { chart, setIsOpenAddModal } = useDataOrgChart((state) => state);
    const [zoomChartNumber, setZoomChartNumber] = useState(100)

    const onClickZoomInChart = () => {
        if (zoomChartNumber < 150) {
            setZoomChartNumber(prevState => prevState + 10);
            chart.zoomIn();
        }
    }

    const onClickZoomOutChart = () => {
        if (zoomChartNumber > 50) {
            setZoomChartNumber(prevState => prevState - 10);
            chart.zoomOut();
        }
    }

    return (
        <div className="flex justify-between mb-2">
            <div className="flex gap-4 basis-1/2">
                <div className="flex items-center gap-1">
                    <div>Cấu trúc công ty</div>
                    <Select
                        placeholder="Please select"
                        style={{ width: 200 }}
                        options={options}
                    />
                </div>
                <div className="flex items-center gap-1">
                    <div>Tìm kiếm</div>
                    <Select
                        placeholder="Please select"
                        style={{ width: 200 }}
                        options={options}
                    />
                    <Select
                        placeholder="Please select"
                        style={{ width: 200 }}
                        options={options}
                    />
                </div>
            </div>
            <div className="flex justify-between basis-1/2">
                <div className="flex gap-4 items-center">
                    <StarOutlined className="cursor-pointer text-[24px]"/>
                    <DatePicker />
                </div>
                <div className="flex gap-4 items-center">
                    <MinusOutlined onClick={onClickZoomOutChart} className="cursor-pointer text-[20px]"/>
                    <div>{zoomChartNumber}%</div>
                    <PlusOutlined onClick={onClickZoomInChart} className="cursor-pointer text-[20px]"/>
                </div>
                <div className="flex gap-4 items-center">
                    <StarOutlined className="cursor-pointer text-[24px]"/>
                    <DiffOutlined
                        className="cursor-pointer text-[24px]"
                        onClick={() => setIsOpenAddModal(true)}
                    />
                    <DownloadOutlined onClick={() => chart.exportImg()} className="cursor-pointer text-[24px]"/>
                </div>
            </div>
        </div>
    )
}