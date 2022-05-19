const { User, Order } = require("../db")
const db_mock_data = require("../../db_mock_data.json") //DATA MOCK

const getAllOrders = async () => {
  try {
    db_mock_data.orders.forEach(async (order) => {
      const newProduct = await Order.findOrCreate({
        where: {
          cart_list: order.cart_list,
          products_id: order.products_id,
          total_purchase: order.total_purchase,
          receiver_phone: order.receiver_phone,
          state: order.state,
          city: order.city,
          shipping_address: order.shipping_address,
          zip_code: order.zip_code,
          status: order.status,
          user_id: order.user_id,
        },
      })
    })

    const ordersDb = await Order.findAll({
      include: User,
    })

    return ordersDb
  } catch (error) {
    console.log(error)
  }
}

const getOrderById = async (id) => {
  try {
    const newProduct = await Order.findByPk(id, { include: User })
    return newProduct
  } catch (error) {
    console.log(error)
  }
}

const postOrder = async (body) => {
  try {
    const {
      cart_list,
      products_id,
      total_purchase,
      receiver_phone,
      state,
      city,
      shipping_address,
      zip_code,
      status,
      user_id,
    } = body

    let orderCreated = await Order.findOrCreate({
      where: {
        cart_list,
        products_id,
        total_purchase,
        receiver_phone,
        state,
        city,
        shipping_address,
        zip_code,
        status,
        user_id,
      },
    })
    return orderCreated
  } catch (error) {
    console.log(error)
  }
}

const updateOrder = async (idOrder, body) => {
  const {
    cart_list,
    products_id,
    total_purchase,
    receiver_phone,
    state,
    city,
    shipping_address,
    zip_code,
    status,
  } = body

  const selected = await Order.findByPk(idOrder)
  selected.set({
    cart_list,
    products_id,
    total_purchase,
    receiver_phone,
    state,
    city,
    shipping_address,
    zip_code,
    status,
  })
  await selected.save()

  return selected
}

module.exports = {
  getAllOrders,
  getOrderById,
  postOrder,
  updateOrder,
}
