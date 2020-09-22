import React, { Component } from 'react';
import './App.css';
import { getOrders, addOrder, removeOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      orders: [],
      error: ''
    }
  }

  async componentDidMount() {
    try {
      const orders = await getOrders()
      this.setState({ orders: orders.orders })
    } catch (error) {
      this.setState({ error: '' })
    }
  }

  updateOrders = async (name, ingredients) => {
    try {
      await addOrder(name, ingredients)
      const orders = await getOrders()
      this.setState({ orders: orders.orders })
    } catch (error) {
      this.setState({ error: '' })
    }
  }

  removeOrder = async (orderId) => {
    try {
      await removeOrder(orderId)
      const orders = await getOrders()
      this.setState({ orders: orders.orders })
    } catch (error) {
      this.setState({ error: '' })
    }
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm updateOrders={this.updateOrders}/>
        </header>

        <Orders orders={this.state.orders} removeOrder={this.removeOrder} />
      </main>
    );
  }
}


export default App;
