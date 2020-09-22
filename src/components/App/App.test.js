import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { getOrders, addOrder } from '../../apiCalls';
import '@testing-library/jest-dom'
jest.mock('../../apiCalls');

describe('OrderForm', () => {
  it('Should render content', () => {
    render(<App />)  

    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(13)
  })
  
  it('Should get orders from the server on load', async () => {
    getOrders.mockResolvedValue({
      orders: [
        {
        id: 1,
        ingredients: ['beans', 'lettuce', 'carnitas'],
        name: 'Pat'
        },
        {
        id: 1,
        ingredients: ['beans', 'lettuce', 'steak'],
        name: 'Jim'
        },
      ]
    })

    render(<App />) 
    
    const nameOnOrder = await waitFor( () => screen.getByText('Pat'))

    expect(screen.getByRole('heading', { name: /burrito builder/i })).toBeInTheDocument()
    expect(nameOnOrder).toBeInTheDocument()
  });
  
  it('Should be able to add a new order', async () => {
      getOrders.mockResolvedValue({
        orders: []
      })

      addOrder.mockResolvedValue({
        orders: [
          {
            id: 1,
            ingredients: ['beans', 'lettuce', 'steak'],
            name: 'Dracula'
          }
        ]
      })

      getOrders.mockResolvedValue({
        orders: [
            {
              id: 1,
              ingredients: ['beans', 'lettuce', 'steak'],
              name: 'Dracula'
            }
          ]
      })

    render(<App />)  

      const inputValue = screen.getByPlaceholderText('Name')
      const button = screen.getByRole('button', { name: 'beans' })

      fireEvent.change(inputValue, {target: { value: 'Dracula' }})
      fireEvent.click(button)

      const nameOnOrder = await waitFor( () => screen.getByText('Dracula'))
      expect(nameOnOrder).toBeInTheDocument()
  })

  
})