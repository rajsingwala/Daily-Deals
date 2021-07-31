import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { selectUserToken } from "../../features/user/userSlice";

const FileUpload = ({ values, setValues }) => {
  const userToken = useSelector(selectUserToken);
  const [loading, setLoading] = useState(false);

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: userToken,
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
                setLoading(false);
              })
              .catch((err) => {
                console.log("CLOUDINARY UPLOAD ERR", err);
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemoveImage = (public_id) => {
    setLoading(true);
    axios
      .post(
        `/removeimage`,
        { public_id },
        { headers: { authtoken: userToken } }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        const filterImages = values.images.filter((img) => {
          return img.public_id !== public_id;
        });
        setValues({ ...values, images: filterImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="file_upload">
      <label className="ant-btn">
        Choose File
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </label>

      <div className="file_image">
        {values.images.length > 0 ? (
          values.images.map((image) => (
            <div className="preview_img" key={image.public_id}>
              <Badge
                count="X"
                className="img_div"
                onClick={() => handleRemoveImage(image.public_id)}
              >
                {loading ? (
                  <LoadingOutlined className="spinner" />
                ) : (
                  <img src={image.url} className="preview-img" />
                )}
              </Badge>
            </div>
          ))
        ) : loading ? (
          <LoadingOutlined className="spinner" />
        ) : (
          <div className="no_image">No Images </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
