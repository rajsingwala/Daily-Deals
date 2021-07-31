import React, { useEffect, useState } from "react";
import { Layout, Button } from "antd";
import { useHistory } from "react-router-dom";
import Admin from "../../../components/mobiledash/Admin";
import { deleteProduct, getProductsByCount } from "../../../functions/product";
import AdminSideNav from "../AdminSideNav";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import { toast } from "react-toastify";
import AdminProductCard from "../../../components/card/AdminProductCard";
import LoadingCard from "../../../components/card/LoadingCard";
const { Content } = Layout;

const Products = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  const userToken = useSelector(selectUserToken);

  const getProducts = () => {
    getProductsByCount()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleRemove = (slug) => {
    if (window.confirm(`Do you want to Delete ${slug}?`)) {
      deleteProduct(slug, userToken)
        .then((res) => {
          getProducts();
          toast.success(`${slug} Deleted`);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="password">
      <Admin />
      <Layout style={{ minHeight: "100vh" }}>
        <AdminSideNav />
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            {products.length > 0 ? (
              <div className="all_products">
                {products.length > 0
                  ? products.map((product) => (
                      <AdminProductCard
                        product={product}
                        key={product._id}
                        handleRemove={handleRemove}
                      />
                    ))
                  : null}
              </div>
            ) : (
              <LoadingCard count={6} />
            )}
          </Content>
        </Layout>
      </Layout>

      <div className="mobile_product">
        {products.length > 0 ? (
          <div className="all_products_mobile">
            {products.length > 0
              ? products.map((product) => (
                  <AdminProductCard
                    product={product}
                    key={product._id}
                    handleRemove={handleRemove}
                  />
                ))
              : null}
          </div>
        ) : (
          <div className="product_mobile_loading">
            <LoadingCard count={6} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
