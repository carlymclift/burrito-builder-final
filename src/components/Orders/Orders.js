import React from 'react';
import './Orders.css';
const shortid = require('shortid');

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div className="order" key={shortid.generate()}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={shortid.generate()}>{ingredient}</li>
          })}
        </ul>
        <button onClick={() => props.removeOrder(order.id)}>Delete</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;