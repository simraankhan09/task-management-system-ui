import React, { FC, memo } from "react";
import { Switch, Button } from "antd";
import { SkinOutlined, BulbOutlined } from "@ant-design/icons";

import "./Header.scss";

interface HeaderProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: FC<HeaderProps> = memo(({ setVisible }) => {
  const handleThemeChange = () => {
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  return (
    <div className="header-container">
      <div className="header-wrapper">
        <div className="title">TMS</div>

        <div className="header-btns">
          <Switch
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<SkinOutlined />}
            onChange={handleThemeChange}
            title="Change theme"
          />
          <Button type="primary" size="small" onClick={() => setVisible(true)}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
});
