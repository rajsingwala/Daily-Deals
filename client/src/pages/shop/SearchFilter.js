import React from "react";
import { Menu, Radio, Slider } from "antd";
import { FaRupeeSign, FaStar } from "react-icons/fa";
import { AiOutlineDownSquare } from "react-icons/ai";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Star from "../../components/card/Star";
import { IoMdColorFilter } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";

const { SubMenu } = Menu;

const SearchFilter = ({
  price,
  handleSlider,
  categories,
  handleCategory,
  category,
  handleRating,
  subs,
  handleSubs,
  colors,
  handleColor,
  shippings,
  handleShipping,
  color,
  shipping,
  searchCategory,
  setSearchCategory,
  searchSubCategory,
  setSearchSubCategory,
}) => {
  const categoryFilter = (searchCategory) => (cat) =>
    cat.name.toLowerCase().includes(searchCategory);

  const subsFilter = (searchSubCategory) => (sub) =>
    sub.name.toLowerCase().includes(searchSubCategory);

  return (
    <div className="search_menu">
      <Menu
        mode="inline"
        className="search_menu_content"
        style={{
          width: "100%",
          position: "static ",
          borderColor: "#fff",
        }}
        defaultOpenKeys={["1", "2", "3", "4", "5", "6"]}
      >
        {/**********************price*********************/}
        <SubMenu
          title={
            <span className="h5">
              <FaRupeeSign className="rupee_icon" />
              Price
            </span>
          }
          key="1"
          style={{ position: "static" }}
        >
          <Slider
            value={price}
            onChange={handleSlider}
            tipFormatter={(v) => `₹${v}`}
            range
            max="200000"
            step="3000"
          />
        </SubMenu>

        {/********************category******************/}
        <SubMenu
          title={
            <span className="h5">
              <AiOutlineDownSquare className="rupee_icon" />
              Category
            </span>
          }
          key="2"
          style={{ position: "static" }}
        >
          <div className="categories_checkbox_div">
            <div className="filter_search">
              <input
                placeholder="search category"
                value={searchCategory}
                onChange={(e) =>
                  setSearchCategory(e.target.value.toLowerCase())
                }
              />
            </div>
            {categories &&
              categories.length > 0 &&
              categories.filter(categoryFilter(searchCategory)).map((cat) => (
                <div key={cat._id} className="categories_checkbox">
                  <Checkbox
                    value={cat._id}
                    onChange={handleCategory}
                    checked={category.includes(cat._id)}
                  >
                    {cat.name}
                  </Checkbox>
                </div>
              ))}
          </div>
        </SubMenu>

        {/********************ratings*******************/}
        <SubMenu
          title={
            <span className="h5">
              <FaStar className="rupee_icon" />
              Ratings
            </span>
          }
          key="3"
          style={{ position: "static" }}
        >
          <div className="stars_filter">
            <Star numberOfStars={5} starClick={handleRating} />
            <Star numberOfStars={4} starClick={handleRating} />
            <Star numberOfStars={3} starClick={handleRating} />
            <Star numberOfStars={2} starClick={handleRating} />
            <Star numberOfStars={1} starClick={handleRating} />
          </div>
        </SubMenu>

        {/*****************subcategory****************/}
        <SubMenu
          title={
            <span className="h5">
              <AiOutlineDownSquare className="rupee_icon" />
              Sub Category
            </span>
          }
          key="4"
          style={{ position: "static", paddingTop: "0.5rem" }}
        >
          <div className="filter_search">
            <input
              placeholder="search subcategory"
              value={searchSubCategory}
              onChange={(e) =>
                setSearchSubCategory(e.target.value.toLowerCase())
              }
            />
          </div>
          <div className="subs_filter">
            {subs &&
              subs.length > 0 &&
              subs.filter(subsFilter(searchSubCategory)).map((sub) => (
                <div
                  className="sub_filter_div"
                  key={sub._id}
                  onClick={() => handleSubs(sub)}
                >
                  {sub.name}
                </div>
              ))}
          </div>
        </SubMenu>

        {/*color*/}
        <SubMenu
          title={
            <span className="h5">
              <IoMdColorFilter className="rupee_icon" />
              Colors
            </span>
          }
          key="5"
          style={{ position: "static" }}
        >
          <div className="categories_checkbox_div">
            {colors &&
              colors.length > 0 &&
              colors.map((cat, i) => (
                <div key={i} className="categories_checkbox">
                  <Checkbox
                    value={cat}
                    onChange={handleColor}
                    checked={color.includes(cat)}
                  >
                    {cat}
                  </Checkbox>
                </div>
              ))}
          </div>
        </SubMenu>

        {/* shipping */}
        <SubMenu
          title={
            <span className="h5">
              <MdLocalShipping className="rupee_icon" />
              Shipping
            </span>
          }
          key="6"
          style={{ position: "static", paddingTop: "0.5rem" }}
        >
          <div className="categories_checkbox_div">
            {shippings &&
              shippings.length > 0 &&
              shippings.map((ship, i) => (
                <div className="categories_checkbox" key={i}>
                  <Radio
                    name={ship}
                    value={ship}
                    onChange={handleShipping}
                    checked={ship === shipping}
                  >
                    {ship}
                  </Radio>
                </div>
              ))}
          </div>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SearchFilter;
