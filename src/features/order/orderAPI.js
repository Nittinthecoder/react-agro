export function createOrder(order) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8080/orders',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    const  data = await response.json()
    resolve({data})
  }
  );
}

export function fetchAllOrders(pagination) {
  let queryString = '';
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders?'+queryString) 
    const data = await response.json()
    const orders = data.data;
    const totalOrders = data.items;
    resolve({data: {order:orders, totalOrders:+totalOrders}})
  }
  );
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders/'+order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}