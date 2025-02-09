interface MessageBoxProps {
  message: string;
}

function MessageBox({ message }: MessageBoxProps) {
  return (
    <div className="data-report">
      <p>[{message}]</p>
    </div>
  );
}

export default MessageBox;
