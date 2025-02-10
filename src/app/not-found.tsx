import MessageBox from '../components/message-box.tsx';
import { NavLink } from 'react-router';

function NotFound() {
  return (
    <MessageBox
      message={
        <>
          NOT FOUND |{' '}
          <NavLink to="/" className="link">
            GO HOME
          </NavLink>
        </>
      }
    />
  );
}

export default NotFound;
