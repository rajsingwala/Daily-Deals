import axios from "axios";

export const getOrder = async (authtoken) =>
  await axios.get(`/admin/all-orders`, {
    headers: { authtoken },
  });

export const updateStatus = async (authtoken, orderId, orderStatus) =>
  await axios.put(
    `/admin/order-status`,
    { orderId, orderStatus },
    { headers: { authtoken } }
  );
