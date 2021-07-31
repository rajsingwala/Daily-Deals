import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUserLoginDetails } from "./features/user/userSlice";
import axios from "axios";
import Loader from "./components/loading/Loader";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Navbar = lazy(() => import("./components/nav/Navbar"));
const Home = lazy(() => import("./pages/home/Home"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History/History"));
const UserRoute = lazy(() => import("./route/UserRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/wishlist/Wishlist"));
const AdminRoute = lazy(() => import("./route/AdminRoute"));
const AdminDashboard = lazy(() =>
  import("./pages/admin/admin_dashboard/AdminDashboard")
);
const AdminPassword = lazy(() => import("./pages/admin/AdminPassword"));
const Category = lazy(() => import("./pages/admin/Category/Category"));
const Coupon = lazy(() => import("./pages/admin/coupon/Coupon"));
const Product = lazy(() => import("./pages/admin/product/Product"));
const Products = lazy(() => import("./pages/admin/product/Products"));
const SubCategory = lazy(() => import("./pages/admin/subcategory/SubCategory"));
const EditCategory = lazy(() => import("./pages/admin/Category/EditCategory"));
const EditSubCategory = lazy(() =>
  import("./pages/admin/subcategory/EditSubCategory")
);
const EditProduct = lazy(() => import("./pages/admin/product/EditProduct"));
const ProductPage = lazy(() => import("./pages/admin/product/ProductPage"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubsHome = lazy(() => import("./pages/subcategory/SubsHome"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const CartDrawer = lazy(() => import("./components/card/CartDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const EditCoupon = lazy(() => import("./pages/admin/coupon/EditCoupon"));
const Payment = lazy(() => import("./pages/Payment"));

const currentUser = async (authtoken) => {
  return await axios.post(
    `/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch(
              setUserLoginDetails({
                name: user.displayName,
                email: res.data.email,
                token: idTokenResult.token,
                photo: user.photoURL,
                role: res.data.role,
                _id: res.data._id,
              })
            );
          })
          .catch((err) => console.log(err));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="center_loading">
          <Loader />
        </div>
      }
    >
      <Navbar />
      <CartDrawer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/register/complete-registration">
          <RegisterComplete />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <UserRoute exact path="/user/history">
          <History />
        </UserRoute>
        <UserRoute exact path="/user/password">
          <Password />
        </UserRoute>
        <UserRoute exact path="/user/wishlist">
          <Wishlist />
        </UserRoute>
        <UserRoute exact path="/checkout">
          <Checkout />
        </UserRoute>
        <UserRoute exact path="/payment">
          <Payment />
        </UserRoute>
        <AdminRoute exact path="/admin/dashboard">
          <AdminDashboard />
        </AdminRoute>
        <AdminRoute exact path="/admin/category">
          <Category />
        </AdminRoute>
        <AdminRoute exact path="/admin/coupon">
          <Coupon />
        </AdminRoute>
        <AdminRoute exact path="/admin/coupon/:slug">
          <EditCoupon />
        </AdminRoute>
        <AdminRoute exact path="/admin/password">
          <AdminPassword />
        </AdminRoute>
        <AdminRoute exact path="/admin/product">
          <Product />
        </AdminRoute>
        <AdminRoute exact path="/admin/all-products">
          <Products />
        </AdminRoute>
        <AdminRoute exact path="/admin/subcategory">
          <SubCategory />
        </AdminRoute>
        <AdminRoute exact path="/admin/category/:slug">
          <EditCategory />
        </AdminRoute>
        <AdminRoute exact path="/admin/subcategory/:slug">
          <EditSubCategory />
        </AdminRoute>
        <AdminRoute exact path="/admin/product/edit/:slug">
          <EditProduct />
        </AdminRoute>
        <Route exact path="/product/:slug">
          <ProductPage />
        </Route>
        <Route exact path="/category/product/:slug">
          <CategoryHome />
        </Route>
        <Route exact path="/subcategory/product/:slug">
          <SubsHome />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
