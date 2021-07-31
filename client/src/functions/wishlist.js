import axios from "axios";

export const createWishlist = async (authtoken, productId) =>
  await axios.post(`/user/wishlist`, { productId }, { headers: { authtoken } });

export const getWishlist = async (authtoken) =>
  await axios.get(`/user/wishlist`, {
    headers: { authtoken },
  });

export const updateWishlist = async (authtoken, productId) =>
  await axios.put(
    `/user/wishlist/${productId}`,
    {},
    { headers: { authtoken } }
  );
