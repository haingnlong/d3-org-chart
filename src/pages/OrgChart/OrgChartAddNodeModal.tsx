import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useDataOrgChart } from "../../stores/orgChart.store";
import { DataChart } from "../../types/Chart.type";

type PropsContent = {
    nodeDetail: DataChart | null
};

const OrgChartAddNodeModal = ({ nodeDetail }: PropsContent) => {
    const { addData, isOpenAddNodeModal, setIsOpenAddNodeModal } = useDataOrgChart((state) => state);

    const onFinish = (values: DataChart) => {
        if (nodeDetail?.id) {
            setIsOpenAddNodeModal(false);
            addData({ ...values, parentId: nodeDetail.id });
        }
    };

    return (
        <Modal
            title={"Thêm thực thể"}
            open={isOpenAddNodeModal}
            onCancel={() => setIsOpenAddNodeModal(false)}
            footer={null}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="Id" name="id">
                    <Input />
                </Form.Item>

                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>

                <Form.Item label="Fte" name="fte">
                    <InputNumber />
                </Form.Item>

                <Form.Item label="FtePosition" name="ftePosition">
                    <InputNumber />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrgChartAddNodeModal;
