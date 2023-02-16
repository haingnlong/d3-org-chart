import { Button, Form, Input, InputNumber, Modal, notification } from "antd";
import { useDataOrgChart } from "../../stores/orgChart.store";
import { DataChart } from "../../types/Chart.type";

const OrgChartAddModal = () => {
  const { data, addData, isOpenAddModal, setIsOpenAddModal } = useDataOrgChart(
    (state) => state
  );

  const onFinish = (values: DataChart) => {
    if (data.length === 0) {
      setIsOpenAddModal(false);
      addData({ ...values });
    } else {
      notification.open({
        message: "Sơ đồ tổ chức đã tồn tại.",
      });
    }
  };

  return (
    <Modal
      title={"Thêm node"}
      open={isOpenAddModal}
      onCancel={() => setIsOpenAddModal(false)}
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

export default OrgChartAddModal;
