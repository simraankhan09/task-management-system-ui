import { memo, useContext } from "react";
import { Switch, Button } from "antd";
import { FaRegMoon, FaSun } from "react-icons/fa6";

import "./Header.scss";
import { AppContext } from "../../context/AppContext";

export const Header = memo(() => {
  const context = useContext(AppContext);

  const handleThemeChange = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  return (
    <div className="header-container">
      <div className="header-wrapper">
        <div className="title">TMS</div>

        <div className="header-btns">
          <Switch
            checkedChildren={<FaRegMoon />}
            unCheckedChildren={<FaSun />}
            onChange={handleThemeChange}
            title="Change theme"
          />
          <Button
            type="primary"
            size="small"
            onClick={() => {
              context?.setTask(undefined);
              context?.setVisibleTaskModal(true);
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
});
