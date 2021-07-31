import React, { useEffect, useState } from "react";
import {
  getProductByFilter,
  getProductsByCount,
} from "../../functions/product";
import LoadingCard from "../../components/card/LoadingCard";
import ProductCard from "../../components/card/ProductCard";
import SearchFilter from "./SearchFilter";
import { Button, Drawer, Space, Menu, Slider } from "antd";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { getCategories } from "../../functions/category";
import { useSelector, useDispatch } from "react-redux";
import { getSubCategories } from "../../functions/subcategory";
import { selectText, setSearch } from "../../features/search/searchSlice";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(6);
  const [price, setPrice] = useState([0, 0]);
  const [category, setCategory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [star, setStar] = useState("");
  const [sub, setSub] = useState("");
  const [ok, setOk] = useState(false);
  const [colors, setColors] = useState([
    "Red",
    "Blue",
    "Yellow",
    "Green",
    "Orange",
    "Pink",
    "Brown",
    "Black",
    "White",
    "Silver",
    "Gold",
    "Purple",
  ]);
  const [color, setColor] = useState([]);
  const [shippings, setShippings] = useState(["Yes", "No"]);
  const [shipping, setShipping] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchSubCategory, setSearchSubCategory] = useState("");

  const dispatch = useDispatch();
  const text = useSelector(selectText);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // default
  useEffect(() => {
    setLoading(true);
    getProductsByCount().then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
    getCategories().then((res) => {
      setCategories(res.data);
    });
    getSubCategories().then((res) => {
      setSubs(res.data);
    });
  }, []);

  // search
  useEffect(() => {
    if (text === "") {
      getProductsByCount().then((res) => setProduct(res.data));
    }

    const delayed = setTimeout(() => {
      getProductByFilter({ query: text }).then((res) => setProduct(res.data));
      setStar("");
      setCategory([]);
      setPrice([0, 0]);
      setSub("");
      setShipping("");
    }, [300]);

    return () => clearTimeout(delayed);
  }, [text]);

  // price
  useEffect(() => {
    getProductByFilter({ price }).then((res) => {
      setProduct(res.data);
    });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch(setSearch({ text: "" }));
    setPrice(value);
    setStar("");
    setCategory([]);
    setShipping("");
    setSub("");
    setColor([]);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // category
  const handleCategory = (e) => {
    dispatch(
      setSearch({
        text: "",
      })
    );
    let initialState = [...category];
    let target = e.target.value;
    let index = initialState.indexOf(target);

    if (index === -1) {
      initialState.push(target);
    } else {
      initialState.splice(index, 1);
    }

    setCategory(initialState);
    getProductByFilter({ category: initialState }).then((res) =>
      setProduct(res.data)
    );
    setPrice([0, 0]);
    setStar("");
    setColor([]);
    setSub("");
    setShipping("");
  };

  // rating
  const handleRating = (num) => {
    dispatch(
      setSearch({
        text: "",
      })
    );
    getProductByFilter({ stars: num }).then((res) => setProduct(res.data));
    setPrice([0, 0]);
    setSub("");
    setColor([]);
    setShipping("");
    setCategory([]);
  };

  // sub-category
  const handleSubs = (sub) => {
    dispatch(
      setSearch({
        text: "",
      })
    );
    setSub(sub);
    getProductByFilter({ sub }).then((res) => {
      setProduct(res.data);
    });
    setPrice([0, 0]);
    setStar("");
    setColor([]);
    setCategory([]);
    setShipping("");
  };

  // color
  const handleColor = (e) => {
    dispatch(
      setSearch({
        text: "",
      })
    );
    let initialState = [...color];
    let target = e.target.value;
    let index = initialState.indexOf(target);
    console.log(e.target.value);

    if (index === -1) {
      initialState.push(target);
    } else {
      initialState.splice(index, 1);
    }

    setColor(initialState);
    getProductByFilter({ color: initialState }).then((res) => {
      setProduct(res.data);
    });
    setPrice([0, 0]);
    setStar("");
    setCategory([]);
    setSub("");
    setShipping("");
  };

  // shipping
  const handleShipping = (e) => {
    dispatch(
      setSearch({
        text: "",
      })
    );
    setShipping(e.target.value);
    getProductByFilter({ shipping: e.target.value }).then((res) => {
      setProduct(res.data);
      console.log(res.data);
    });
    setPrice([0, 0]);
    setStar("");
    setCategory([]);
    setSub("");
    setColor([]);
  };

  const handleLoad = () => {
    setLoad((prev) => prev + 6);
  };

  return (
    <div className="shop">
      <div className="shop_container">
        <div className="shop_left">
          <h2>Filter</h2>
          <SearchFilter
            handleSlider={handleSlider}
            price={price}
            categories={categories}
            handleCategory={handleCategory}
            category={category}
            handleRating={handleRating}
            subs={subs}
            handleSubs={handleSubs}
            shippings={shippings}
            handleShipping={handleShipping}
            shipping={shipping}
            colors={colors}
            color={color}
            handleColor={handleColor}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            searchSubCategory={searchSubCategory}
            setSearchSubCategory={setSearchSubCategory}
          />
        </div>
        <div className="shop_right_content">
          <div className="shop_right">
            {product && !loading && product.length > 0 ? (
              product
                .slice(0, load)
                .map((p) => <ProductCard product={p} key={p._id} />)
            ) : loading ? (
              <LoadingCard count={3} />
            ) : (
              <div className="shop_no_product">No Product Found</div>
            )}
          </div>
          {load < product.length ? (
            <div className="load_more_div">
              <div className="load_more">
                <Button onClick={handleLoad}>Load More</Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/***************************mobile**********************/}
      <div className="shop_container_mobile">
        <Space>
          <div onClick={showDrawer} className="shop_drawer_bar">
            <FaBars />
          </div>
        </Space>
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <div className="shop_mobile_side_close">
            <h1>Filter</h1>
            <AiOutlineClose onClick={onClose} />
          </div>
          <div className="filter_left">
            <SearchFilter
              handleSlider={handleSlider}
              price={price}
              categories={categories}
              handleCategory={handleCategory}
              category={category}
              handleRating={handleRating}
              subs={subs}
              handleSubs={handleSubs}
              color={color}
              colors={colors}
              handleColor={handleColor}
              shippings={shippings}
              shipping={shipping}
              handleShipping={handleShipping}
              searchCategory={searchCategory}
              setSearchCategory={setSearchCategory}
              searchSubCategory={searchSubCategory}
              setSearchSubCategory={setSearchSubCategory}
            />
          </div>
        </Drawer>
        {loading ? <LoadingCard count={6} /> : null}
        <div className="shop_right_content">
          <div className="mobile_shop_right">
            {product && !loading && product.length > 0 ? (
              product
                .slice(0, load)
                .map((p) => <ProductCard product={p} key={p._id} />)
            ) : (
              <div className="mobile_no_product">No Product Found</div>
            )}
          </div>
          {load < product.length ? (
            <div className="load_more_div">
              <div className="load_more">
                <Button onClick={handleLoad}>Load More</Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Shop;
