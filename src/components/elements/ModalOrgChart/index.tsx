import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import { useAddData } from "../../../queries/Chart.query";
import { addData } from "../../../services/Chart.service";
import { useDataOrgChart } from "../../../stores/orgChart.store";
import { DataChart } from "../../../types/Chart.type";

const ModalOrgChart = ({ parentId }: { parentId: string }) => {
  console.log("parentId", parentId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { mutate } = useAddData();
  const addData = useDataOrgChart((state) => state.addData);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: DataChart) => {
    setIsModalOpen(false);
    addData({ ...values, parentId: parentId || "" });
    // mutate({ ...values, parentId: parentId || "" });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Node
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
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
    </>
  );
};

export default ModalOrgChart;
