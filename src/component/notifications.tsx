import { NotificationData, showNotification } from "@mantine/notifications";
import { CheckCircle, Info, XCircle } from "@phosphor-icons/react";
import { color } from "../common/constants/color";

const notification = {
  info: (props: NotificationData) => {
    return showNotification({
      ...props,
      icon: <Info size={40}/>,
      styles: {
        root: { backgroundColor: color.information1 },
        description: { color: color.information2 },
        icon: {
          color: color.information2,
          backgroundColor: "transparent",
        },
      },
      title: props.title,
      message: props.message,
    });
  },

  success: (props: NotificationData) => {
    return showNotification({
      ...props,
      icon: <CheckCircle size={40}/>,
      styles: {
        root: { backgroundColor: color.statusPositive1 },
        description: { color: color.statusPositive5 },
        icon: {
          color: color.statusPositive5,
          backgroundColor: "transparent",
        },
      },
      title: props.title,
      message: props.message,
    });
  },

  error: (props: NotificationData) => {
    return showNotification({
      ...props,
      icon: <XCircle size={40}/>,
      styles: {
        root: { backgroundColor: color.statusNegative1 },
        description: { color: color.statusNegative5 },
        icon: {
          color: color.statusNegative5,
          backgroundColor: "transparent",
        },
      },
      title: props.title,
      message: props.message,
    })
  }
};

export default notification;
