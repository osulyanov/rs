import { ReactNode } from 'react';

interface MessageBoxProps {
  message: string | ReactNode;
}

function MessageBox({ message }: MessageBoxProps) {
  return (
    <div className="message-box">
      <p>[{message}]</p>
    </div>
  );
}

export default MessageBox;
