import { useEffect } from 'react';
import './App.css';
import { HomePage } from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountId } from './redux/account/accountAction';

function App() {

  const dispatch = useDispatch();
  const { accountId, status, error } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchAccountId());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && accountId) {
      console.log("Account ID:", accountId);
    } else if (status === "failed") {
      console.error("Failed to fetch account ID:", error);
    }
  }, [status, accountId, error]);

  return (
    <HomePage />
  );
}
export default App;
