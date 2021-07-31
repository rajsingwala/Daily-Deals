import axios from "axios";

export const getSubCategories = async () => await axios.get(`/subs`);

export const getSubCategory = async (slug) => await axios.get(`/sub/${slug}`);

export const createSubCategory = async (sub, authtoken) =>
  await axios.post(`/sub`, sub, {
    headers: {
      authtoken,
    },
  });

export const removeSubCategory = async (slug, authtoken) =>
  await axios.delete(`/sub/${slug}`, {
    headers: { authtoken },
  });

export const updateSubCategory = async (slug, sub, authtoken) =>
  await axios.put(`/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const getProductBySub = async (slug) =>
  await axios.get(`/subcategory/product/${slug}`);
