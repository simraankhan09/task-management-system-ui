import React, { useState } from "react";
import { Header } from "./components/Header/Header";
import { TaskModal } from "./components/TaskModal/TaskModal";

const App = () => {
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);

  return (
    <React.Fragment>
      <Header setVisible={setVisibleCreateModal} />
      {visibleCreateModal && (
        <TaskModal
          visible={visibleCreateModal}
          onCancel={() => setVisibleCreateModal(false)}
        />
      )}
    </React.Fragment>
  );
};

export default App;
