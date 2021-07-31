import React, { useEffect, useState } from "react";
import Admin from "../../../components/mobiledash/Admin";
import { Form, Input } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../../features/user/userSlice";
import { editCoupon, getOneCoupon } from "../../../functions/coupon";
import { toast } from "react-toastify";

const EditCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [discount, setDiscount] = useState("");

  const { slug } = useParams();

  useEffect(() => {
    loadCoupon();
  }, []);

  const loadCoupon = async () => {
    getOneCoupon(slug).then((res) => {
      setName(res.data.name);
      //   setExpiry(res.data.expiry);
      setDiscount(res.data.discount);
    });
  };

  const history = useHistory();
  const token = useSelector(selectUserToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    editCoupon(slug, { name, expiry, discount }, token)
      .then((res) => {
        console.log(res.data);
        toast.success(`${res.data.name} Updated`);
        history.push("/admin/coupon");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="register">
        <div className="coupon_container">
          <div className="register_background"></div>
          <div className="register_content">
            <h1>Edit Coupon</h1>
          </div>
          <div className="register_form2">
            <Form>
              <Form.Item>
                <Input
                  type="text"
                  placeholder="enter coupon name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  placeholder="discount %"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                  max={80}
                />
              </Form.Item>
              <Form.Item>
                <DatePicker
                  selected={expiry}
                  value={expiry}
                  onChange={(date) => setExpiry(date)}
                  required
                  popperPlacement="top-start"
                />
              </Form.Item>
            </Form>
            <div className="register_btn" onClick={handleSubmit}>
              <span>Edit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="register_mobile_side">
        <Admin />
      </div>
      <div className="register_mobile">
        <div className="coupon_container_mobile">
          <div className="register_background_mobile"></div>
          <div className="register_content3_mobile">
            <h1>Edit Coupon</h1>
          </div>
          <div className="register_form2_mobile">
            <Form>
              <Form.Item>
                <Input
                  type="text"
                  placeholder="enter coupon name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  placeholder="discount %"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                  max={80}
                />
              </Form.Item>
              <Form.Item>
                <DatePicker
                  selected={expiry}
                  value={expiry}
                  onChange={(date) => setExpiry(date)}
                  required
                  popperPlacement="top-start"
                />
              </Form.Item>
            </Form>
            <div className="register_btn" onClick={handleSubmit}>
              <span>Edit</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCoupon;
