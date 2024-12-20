import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data && data?.status === "Processing" ? (
          <h1 className="text-[20px]">Ваше замовлення оброблюється магазином.</h1>
        ) : data?.status === "Transferred to delivery partner" ? (
          <h1 className="text-[20px]">
            Ваше замовлення прямує до партнера-відправника.
          </h1>
        ) : data?.status === "Shipping" ? (
          <h1 className="text-[20px]">
            Ваше замовлення доставляється нашим партнером-відправником.
          </h1>
        ) : data?.status === "Received" ? (
          <h1 className="text-[20px]">
            Ваше замовлення прибуло до вашого міста. Наш кур'єр доставить його.
          </h1>
        ) : data?.status === "On the way" ? (
          <h1 className="text-[20px]">
            Наш кур'єр збирається доставити замовлення.
          </h1>
        ) : data?.status === "Delivered" ? (
          <h1 className="text-[20px]">Замовлення доставлено!</h1>
        ) : data?.status === "Processing refund" ? (
          <h1 className="text-[20px]">Повернення коштів в обробці!</h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className="text-[20px]">Повернення коштів успішне!</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
