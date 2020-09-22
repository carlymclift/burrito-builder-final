import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Orders from './Orders';
import '@testing-library/jest-dom'

describe('OrderForm', () => {
  it('Should render content, including a form', () => {
    const mockFun = jest.fn()
    const orders = [
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

    render(
      <Orders 
        removeOrder={mockFun}
        orders={orders}
      />)  

    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Pat' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Jim' })).toBeInTheDocument()
  })

  it('Should fire a method when delete is clicked', () => {
    const mockFun = jest.fn()
    const orders = [
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

    render(
      <Orders 
        removeOrder={mockFun}
        orders={orders}
      />)  
      const deleteButtons = screen.getAllByRole('button')
      const clickedButton = deleteButtons[0]
      fireEvent.click(clickedButton)
      expect(mockFun).toBeCalledTimes(1)
  })
})