import { FC, memo, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  FaEquals,
  FaChevronDown,
  FaAngleUp,
  FaAnglesUp,
  FaEye,
  FaTrashCan,
} from "react-icons/fa6";
import { ExclamationCircleFilled } from "@ant-design/icons";

import "./Task.scss";
import { ITask, TaskPriorityLevel } from "../../service/task-service/interface";
import { Button, Modal } from "antd";
import { AppContext } from "../../context/AppContext";
import { ServiceFactory } from "../../service/ServiceFactory";
import { onFormSubmit } from "../../util/notification";
import { getErrorMessage } from "../../util/util";

interface TaskProps {
  task: ITask;
  index: number;
}

const { confirm } = Modal;

export const Task: FC<TaskProps> = memo(({ task, index }) => {
  const context = useContext(AppContext);

  const priorityLevelIconMap: { [key: string]: React.ReactNode } = {
    [TaskPriorityLevel.LOW.toString()]: (
      <FaChevronDown
        style={{ color: "var(--info)", fontSize: "var(--font-size-smaller)" }}
      />
    ),
    [TaskPriorityLevel.MEDIUM.toString()]: (
      <FaEquals
        style={{
          color: "var(--warning)",
          fontSize: "var(--font-size-smaller)",
        }}
      />
    ),
    [TaskPriorityLevel.HIGH.toString()]: (
      <FaAngleUp
        style={{ color: "var(--danger)", fontSize: "var(--font-size-smaller)" }}
      />
    ),
    [TaskPriorityLevel.HIGHEST.toString()]: (
      <FaAnglesUp
        style={{ color: "var(--danger)", fontSize: "var(--font-size-smaller)" }}
      />
    ),
  };

  const handleDelete = async () => {
    try {
      const response = await ServiceFactory.getInstance()
        .getTaskService()
        .deleteTaskById(task.taskId);
      if (!response) {
        onFormSubmit("ERROR", getErrorMessage());
        return;
      }
      onFormSubmit("SUCCESS", response.message);
      context?.setTriggerApi((prev) => prev + 1);
    } catch (error) {
      onFormSubmit("ERROR", getErrorMessage(error));
    }
  };

  const getPriotityTitle = (priority: string) => {
    let retStr = priority.toLowerCase();
    return retStr.replace(retStr.charAt(0), priority.charAt(0).toUpperCase());
  };

  return (
    <Draggable
      draggableId={task.taskId.toString()}
      key={task.taskId.toString()}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className="task-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="task-name-container" title={task.taskName}>
            {task.taskName}
          </div>
          <div className="task-info-container">
            <div
              title={`${getPriotityTitle(task.taskPriority.toString())} level`}
            >
              {priorityLevelIconMap[task.taskPriority.toString()]}
              &nbsp; &nbsp;
              {`#${task.taskId}`}
            </div>
            <Button
              icon={<FaEye />}
              type="link"
              title="View"
              onClick={() => {
                context?.setTask(task);
                context?.setVisibleTaskModal(true);
              }}
            />
            <Button
              className="delete-btn"
              icon={<FaTrashCan />}
              type="link"
              title="Delete"
              onClick={() => {
                confirm({
                  title: "Do you want to delete this task?",
                  icon: <ExclamationCircleFilled />,
                  content: "This action will be permanently delete this task",
                  cancelButtonProps: { type: "link" },
                  onOk: handleDelete,
                });
              }}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
});
