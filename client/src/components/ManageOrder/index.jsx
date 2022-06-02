import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {
  updateOrder,
  statusFilter,
  getOrdersFromDb,
} from "../../redux/actions";

function ManageOrder() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.ordersDb);
  orders.sort((a, b) => {
    return a.id - b.id;
  });

  const [ordersShow, setOrdersShow] = useState(orders);
  const [copyOrdersShow, setCopyOrdersShow] = useState(orders);
  const [viewModal, setViewModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [orderSelected, setOrderSelected] = useState({
    id: "",
    cart_list: [],
    products_id: [],
    total_purchase: 0,
    receiver_phone: 0,
    createdAt: "",
    updatedAt: "",
    user: {
      id: "",
      fullName: "",
      password: "",
      email: "",
      id_document: "",
      role: "",
      image: "",
    },
    payment_id: "",
    status: "",
    user_id: "",
    state: "",
    city: "",
    shipping_address: "",
    zip_code: "",
  });

  const viewOrder = (order) => {
    setOrderSelected(order);
    setViewModal(true);
    setStatusModal(false);
  };

  const changeStatus = (order) => {
    if (!statusModal) {
      setOrderSelected(order);
      setViewModal(false);
      setStatusModal(true);
    } else {
      if (!(orderSelected.status === "none")) {
        var newData = ordersShow;
        newData.map((o) => {
          if (o.id === orderSelected.id) {
            o.status = orderSelected.status;
          }
        });
        setOrdersShow(newData);
        dispatch(updateOrder(orderSelected));
      }
      setStatusModal(false);
    }
  };

  const handleStatus = (event) => {
    setOrderSelected({
      ...orderSelected,
      status: event.target.value,
    });
  };

  const searchBar = (event) => {
    const { value } = event.target;
    if (value === "none") {
      setOrdersShow(copyOrdersShow);
    } else {
      setOrdersShow(copyOrdersShow.filter((or) => or.status === value));
    }
  };

  return (
    <div className="manageOrdersContainer">
      <div class="mb-3">
        <label class="form-label buscar">Filter by state</label>
        <select
          class="form-select"
          onChange={(event) => {
            searchBar(event);
          }}
          name="newStatus"
        >
          <option value="none">All</option>
          <option value="attempted">Attempted</option>
          <option value="active">Active</option>
          <option value="dispatched">Dispatched</option>
          <option value="complete">Complete</option>
        </select>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th className="center" scope="col">
              ID
            </th>
            <th className="center" scope="col">
              Payment ID
            </th>
            <th className="center" scope="col">
              Created
            </th>
            <th className="center" scope="col">
              Updated
            </th>
            <th className="center" scope="col">
              State
            </th>
            <th className="center" scope="col">
              See
            </th>
            <th className="center" scope="col">
              Option
            </th>
          </tr>
        </thead>
        <tbody>
          {ordersShow?.map((order) => {
            return (
              <tr key={order?.id}>
                <th className="center" scope="col">
                  {order?.id}
                </th>
                <td className="center">
                  {order?.payment_id ? order.payment_id : "No hay"}
                </td>
                <td className="center">{order?.createdAt}</td>
                <td className="center">{order?.updatedAt}</td>
                <td className="center">{order?.status}</td>
                <td className="center">
                  <button
                    className="btn"
                    onClick={() => {
                      viewOrder(order);
                    }}
                  >
                    ➡
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      changeStatus(order);
                    }}
                  >
                    Change status
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal isOpen={viewModal}>
        <ModalHeader>
          <h3>Order #{orderSelected?.id}</h3>
        </ModalHeader>
        <ModalBody>
          <h3>Customer info:</h3>
          <span>
            <strong>Customer name:</strong> {orderSelected?.user.fullName}
          </span>
          <br />
          <span>
            <strong>Customer ID:</strong> {orderSelected?.user.id_document}
          </span>
          <br />
          <span>
            <strong>Customer e-mail:</strong> {orderSelected?.user.email}
          </span>
          <br />
          <hr size="2px" color="black" />
          <h3>Shipping info:</h3>
          <span>
            <strong>City:</strong> {orderSelected?.city}
          </span>
          <br />
          <span>
            <strong>State:</strong> {orderSelected?.state}
          </span>
          <br />
          <span>
            <strong>Shipping address:</strong> {orderSelected?.shipping_address}
          </span>
          <br />
          <span>
            <strong>Zip code:</strong> {orderSelected?.zip_code}
          </span>
          <br />
          <span>
            <strong>Shipping phone:</strong> {orderSelected?.receiver_phone}
          </span>
          <br />
          <hr size="2px" color="black" />
          <h3>Purchase info:</h3>
          <span>
            <strong>Purchase Date:</strong> {orderSelected?.createdAt}
          </span>
          <br />
          <span>
            <strong>Total Amount:</strong> {orderSelected?.total_purchase}
          </span>
          <br />
          <hr size="2px" color="black" />
          <h3>Product:</h3>
          <table class="table table-striped">
            <thead>
              <tr>
                <td>Product Id</td>
                <td>Product name</td>
                <td>Quantity</td>
                <td>Product value</td>
              </tr>
            </thead>
            <tbody>
              {orderSelected?.cart_list.map((item) => {
                return (
                  <tr>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[3]}</td>
                    <td>{item[2]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary"
            onClick={() => {
              setViewModal(false);
            }}
          >
            Ok
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              setViewModal(false);
            }}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={statusModal}>
        <ModalHeader>Change order state #{orderSelected.id}</ModalHeader>
        <ModalBody>
          {ordersShow?.map((order) => {
            if (order.id === orderSelected.id) {
              return <span key={order.id}>Current State {order.status}</span>;
            }
          })}
          <select
            className="form-select"
            onClick={(event) => {
              handleStatus(event);
            }}
            name="newStatus"
          >
            <option>Status...</option>
            <option value="attempted">Attempted</option>
            <option value="active">Active</option>
            <option value="dispatched">Dispatched</option>
            <option value="complete">Complete</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary"
            onClick={() => {
              changeStatus();
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              setStatusModal(false);
            }}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ManageOrder;
