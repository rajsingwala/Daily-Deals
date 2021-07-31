import React, { useState } from "react";
import {
  FaShoppingBag,
  FaBars,
  FaPowerOff,
  FaRegUserCircle,
} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineClose, AiOutlineDashboard } from "react-icons/ai";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Input, Menu, Dropdown, Space, Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setSignOutState } from "../../features/user/userSlice";
import { setSearch } from "../../features/search/searchSlice";
import { auth } from "../../firebase";
import {
  selectUserEmail,
  selectUserPhoto,
  selectUserRole,
} from "../../features/user/userSlice";
import { selectCart } from "../../features/cart/cartSlice";
import { selectText } from "../../features/search/searchSlice";
const { Search } = Input;

const Navbar = () => {
  const [click, setClick] = useState(false);

  const userEmail = useSelector(selectUserEmail);
  const userRole = useSelector(selectUserRole);
  const userPhoto = useSelector(selectUserPhoto);
  const text = useSelector(selectText);
  const cart = useSelector(selectCart);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    setClick(!click);
  };

  const handleSignout = async () => {
    await auth.signOut();
    dispatch(setSignOutState());
    history.push("/login");
    setClick(false);
  };

  const handleChange = (e) => {
    dispatch(
      setSearch({
        text: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
    setClick(false);
  };

  const menu = (
    <Menu className="menu">
      <Menu.Item className="menu_item" disabled>
        <div className="signout signin">
          <span className="signin_as mobile">SignedIn as</span>{" "}
          <span className="menu_email">{userEmail} </span>
        </div>
      </Menu.Item>
      <Menu.Divider className="divider" />
      <Menu.Item className="menu_item" onClick={() => setClick(false)}>
        <Link
          exact
          to={userRole === "subscriber" ? "/user/history" : "/admin/dashboard"}
        >
          <div className="signout">
            <div>
              <AiOutlineDashboard className="dashboard_icon" />
            </div>
            <span>Dashboard</span>
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item className="menu_item" onClick={handleSignout}>
        <div className="signout">
          <div>
            <FaPowerOff className="signout_icon" />
          </div>
          <span>SIGN OUT</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <Link to="/">
        <div className="navbar_logo">
          <FaShoppingBag className="navbar_logo_icon" />
          <h1>Daily Deals</h1>
        </div>
      </Link>
      <div className="navbar_mid">
        <ul className="navbar_ul">
          <NavLink
            exact
            to="/"
            className="navbar_navlink"
            activeClassName="navbar_active_navlink"
          >
            <li className="navbar_li">Home</li>
          </NavLink>
          <NavLink
            exact
            to="/shop"
            className="navbar_navlink"
            activeClassName="navbar_active_navlink"
          >
            <li className="navbar_li">Shop</li>
          </NavLink>
          <NavLink
            exact
            to="/cart"
            className="navbar_navlink cart"
            activeClassName="navbar_active_navlink cart"
          >
            <li className="navbar_li" style={{ paddingTop: "4rem" }}>
              <Badge
                count={cart?.length}
                offset={[9, 0]}
                className="cart_badge"
              >
                <FiShoppingCart
                  className="navbar_cart_icon"
                  style={{ fontSize: "1.3rem" }}
                />
              </Badge>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="navbar_search">
        <form onSubmit={handleSubmit}>
          <Search
            placeholder="search"
            enterButton
            size="large"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="navbar_end">
        {userEmail ? (
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                overlay={menu}
                placement="bottomCenter"
                trigger={["click" && "hover"]}
              >
                {userPhoto === null ? (
                  <div className="user_icon_div">
                    <FaRegUserCircle className="user_icon" />{" "}
                  </div>
                ) : (
                  <div className="user_pic">
                    <img src={userPhoto} alt="profile-pic" />
                  </div>
                )}
              </Dropdown>
            </Space>
          </Space>
        ) : (
          <>
            <NavLink
              to="/register"
              className="navbar_register"
              activeClassName="navbar_active_register"
            >
              <h3>Register</h3>
            </NavLink>
            <NavLink
              to="/login"
              className="navbar_login"
              activeClassName="navbar_active_login"
            >
              <h3>Login</h3>
            </NavLink>{" "}
          </>
        )}
      </div>
      <div className={click ? "hamburger_icon click" : "hamburger_icon"}>
        {click /* <AiOutlineClose onClick={handleClick} /> */ ? null : (
          <FaBars onClick={handleClick} />
        )}
      </div>

      <div
        className={
          click ? "right_hamburger_menu active" : "right_hamburger_menu"
        }
      >
        <div className="right_hamburger_menu_close">
          <Link to="/" onClick={handleClick}>
            <div className="hamburger_logo">
              <FaShoppingBag className="hamburger_logo_icon" />
              <h4>Daily Deals</h4>
            </div>
          </Link>
          <div onClick={handleClick} className="hamburger_close_icon">
            <AiOutlineClose />
          </div>
        </div>

        <div className="hamburger_line"></div>
        <ul className="right_hamburger_menu_ul">
          <div className="hamburger_search">
            <form onSubmit={handleSubmit}>
              <Search
                placeholder="search"
                enterButton
                size="large"
                onChange={handleChange}
              />
            </form>
          </div>
          <NavLink
            exact
            to="/"
            className="hamburger_navlink"
            activeClassName="hamburger_active_navlink"
            onClick={handleClick}
          >
            <li className="right_hamburger_menu_li">Home</li>
          </NavLink>

          <NavLink
            exact
            to="/shop"
            className="hamburger_navlink"
            activeClassName="hamburger_active_navlink"
            onClick={handleClick}
          >
            <li className="right_hamburger_menu_li">Shop</li>
          </NavLink>

          <NavLink
            exact
            to="/cart"
            className="hamburger_navlink "
            activeClassName="hamburger_active_navlink cart"
            onClick={handleClick}
          >
            <li
              className="right_hamburger_menu_li"
              style={{ paddingTop: "3.5rem" }}
            >
              <Badge
                count={cart?.length}
                offset={[9, 0]}
                className="cart_badge"
              >
                <FiShoppingCart
                  className="hamburger_cart_icon"
                  style={{ fontSize: "1.3rem" }}
                />
              </Badge>
            </li>
          </NavLink>
          {userEmail ? (
            <Space direction="vertical">
              <Space wrap>
                <Dropdown
                  overlay={menu}
                  placement="bottomCenter"
                  trigger={["click"]}
                >
                  {userPhoto === null ? (
                    <div className="user_icon_div">
                      <FaRegUserCircle className="user_icon" />{" "}
                    </div>
                  ) : (
                    <div className="user_pic">
                      <img src={userPhoto} alt="profile-pic" />
                    </div>
                  )}
                </Dropdown>
              </Space>
            </Space>
          ) : (
            <>
              <NavLink
                to="/register"
                className="hamburger_navlink"
                activeClassName="hamburger_active_navlink"
                onClick={handleClick}
              >
                <li className="right_hamburger_menu_li">Register</li>
              </NavLink>
              <NavLink
                to="/login"
                className="hamburger_navlink"
                activeClassName="hamburger_active_navlink"
                onClick={handleClick}
              >
                <li className="right_hamburger_menu_li login">Login</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
