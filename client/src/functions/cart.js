import axios from "axios";

export const proceedCheckout = async (productCart, authtoken) =>
  await axios.post(
    `/user/checkout`,
    { cart: productCart },
    { headers: { authtoken } }
  );

export const getCart = async (authtoken) =>
  await axios.get(`/user/checkout/get`, {
    headers: { authtoken },
  });

export const removeCart = async (authtoken) =>
  await axios.delete(`/user/checkout/empty`, {
    headers: { authtoken },
  });

export const userAddress = async (address, authtoken) =>
  await axios.post(`/user/address`, address, {
    headers: { authtoken },
  });

export const userData = async (authtoken) =>
  await axios.post(
    `/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
