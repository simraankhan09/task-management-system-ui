import React, { useState, useEffect, useContext } from "react";
import { Header } from "./components/Header/Header";
import { TaskModal } from "./components/TaskModal/TaskModal";
import { ServiceFactory } from "./service/ServiceFactory";
import { ITask, ITaskAddResource } from "./service/task-service/interface";
import { onFormSubmit } from "./util/notification";
import { getErrorMessage } from "./util/util";
import { Board } from "./components/Board/Board";
import { AppContext } from "./context/AppContext";

const App = () => {
  const context = useContext(AppContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskList, setTaskList] = useState<ITask[]>([]);

  useEffect(() => {
    const getTaskList = async () => {
      try {
        const response = await ServiceFactory.getInstance()
          .getTaskService()
          .getAll();
        if (!Array.isArray(response)) {
          setTaskList([]);
          return;
        }
        setTaskList(response);
      } catch (error) {
        setTaskList([]);
      }
    };
    getTaskList();
  }, []);

  const handleCreate = async (formValues: ITaskAddResource) => {
    setIsSubmitting(true);
    try {
      const response = await ServiceFactory.getInstance()
        .getTaskService()
        .createTask(formValues);
      if (!response) {
        onFormSubmit("ERROR", getErrorMessage());
        return;
      }
      onFormSubmit("SUCCESS", response.message);
      context?.setVisibleTaskModal(false);
    } catch (error) {
      onFormSubmit("ERROR", getErrorMessage(error));
    }
    setIsSubmitting(false);
  };

  return (
    <React.Fragment>
      <Header />
      <Board taskList={taskList} />
      {context?.visibleTaskModal && (
        <TaskModal
          visible={context?.visibleTaskModal}
          onCancel={() => context.setVisibleTaskModal(false)}
          onCreate={handleCreate}
          isSubmitting={isSubmitting}
        />
      )}
    </React.Fragment>
  );
};

export default App;
