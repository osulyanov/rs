import MessageBox from '@components/message-box';
import Link from 'next/link';

export default function NotFound() {
  return (
    <MessageBox
      message={
        <>
          NOT FOUND |{' '}
          <Link href="/" className="link">
            GO HOME
          </Link>
        </>
      }
    />
  );
}
