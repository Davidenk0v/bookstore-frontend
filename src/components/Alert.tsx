import { MessageType } from "../models/message";
import messageFactory from "../utils/alertFactory";

interface Props {
  message: string;
  type: MessageType;
}

export const Alert: React.FC<Props> = ({ message, type }) => {
  const { defaultText, color, icon } = messageFactory(type);
  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm text-${color}-800 border border-${color}-300 rounded-lg bg-${color}-50 `}
      role="alert"
    >
      {icon}
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{message || defaultText}</span>
      </div>
    </div>
  );
};
