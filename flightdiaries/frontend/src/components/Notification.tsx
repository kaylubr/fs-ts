interface NotificationProps {
  message: string;
}

const Notification = ({ message }: NotificationProps) => {
  return <h5 id="notification-message">{message}</h5>
}

export default Notification