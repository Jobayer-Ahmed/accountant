import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { categoriesSelector, eventsSelector, walletsSelector } from '../../selectors/index';
import { EXPENSE, INCOME, LDRD } from '../../constants/terms';
import uuid from 'uuid';
import { bindActionCreators } from 'redux';
import { addTransaction } from '../../actions/transactionActionCreators';

class AddTransaction extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    wallets: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    addTransaction: PropTypes.func.isRequired
  };

  state = { type: EXPENSE };

  renderCategory = (category) => {
    return (
      <option value={category.id} key={category.id}>
        { category.name }
      </option>
    )
  };

  renderEvent = (event) => {
    return (
      <option value={event.id} key={event.id}>
        { event.name }
      </option>
    )
  };

  renderWallet = (wallet) => {
    return (
      <option value={wallet.id} key={wallet.id}>
        { wallet.name }
      </option>
    )
  };

  handleAdd = () => {
    const amount = this.amount.value;
    const remarks = this.remarks.value;
    const walletId = this.walletId.value;
    const categoryId = this.category.value;
    const eventId = this.eventId.value;

    const transaction = {
      id: uuid(),
      date: new Date(),
      eventId,
      walletId,
      categoryId,
      remarks,
      amount,
    };

    this.props.addTransaction(transaction);
  };

  handleTypeChange = (event) => this.setState({ type: event.target.value });

  render() {
    const { categories, wallets, events } = this.props;
    const { type } = this.state;

    return (
      <div className="AddTransaction">
        <h3>Add new transaction</h3>
        <div className="form">
          <div className="form-group">
            <select  ref={n => this.walletId = n} className="form-control">
              { wallets.map(this.renderWallet) }
            </select>
          </div>

          <div className="form-group">
            <select  ref={n => this.eventId = n} className="form-control">
              { events.map(this.renderEvent) }
            </select>
          </div>

          <div className="form-group">
            <select name="type" onChange={this.handleTypeChange} className="form-control">
              <option value={EXPENSE}>{EXPENSE}</option>
              <option value={LDRD}>LOAN & DEBT</option>
              <option value={INCOME}>{INCOME}</option>
            </select>
          </div>

          <div className="form-group">
            <input type="number"  ref={n => this.amount = n} className="form-control" />
          </div>

          <div className="form-group">
            <textarea ref={n => this.remarks = n} className="form-control" />
          </div>

          <div className="form-group">
            <select name="category" ref={n => this.category = n} className="form-control">
              { categories[type].map(this.renderCategory) }
            </select>
          </div>
        </div>

        <button className="btn btn-block" onClick={this.handleAdd}>Add</button>
      </div>
    );
  }
}

export default connect(state => ({
  categories: categoriesSelector(state),
  wallets: walletsSelector(state),
  events: eventsSelector(state),
}), bindActionCreators.bind(null, {
  addTransaction
}))(AddTransaction);
