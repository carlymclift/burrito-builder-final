import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderForm from './OrderForm';
import '@testing-library/jest-dom'

describe('OrderForm', () => {
  it('Should render content, including a form', () => {
    let mockFun = jest.fn()

    render(
      <OrderForm 
        updateOrders={mockFun}
      />)  

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(13)
  })
  
  it('Should have an input that holds its value when interacted with', () => {
    let mockFun = jest.fn()

    const setup = () => {
      const utils = render(
        <OrderForm 
          updateOrders={mockFun}
        />) 
        
      const input = utils.getByPlaceholderText('Name')
      return {
        input,
        ...utils,
      }
    }  
    const { input } = setup()
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'Carly' } })
    expect(input.value).toBe('Carly')
  });
  
  it('Should NOT be able to submit form without info', () => {
      const mockFun = jest.fn()  
      render(
        <OrderForm 
          updateOrders={mockFun}
        />)
  
      const button = screen.getByRole('button', {name: 'Submit Order'})
      fireEvent.click(button)  
      expect(mockFun).toBeCalledTimes(0)
  })

  it('Should be able to submit form with necessary info', () => {
    const mockFun = jest.fn()  
    const setup = () => {
        const utils = render(
          <OrderForm 
            updateOrders={mockFun}
          />) 
          
        const input = utils.getByPlaceholderText('Name')
        return {
          input,
          ...utils,
        }
      }  
      const { input } = setup()
      expect(input.value).toBe('')
      fireEvent.click(screen.getByRole('button', { name: 'beans' }))
      fireEvent.click(screen.getByRole('button', { name: 'Submit Order' }))

      expect(mockFun).toBeCalledTimes(0)

      fireEvent.change(input, { target: { value: 'Carly' } })
      expect(input.value).toBe('Carly')

      fireEvent.click(screen.getByRole('button', { name: 'beans' }))
      fireEvent.click(screen.getByRole('button', { name: 'Submit Order' }))
      expect(mockFun).toBeCalledTimes(1)
  })

  // Attempted test, didn't get it working in time
//   it('Should display the order when a button is clicked', () => {
//     const mockFun = jest.fn()  
//     render(
//       <OrderForm 
//         updateOrders={mockFun}
//       />)  
    
//     expect(screen.getAllByText(/order: nothing selected/i)).toBeInTheDocument()
//     fireEvent.click(screen.getByRole('button', { name: 'beans' }))
//     expect(screen.getAllByText(/order: beans/i)).toBeInTheDocument()
     
//   })
})