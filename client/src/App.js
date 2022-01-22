import React from 'react';
import axios from 'axios';
import ListScreen from './components/ListScreen';
import MaintenanceScreen from './components/MaintenanceScreen';

const api = axios.create({ baseURL: 'api' });
const RESOURCE = '/transaction';

const PERIODS = [
  '2021-01',
  '2021-02',
  '2021-03',
  '2021-04',
  '2021-05',
  '2021-06',
  '2021-07',
  '2021-08',
  '2021-09',
  '2021-10',
  '2021-11',
  '2021-12',
  '2020-01',
  '2020-02',
  '2020-03',
  '2020-04',
  '2020-05',
  '2020-06',
  '2020-07',
  '2020-08',
  '2020-09',
  '2020-10',
  '2020-11',
  '2020-12',
  '2022-01',
  '2022-02',
  '2022-03',
  '2022-04',
  '2022-05',
  '2022-06',
  '2022-07',
  '2022-08',
  '2022-09',
  '2022-10',
  '2022-11',
  '2022-12',
];

const LIST_SCREEN = 0;
const MAINTENANCE_SCREEN = 1;

// App fc Trpr
// useEffect 1

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  const [currentScreen, setCurrentScreen] = React.useState(LIST_SCREEN);
  const [filteredText, setFilteredText] = React.useState('');
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [newTransaction, setNewTransaction] = React.useState(false);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get(`/transaction?period=${currentPeriod}`);

      setTransactions(data.transactions);
    };

    fetchTransactions();
  }, [currentPeriod]);

  React.useEffect(() => {
    let newFilteredTransactions = [...transactions];

    if (filteredText.trim() !== '') {
      newFilteredTransactions = newFilteredTransactions.filter(
        (transaction) => {
          return transaction.description.toLowerCase().includes(filteredText);
        }
      );
    }

    setFilteredTransactions(newFilteredTransactions);
  }, [transactions, filteredText]);

  React.useEffect(() => {
    const newScreen =
      selectedTransaction !== null || newTransaction
        ? MAINTENANCE_SCREEN
        : LIST_SCREEN;

    setCurrentScreen(newScreen);
  }, [selectedTransaction, newTransaction]);

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  };

  const handleDeleteTransaction = async (event) => {
    const id = event.target.id;

    await api.delete(`${RESOURCE}/${id}`);

    const newTransactions = transactions.filter((transaction) => {
      return transaction._id !== id;
    });

    setTransactions(newTransactions);
  };

  const handleEditTransaction = async (event) => {
    const id = event.target.id;

    const newSelectedTransaction = filteredTransactions.find((transaction) => {
      return transaction._id === id;
    });

    setSelectedTransaction(newSelectedTransaction);
  };

  const handleNewTransaction = async () => {
    setNewTransaction(true);
  };

  const handleFilterChange = (event) => {
    const text = event.target.value.trim();
    setFilteredText(text.toLowerCase());
  };

  const handleCancelMaintenance = () => {
    setNewTransaction(false);
    setSelectedTransaction(null);
  };

  const handleSaveMaintenance = async (newTransaction) => {
    console.log(newTransaction);
    const { _id } = newTransaction;

    if (!_id) {
      const insertedTransaction = {
        ...newTransaction,
        year: Number(newTransaction.yearMonthDay.substring(0, 4)),
        month: Number(newTransaction.yearMonthDay.substring(5, 7)),
        day: Number(newTransaction.yearMonthDay.substring(8, 10)),
      };

      const { data } = await api.post(`${RESOURCE}`, insertedTransaction);

      const newTransactions = [...transactions, data.transaction];
      newTransactions.sort((a, b) =>
        a.yearMonthDay.localeCompare(b.yearMonthDay)
      );

      setTransactions(newTransactions);
      setNewTransaction(false);
    } else {
      const editedTransaction = {
        ...newTransaction,
        year: Number(newTransaction.yearMonthDay.substring(0, 4)),
        month: Number(newTransaction.yearMonthDay.substring(5, 7)),
        day: Number(newTransaction.yearMonthDay.substring(8, 10)),
      };

      await api.put(`${RESOURCE}/${_id}`, editedTransaction);

      const newTransactions = [...transactions];
      const index = newTransactions.findIndex((transaction) => {
        return transaction._id === editedTransaction._id;
      });
      newTransactions[index] = editedTransaction;

      setTransactions(newTransactions);
      setSelectedTransaction(null);
    }
  };

  return (
    <div className='container'>
      <h1 className='center'>Finances</h1>

      {currentScreen === LIST_SCREEN ? (
        <ListScreen
          transactions={filteredTransactions}
          periods={PERIODS}
          currentPeriod={currentPeriod}
          filteredText={filteredText}
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={handleEditTransaction}
          onNewTransaction={handleNewTransaction}
          onFilterChange={handleFilterChange}
          onPeriodChange={handlePeriodChange}
        />
      ) : (
        <MaintenanceScreen
          transaction={selectedTransaction}
          onCancel={handleCancelMaintenance}
          onSave={handleSaveMaintenance}
        />
      )}
    </div>
  );
}
