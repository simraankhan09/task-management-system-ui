import { FC, memo, useState, useEffect } from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

import "./Board.scss";
import { Column } from "../Column/Column";
import { ITask, TaskStatus } from "../../service/task-service/interface";
import { ServiceFactory } from "../../service/ServiceFactory";

interface BoardProps {
  taskList: ITask[];
}

export interface IColumn {
  title: string;
  id: TaskStatus;
  tasks: ITask[];
}

export const Board: FC<BoardProps> = memo(({ taskList }) => {
  const [todo, setTodo] = useState<ITask[]>([]);
  const [inProgress, setInProgress] = useState<ITask[]>([]);
  const [done, setDone] = useState<ITask[]>([]);

  useEffect(() => {
    if (!taskList.length) return;

    setTodo(taskList.filter((task) => task.taskStatus === TaskStatus.TODO));
    setInProgress(
      taskList.filter((task) => task.taskStatus === TaskStatus.INPROGRESS)
    );
    setDone(taskList.filter((task) => task.taskStatus === TaskStatus.DONE));
  }, [taskList]);

  const columns: IColumn[] = [
    {
      title: "TO DO",
      id: TaskStatus.TODO,
      tasks: todo,
    },
    {
      title: "IN PROGRESS",
      id: TaskStatus.INPROGRESS,
      tasks: inProgress,
    },
    {
      title: "DONE",
      id: TaskStatus.DONE,
      tasks: done,
    },
  ];

  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Switch within the column
      const task = findItemById(draggableId, [...taskList]);
      if (!task) return;

      switch (destination.droppableId) {
        case TaskStatus.TODO.toString():
          setTodo(switchTask(task, todo));
          break;

        case TaskStatus.INPROGRESS.toString():
          setInProgress(switchTask(task, inProgress));
          break;

        case TaskStatus.DONE.toString():
          setDone(switchTask(task, done));
          break;

        default:
          break;
      }
      return;
    }

    //REMOVE FROM SOURCE ARRAY

    switch (source.droppableId) {
      case TaskStatus.TODO.toString():
        setTodo(removeItemById(draggableId, todo));
        break;
      case TaskStatus.INPROGRESS.toString():
        setInProgress(removeItemById(draggableId, inProgress));
        break;
      case TaskStatus.DONE.toString():
        setDone(removeItemById(draggableId, done));
        break;

      default:
        break;
    }

    // GET ITEM

    const task = findItemById(draggableId, [...taskList]);

    if (!task) return;

    //ADD ITEM

    switch (destination.droppableId) {
      case TaskStatus.TODO.toString():
        setTodo([task, ...todo]);
        break;

      case TaskStatus.INPROGRESS.toString():
        setInProgress([task, ...inProgress]);
        break;

      case TaskStatus.DONE.toString():
        setDone([task, ...done]);
        break;

      default:
        break;
    }
    // Update task status
    updateTaskStatus(task.taskId, destination.droppableId as TaskStatus);
  };

  const findItemById = (id: string, array: ITask[]) => {
    return array.find((item) => item.taskId.toString() === id);
  };

  const removeItemById = (id: string, array: ITask[]) => {
    return array.filter((item) => item.taskId.toString() !== id);
  };

  const switchTask = (task: ITask, array: ITask[]) => {
    const newArray = [...array];
    const filteredData = newArray.filter((item) => item.taskId !== task.taskId);
    filteredData.splice(0, 0, task);
    return filteredData;
  };

  const updateTaskStatus = async (taskId: number, taskStatus: TaskStatus) => {
    try {
      await ServiceFactory.getInstance()
        .getTaskService()
        .updateStatusById(taskId, taskStatus);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="board-container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <h2 className="heading">TMS BOARD</h2>
        {!taskList.length ? (
          <div className="empty-list-text">No task created yet!</div>
        ) : (
          <div className="column-container">
            {columns.map((col) => (
              <Column
                key={col.id}
                id={col.id}
                tasks={col.tasks}
                title={col.title}
              />
            ))}
          </div>
        )}
      </DragDropContext>
    </div>
  );
});
