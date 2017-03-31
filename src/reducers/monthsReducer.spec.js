import moment from 'moment';
import state from '../store/state.stub';
import monthsReducer from './monthsReducer';
import { addTransaction } from '../actions/transactionActionCreators';

test('monthsReducer', () => {
  const transaction = { id: 'test', date: moment('2017/04/01', 'YYYY/MM/DD') };
  const months = monthsReducer(state.months, addTransaction(transaction));

  expect(months['2017/04'].transactions.includes(transaction.id)).toEqual(true);
});