import { createContext, useState } from "react";
import { ITask } from "../service/task-service/interface";

interface IAppContext {
  visibleTaskModal: boolean;
  setVisibleTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  task?: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask | undefined>>;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = (props: any) => {
  const [visibleTaskModal, setVisibleTaskModal] = useState(false);
  const [task, setTask] = useState<ITask>();
  return (
    <AppContext.Provider
      value={{ visibleTaskModal, setVisibleTaskModal, task, setTask }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
