import { Modal, Form, Input, Select, Button } from "antd";
import { FC } from "react";

import "./TaskModal.scss";

interface TaskModalProps {
  visible: boolean;
  onCancel: () => void;
}

const { TextArea } = Input;

export const TaskModal: FC<TaskModalProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      width="80%"
      destroyOnClose
      closable={false}
      footer={[]}
      title="Create task"
    >
      <Form layout="vertical">
        <Form.Item
          label="Task name"
          name="taskName"
          rules={[{ message: "Task name is required", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Task description"
          name="taskDescripion"
          rules={[{ message: "Task description is required", required: true }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Task priority level"
          name="taskPriority"
          rules={[
            { message: "Task priority level is required", required: true },
          ]}
        >
          <Select>
            <Select.Option>Low</Select.Option>
            <Select.Option>Medium</Select.Option>
            <Select.Option>High</Select.Option>
            <Select.Option>Highest</Select.Option>
          </Select>
        </Form.Item>

        <div className="form-btns">
          <Button type="primary">Create</Button>
          <Button type="primary" onClick={() => form.resetFields()}>
            Reset
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
