import axios from "axios";

export const getCoupon = async () => await axios.get(`/coupon`);

export const getOneCoupon = async (slug) => await axios.get(`/coupon/${slug}`);

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(`/coupon`, coupon, {
    headers: { authtoken },
  });

export const deleteCoupon = async (slug, authtoken) =>
  await axios.delete(`/coupon/${slug}`, {
    headers: { authtoken },
  });

export const editCoupon = async (slug, coupon, authtoken) =>
  await axios.put(`/coupon/${slug}`, coupon, {
    headers: { authtoken },
  });

export const applyCoupon = async (coupon, authtoken) =>
  await axios.post(`/coupon/discount`, { coupon }, { headers: { authtoken } });
