import { FC, memo } from "react";
import { Droppable } from "react-beautiful-dnd";

import "./Column.scss";
import { Task } from "../Task/Task";
import { IColumn } from "../Board/Board";

export const Column: FC<IColumn> = memo(({ id, tasks, title }) => {
  return (
    <div className="container">
      <div className="title">{title}</div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});
