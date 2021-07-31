import axios from "axios";

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `/user/order`,
    { stripeResponse },
    { headers: { authtoken } }
  );

export const getOrder = async (authtoken) =>
  await axios.get(`/user/getorder`, {
    headers: { authtoken },
  });

export const cashOrder = async (authtoken) =>
  await axios.post(`/user/cash-order`, {}, { headers: { authtoken } });
