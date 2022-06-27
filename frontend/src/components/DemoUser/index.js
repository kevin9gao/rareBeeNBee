import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";


function DemoUser() {
  const dispatch = useDispatch();

  const handleDemoUser = (e) => {
    e.preventDefault();

    const credential = 'Demo-lition';
    const password = 'password';

    dispatch(sessionActions.login({ credential, password }));
  }

  return (
    <button onClick={handleDemoUser}>Demo User</button>
  )
}

export default DemoUser;
