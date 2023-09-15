import { Modal, Form, Input, Select, Button } from "antd";
import { FC, memo } from "react";

import "./TaskModal.scss";
import {
  ITaskAddResource,
  TaskPriorityLevel,
} from "../../service/task-service/interface";

interface TaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: ITaskAddResource) => void;
  isSubmitting: boolean;
}

const { TextArea } = Input;

export const TaskModal: FC<TaskModalProps> = memo(
  ({ visible, onCancel, onCreate, isSubmitting }) => {
    const [form] = Form.useForm<ITaskAddResource>();

    const taskPriorityOptions: { label: string; value: TaskPriorityLevel }[] = [
      { label: "Low", value: TaskPriorityLevel.LOW },
      { label: "Medium", value: TaskPriorityLevel.MEDIUM },
      { label: "High", value: TaskPriorityLevel.HIGH },
      { label: "Highest", value: TaskPriorityLevel.HIGHEST },
    ];

    return (
      <Modal
        open={visible}
        width="80%"
        destroyOnClose
        closable={false}
        footer={[]}
        title="Create task"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Task name"
            name="taskName"
            rules={[{ message: "Task name is required", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Task description"
            name="taskDescription"
            rules={[
              { message: "Task description is required", required: true },
              {
                message: "Task description cannot exceed 300 characters",
                validator(rule, value: string, callback) {
                  return new Promise<void>((resolve, reject) => {
                    if (value && value.length > 300) {
                      reject();
                    } else {
                      resolve();
                    }
                  });
                },
              },
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>
          <Form.Item
            label="Task priority level"
            name="taskPriority"
            rules={[
              { message: "Task priority level is required", required: true },
            ]}
          >
            <Select
              placement="bottomLeft"
              placeholder="Select a priority level"
            >
              {taskPriorityOptions.map((priority, index) => (
                <Select.Option
                  key={priority.value}
                  value={priority.value}
                  selected={index === 0}
                >
                  {priority.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="form-btns">
            <Button
              type="primary"
              onClick={async () => {
                try {
                  const formValues = await form.validateFields();
                  onCreate(formValues);
                } catch (error) {}
              }}
              loading={isSubmitting}
            >
              Create
            </Button>
            <Button
              className="reset-btn"
              type="primary"
              onClick={() => form.resetFields()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              className="cancel-btn"
              type="primary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }
);
