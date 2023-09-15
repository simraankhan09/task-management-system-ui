import { FC, memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  FaEquals,
  FaChevronDown,
  FaAngleUp,
  FaAnglesUp,
  FaArrowUpRightFromSquare,
  FaTrashCan,
} from "react-icons/fa6";

import "./Task.scss";
import { ITask, TaskPriorityLevel } from "../../service/task-service/interface";
import { Button } from "antd";

interface TaskProps {
  task: ITask;
  index: number;
}

export const Task: FC<TaskProps> = memo(({ task, index }) => {
  const priorityLevelIconMap: { [key: string]: React.ReactNode } = {
    [TaskPriorityLevel.LOW.toString()]: (
      <FaChevronDown style={{ color: "var(--info)" }} />
    ),
    [TaskPriorityLevel.MEDIUM.toString()]: (
      <FaEquals style={{ color: "var(--warning)" }} />
    ),
    [TaskPriorityLevel.HIGH.toString()]: (
      <FaAngleUp style={{ color: "var(--danger)" }} />
    ),
    [TaskPriorityLevel.HIGHEST.toString()]: (
      <FaAnglesUp style={{ color: "var(--danger)" }} />
    ),
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
            <div>{`#${task.taskId}`}</div>
            <div title={`${task.taskPriority.toString()} level`}>
              {priorityLevelIconMap[task.taskPriority.toString()]}
            </div>
            <Button
              icon={<FaArrowUpRightFromSquare />}
              type="link"
              title="View"
            />
            <Button
              className="delete-btn"
              icon={<FaTrashCan />}
              type="link"
              title="Delete"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
});
