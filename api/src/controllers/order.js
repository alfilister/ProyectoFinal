const { User, Order } = require("../db");
const db_mock_data = require("../../db_mock_data.json"); //DATA MOCK

const getAllOrders = async () => {
  db_mock_data.orders.forEach(async (order) => {
    await Order.findOrCreate({
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
    });
  });

  Order.findAll().then((orders) => {
    orders.forEach((order) => {
      console.log(order.dataValues.cart_list);
    });
  });

  const ordersDb = await Order.findAll({
    include: User,
  });

  return ordersDb;
};

const getOrderById = async (id) => {
  try {
    const newProduct = await Order.findByPk(id, { include: User });
    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

const postOrder = async (body) => {
  try {
    const {
      cart_list, // LA INFORMACIÓN DEBE VENIR EN UN ARRAY QUE CONTENGA UN ARRAY POR CADA ITEM A INCLUIR EN LA ORDEN, CADA ARRAY DE ITEM DEBE TENER LA SIGUIENTE ESTRUCTURA = 4 ELEMENTOS= (IDproducto, NOMBREproducto, PRECIOproducto, CANTIDADEScompra)
      products_id, // UN ÚNICO ARRAY CON LOS NÚMEROS DE ID DE LOS PRODUCTOS CONTENIDOS EN LA ORDEN
      total_purchase,
      receiver_phone,
      state,
      city,
      shipping_address,
      zip_code,
      status,
      user_id,
    } = body;

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
    });
    return orderCreated;
  } catch (error) {
    console.log(error);
  }
};

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
    payment_id,
  } = body;

  const selected = await Order.findByPk(idOrder);
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
    payment_id,
  });
  await selected.save();

  return selected;
};

module.exports = {
  getAllOrders,
  getOrderById,
  postOrder,
  updateOrder,
};
