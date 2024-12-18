import { useSelector } from 'react-redux';
import { RootState } from '../../src/redux/store';


export const useCurrentUser = ()  => {
  const currentUser = useSelector((state: RootState) => state.auth?.currentUser);
  const user = currentUser?.user; 
  return user
};
