import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useDataOrgChart } from "../../stores/orgChart.store";
import { DataChart } from "../../types/Chart.type";

const OrgChartUpdateNodeModal = () => {
  const { dataNode, updateDataNode, isOpenUpdateModal, setIsOpenUpdateModal } = useDataOrgChart((state) => state);

  const onFinish = (values: DataChart) => {
    setIsOpenUpdateModal(false);
    updateDataNode(values);
  };

  return (
      <Modal
          title={"Sửa node"}
          open={isOpenUpdateModal}
          onCancel={() => setIsOpenUpdateModal(false)}
          footer={null}
      >
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{...dataNode}}
        >
          <Form.Item label="Id" name="id">
            <Input disabled/>
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

export default OrgChartUpdateNodeModal;
