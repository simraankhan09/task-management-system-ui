import React, { useState, useEffect, useContext } from "react";
import { Header } from "./components/Header/Header";
import { TaskModal } from "./components/TaskModal/TaskModal";
import { ServiceFactory } from "./service/ServiceFactory";
import {
  ITask,
  ITaskAddResource,
  TaskPriorityLevel,
} from "./service/task-service/interface";
import { onFormSubmit } from "./util/notification";
import { getErrorMessage } from "./util/util";
import { Board } from "./components/Board/Board";
import { AppContext } from "./context/AppContext";
import { BoardSkeleton } from "./components/BoardSkeleton/BoardSkeleton";
import { Checkbox } from "antd";

import "./App.scss";

const App = () => {
  const context = useContext(AppContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterPriorities, setFilterPriorities] = useState<TaskPriorityLevel[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<ITask[] | undefined>();

  useEffect(() => {
    const getTaskList = async () => {
      setLoading(true);
      try {
        const response = await ServiceFactory.getInstance()
          .getTaskService()
          .getAll();
        if (!Array.isArray(response)) {
          setTaskList([]);
          setLoading(false);
          return;
        }
        setTaskList(response);
      } catch (error) {
        setTaskList([]);
      }
      setLoading(false);
    };
    getTaskList();
  }, [context?.triggerApi]);

  useEffect(() => {
    if (!filterPriorities.length) {
      setFilteredData(undefined);
      return;
    }
    setFilteredData(
      taskList.filter((item) => filterPriorities.includes(item.taskPriority))
    );
  }, [filterPriorities, taskList]);

  const handleCreate = async (formValues: ITaskAddResource) => {
    setIsSubmitting(true);
    try {
      const response = await ServiceFactory.getInstance()
        .getTaskService()
        .createTask(formValues);
      if (!response) {
        onFormSubmit("ERROR", getErrorMessage());
        setIsSubmitting(false);
        return;
      }
      onFormSubmit("SUCCESS", response.message);
      context?.setVisibleTaskModal(false);
      context?.setTriggerApi((prev) => prev + 1);
    } catch (error) {
      onFormSubmit("ERROR", getErrorMessage(error));
    }
    setIsSubmitting(false);
  };

  const handleUpdate = async (values: ITask) => {
    setIsSubmitting(true);
    try {
      const response = await ServiceFactory.getInstance()
        .getTaskService()
        .updateTask(values);
      if (!response) {
        onFormSubmit("ERROR", getErrorMessage());
        setIsSubmitting(false);
        return;
      }
      onFormSubmit("SUCCESS", "Successfully task updated!");
      context?.setVisibleTaskModal(false);
      context?.setTriggerApi((prev) => prev + 1);
    } catch (error) {
      onFormSubmit("ERROR", getErrorMessage(error));
    }
    setIsSubmitting(false);
  };

  const priotityFilter = () => {
    if (!taskList.length) return null;

    const taskPriorityOptions: { label: string; value: TaskPriorityLevel }[] = [
      { label: "Low", value: TaskPriorityLevel.LOW },
      { label: "Medium", value: TaskPriorityLevel.MEDIUM },
      { label: "High", value: TaskPriorityLevel.HIGH },
      { label: "Highest", value: TaskPriorityLevel.HIGHEST },
    ];

    return (
      <div className="priority-filter-container">
        <div>Filter by priority level</div>
        {taskPriorityOptions.map((priority) => (
          <Checkbox
            key={priority.value}
            onChange={(e) => {
              if (e.target.checked) {
                setFilterPriorities((prev) => [...prev, priority.value]);
              } else {
                setFilterPriorities(
                  filterPriorities.filter((item) => item !== priority.value)
                );
              }
            }}
          >
            {priority.value}
          </Checkbox>
        ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      {/* Header component */}
      <Header />
      {priotityFilter()}

      {/* Board component /  Board Skeleton component*/}
      {!loading ? (
        <Board taskList={filteredData ?? taskList} />
      ) : (
        <BoardSkeleton />
      )}

      {/* Task Modal */}
      {context?.visibleTaskModal && (
        <TaskModal
          visible={context?.visibleTaskModal}
          onCancel={() => context.setVisibleTaskModal(false)}
          onCreate={handleCreate}
          isSubmitting={isSubmitting}
          onUpdate={handleUpdate}
        />
      )}
    </React.Fragment>
  );
};

export default App;
