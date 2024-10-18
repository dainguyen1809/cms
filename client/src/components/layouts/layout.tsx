import { Outlet } from 'react-router-dom';
import Header from './header';

import { fetchUser } from '@/services/AuthServices';

// hooks
import { useEffect } from 'react';

// context
// import { useToast } from "../../context/ToastContext"

// redux toolkit
import { RootState } from '../../redux/store';
import { clearToast } from '../../redux/slice/toastSlice';
import {
  //  UseSelector,
  useDispatch,
  useSelector,
} from 'react-redux';

// helpers
import {
  reduxShowNotify,
  //  showNotify
} from '../../helpers/notify';

const Layout = () => {
  // context
  // const {message, type, setMessage} = useToast();

  // redux
  const { message, type } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();
  // context
  // useEffect(() => {
  //   showNotify(message, type, setMessage);
  // }, [message, type, setMessage]);

  // redux
  useEffect(() => {
    reduxShowNotify(message, type);
    dispatch(clearToast());
  }, [message, type]);

  useEffect(() => {
    fetchUser();
  });

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
