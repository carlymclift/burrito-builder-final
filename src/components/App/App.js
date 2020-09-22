import React, { Component } from 'react';
import './App.css';
import { getOrders, addOrder } from '../../apiCalls';
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
      console.log(orders)
      this.setState({ orders: orders.orders })
    } catch (error) {
      this.setState({ error: '' })
    }
  }

  updateOrders = async (name, ingredients) => {
    try {
      const postOrder = await addOrder(name, ingredients)
      console.log(postOrder)
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

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
