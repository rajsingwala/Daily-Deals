import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByCount = async () => await axios.get(`/products`);

export const deleteProduct = async (slug, authtoken) =>
  await axios.delete(`/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getProduct = async (slug) => await axios.get(`/product/${slug}`);

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort, order, page) =>
  await axios.post(`/products`, {
    sort,
    order,
    page,
  });

export const getTotal = async () => await axios.get(`/products/total`);

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const relatedProduct = async (productId, sort, order) =>
  await axios.post(`/product/related/${productId}`, { sort, order });

export const getProductByFilter = async (arg) =>
  await axios.post(`/search/filter`, arg);
