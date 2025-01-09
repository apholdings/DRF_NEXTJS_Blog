import Footer from '@/features/footer';
import Navbar from '@/features/navbar';
import { loadProfile, loadUser } from '@/redux/actions/auth/actions';
import { RootState } from '@/redux/reducers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
      dispatch(loadProfile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
