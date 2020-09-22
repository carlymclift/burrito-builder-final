export const getOrders = async () => {
  const response = await fetch('http://localhost:3001/api/v1/orders')
  const data = await response.json()
  return data
}

export const addOrder = async (name, ingredients) => {
  const response = await fetch(`http://localhost:3001/api/v1/orders`, {
      "method": "POST",
      "headers": {
          "content-type": "application/json"
      },
      "body": JSON.stringify({
        "name": name,
        "ingredients": ingredients
      })
    }
  )
  const message = await response.json()
  return message
}

export const removeOrder = async (orderId) => {
  const response = await fetch(`http://localhost:3001/api/v1/orders/${orderId}`, {
    "method": "DELETE"
  })
  const message = await response
  return message
}