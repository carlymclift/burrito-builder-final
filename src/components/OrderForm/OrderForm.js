import React, { Component } from 'react';
import PropTypes from 'prop-types'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    let currentIngredients = this.state.ingredients

    let num = currentIngredients.reduce((acc, ingredient) => {
      if(ingredient === e.target.name) {
        acc++
      }
      return acc 
    }, 0)
    console.log(num)
    if(num < 2) {
      currentIngredients.push(e.target.name)
      this.setState({ ingredients: currentIngredients })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name && this.state.ingredients.length > 0 ) {
      this.props.updateOrders(this.state.name, this.state.ingredients)
    } 
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    })

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

OrderForm.propTypes = {
  updateOrders: PropTypes.func
}

export default OrderForm;
