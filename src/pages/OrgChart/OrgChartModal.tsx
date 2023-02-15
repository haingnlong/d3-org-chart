import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import { useAddData } from "../../queries/Chart.query";
import { addData } from "../../services/Chart.service";
import { useDataOrgChart } from "../../stores/orgChart.store";
import { DataChart } from "../../types/Chart.type";

const OrgChartModal = ({
  parentId,
  type,
  symbol,
}: {
  parentId: string;
  type: string;
  symbol: React.ReactElement<any | any> | string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { mutate } = useAddData();
  const addData = useDataOrgChart((state) => state.addData);
  const updateDataNode = useDataOrgChart((state) => state.updateDataNode);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: DataChart) => {
    setIsModalOpen(false);
    if (type === "create") {
      addData({ ...values, parentId: parentId || "" });
    } else {
      updateDataNode({ ...values, id: parentId });
    }
    // mutate({ ...values, parentId: parentId || "" });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        icon={typeof symbol !== "string" ? symbol : null}
      >
        {typeof symbol == "string" ? symbol : null}
      </Button>

      <Modal
        title={type === "create" ? "Tạo node mới" : "Chỉnh sửa"}
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
          {type === "create" && (
            <Form.Item label="Id" name="id">
              <Input />
            </Form.Item>
          )}

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

export default OrgChartModal;
