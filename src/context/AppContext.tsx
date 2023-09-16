import { createContext, useState } from "react";
import { ITask } from "../service/task-service/interface";

interface IAppContext {
  visibleTaskModal: boolean;
  setVisibleTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  task?: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask | undefined>>;
  triggerApi: number;
  setTriggerApi: React.Dispatch<React.SetStateAction<number>>;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = (props: any) => {
  const [visibleTaskModal, setVisibleTaskModal] = useState(false);
  const [task, setTask] = useState<ITask>();
  const [triggerApi, setTriggerApi] = useState(0);
  return (
    <AppContext.Provider
      value={{
        visibleTaskModal,
        setVisibleTaskModal,
        task,
        setTask,
        triggerApi,
        setTriggerApi,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
