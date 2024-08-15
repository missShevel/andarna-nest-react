import { Table } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useEffect, useState } from 'react';
import { getAllTransactions } from '../features/transactions/transactionSlice';
import { auth } from '../firebase';
import { User } from 'firebase/auth';

const EditableTable = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading: isUserLoading } = useAppSelector(
    (state) => state.user
  );
  const firebaseUser = auth.currentUser as User;
  useEffect(() => {
    if (user) {
      dispatch(getAllTransactions(firebaseUser));
    }
    setLoading(false);
  }, []);
  const { transactions, isLoading: isTransactionLoading } = useAppSelector(
    (state) => state.transaction
  );
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Ticker',
      dataIndex: 'ticker',
      key: 'ticker',
    },
    {
      title: 'Issuer',
      dataIndex: 'issuer',
      key: 'issuer',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Buy price',
      dataIndex: 'buyPrice',
      key: 'buyPrice',
    },
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
  ];

  if (isTransactionLoading || isUserLoading || loading) {
    return <div>Loading...</div>;
  }
  return <Table dataSource={transactions} columns={columns} />;
};

export default EditableTable;
