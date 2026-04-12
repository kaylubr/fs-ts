import { Alert } from "@mui/material";

interface ErrorNotificationProps {
  message: string | null
}

const ErrorNotification = ({ message }: ErrorNotificationProps) => {
  if (!message) return null;

  return (
    <Alert severity="error" sx={{ marginBottom: 2 }}>
      {message}
    </Alert>
  );
};

export default ErrorNotification;