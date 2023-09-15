import { notification } from "antd";

export const onFormSubmit = (type: "SUCCESS" | "ERROR", message: string) => {
  if (type === "SUCCESS") {
    notification.success({
      message: "Message",
      type: "success",
      description: message,
      duration: 5,
      placement: "bottomLeft",
    });
    return;
  }

  notification.error({
    message: "Message",
    type: "success",
    description: message,
    duration: 5,
    placement: "bottomLeft",
  });
};
