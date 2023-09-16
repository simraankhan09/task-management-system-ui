import { Modal, Form, Input, Select, Button } from "antd";
import { FC, memo, useCallback, useContext, useEffect, useState } from "react";

import "./TaskModal.scss";
import {
  ITask,
  ITaskAddResource,
  TaskPriorityLevel,
} from "../../service/task-service/interface";
import { AppContext } from "../../context/AppContext";

interface TaskModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: (values: ITaskAddResource) => void;
  isSubmitting: boolean;
  onUpdate: (values: ITask) => void;
}

const { TextArea } = Input;

export const TaskModal: FC<TaskModalProps> = memo(
  ({ visible, onCancel, onCreate, isSubmitting, onUpdate }) => {
    const context = useContext(AppContext);

    const [isFormChange, setIsFormChange] = useState(false);

    const [form] = Form.useForm<ITaskAddResource>();

    useEffect(() => {
      if (!context?.task) return;
      const { taskName, taskDescription, taskPriority } = context.task;
      form.setFieldsValue({
        taskName,
        taskDescription,
        taskPriority,
      });
    }, [context?.task, form]);

    const taskPriorityOptions: { label: string; value: TaskPriorityLevel }[] = [
      { label: "Low", value: TaskPriorityLevel.LOW },
      { label: "Medium", value: TaskPriorityLevel.MEDIUM },
      { label: "High", value: TaskPriorityLevel.HIGH },
      { label: "Highest", value: TaskPriorityLevel.HIGHEST },
    ];

    const getTitle = useCallback(() => {
      if (!context?.task) return <div className="modal-title">Create Task</div>;

      return isFormChange ? (
        <div className="modal-title">
          Update #{context.task.taskId} {context.task.taskName}
        </div>
      ) : (
        <div className="modal-title">
          #{context.task.taskId} {context.task.taskName}
        </div>
      );
    }, [context?.task, isFormChange]);

    return (
      <Modal
        open={visible}
        width="80%"
        destroyOnClose
        closable={true}
        footer={[]}
        title={getTitle()}
        maskClosable={false}
        onCancel={onCancel}
      >
        <Form
          layout="vertical"
          form={form}
          onValuesChange={(changeValue) => {
            setIsFormChange(true);
          }}
        >
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
                  if (context?.task && isFormChange) {
                    const values = {
                      ...context.task,
                      ...formValues,
                    };
                    onUpdate(values);
                    return;
                  }
                  onCreate(formValues);
                } catch (error) {}
              }}
              loading={isSubmitting}
              disabled={context?.task && !isFormChange}
            >
              {context?.task ? "Update" : "Create"}
            </Button>
            <Button
              className="reset-btn"
              type="primary"
              onClick={() => form.resetFields()}
              disabled={isSubmitting || !!context?.task}
            >
              Reset
            </Button>
            <Button
              className="cancel-btn"
              type="primary"
              onClick={() => {
                context?.setTask(undefined);
                onCancel();
              }}
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
