import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllOrders } from "../../utilities/users-service";

export default function Orders({ updateFirstSearch }) {
  const [user, setUser] = useState(getUser);
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  function handleSearch(searchInput) {
    updateFirstSearch(searchInput);
    navigate(`/search?q=${searchInput}`);
  }

  const getUserOrders = async () => {
    try {
      const userOrders = await getAllOrders();
      console.log(userOrders);
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <NavBar user={user} setUser={setUser} handleSearch={handleSearch} />
      <p className="text-white text-3xl my-2 mx-5">My Orders</p>
      <div className="overflow-x-auto">
        <table className="table text-center border-white border text-white my-2 mx-5 max-w-fit">
          {/* head */}
          <thead>
            <tr className="border border-white text-white text-base">
              <th>No.</th>
              <th>Order Id</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total Qty</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
              {orders?.map((order, index) => (
                <tr className="hover border border-white" key={order._id} >
                  <th>{index + 1}</th>
                  <td>{order.orderId}</td>
                  <td>{formatDate(order.updatedAt)}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.totalQty}</td>
                  <td>${order.orderTotal.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
