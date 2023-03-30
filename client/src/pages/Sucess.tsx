import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import useCreateOrder from "../hooks/useCreateOrder";
import { Link } from "react-router-dom";

interface RootState {
  login: {
    user: {
      _id: string;
    };
    accessToken: string;
  };
}

interface Product {
  _id: string;
  _quantity: number;
}

const Success = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state.stripeData);
  const [cart, setCart] = useState(location.state.products);
  const currentUser = useSelector((state: RootState) => state.login.user);
  const [orderId, setOrderId] = useState(null);

  useCreateOrder(async () => { // Use the custom hook here
    try {
      const res = await userRequest.post("/orders", {
        userId: currentUser._id,
        products: cart.products.map((item: Product) => ({
          productId: item._id,
          quantity: item._quantity,
        })),
        amount: cart.total,
        address: data.billing_details.address,
      });
      setOrderId(res.data._id);
    } catch {}
  }, [data, cart, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
        <Link to={"/"}> 
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </Link>
      
    </div>
  );
};

export default Success;
