"use client";
import { useSearchParams } from "react-router-dom";
import { marked } from "marked";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getFormattedDate } from "../../formatter/date";
import { showSnackBar } from "../../../redux/snackBarSlice";
import { getRequest } from "../../services";
import { API_URL } from "../../constants/apiUrls";
import Loader from "../../components/loader/Loader";
import BlogShare from "./BlogShare";
import onClickOnLike from "./Blog.helper";
import STORAGE_KEY from "../../constants/storageKey";
import useMobileDevice from "../../hooks/useMobileDevice";

function BlogDetails({ setShowNavBar }) {
  const dispatch = useDispatch();
  const [search] = useSearchParams();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEY.LIKED_BLOGS)) || []
  );
  const id = search.get("id");
  const isMobileDevice = useMobileDevice();

  useEffect(() => {
    setShowNavBar(true);
  }, []);

  const handleLike = (event) => {
    onClickOnLike({
      event,
      blogId: data.id,
      likedBlogs,
      setLikedBlogs,
      dispatch,
      setData,
    });
  };

  useEffect(() => {
    if (id) {
      setLoader(true);
      getRequest(`${API_URL.GET_DETAILS_OF_BLOG}/${id}`)
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          dispatch(
            showSnackBar({
              setopen: true,
              message: err?.message,
              severity: "error",
            })
          );
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [id]);

  return (
    <div className="container">
      {loader ? (
        <Loader size="2rem" />
      ) : (
        data && (
          <div className={isMobileDevice ? "card p-3" : "card p-5"}>
            <div className="card-detail-image">
              <img
                src={`${API_URL.PHOTO_PRE}${data.image}`}
                alt={data.imageAltText}
                loading="lazy"
              />
            </div>
            <span className="headline-4 py-4">{data.title}</span>
            <div className="author-info">
              <p>{getFormattedDate(data.postDate)}</p>
            </div>
            <div
              className="headline-6 mt-3"
              style={{ lineHeight: "2.5625rem" }}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: marked(data.content) }}
            />

            <hr />
            <BlogShare selectedCard={data} />
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                {data.views}
                <span className="ms-1">views</span>
              </div>
              <div className="d-flex align-items-center">
                <span onClick={handleLike} className="placement">
                  {likedBlogs.includes(data.id) ? (
                    <FavoriteIcon
                      fontSize="medium"
                      style={{ color: "#faaf00" }}
                      className="blog-detail-cursor-icon"
                    />
                  ) : (
                    <FavoriteBorderIcon
                      fontSize="medium"
                      style={{ color: "#faaf00" }}
                      className="blog-detail-cursor-icon"
                    />
                  )}
                </span>
                <span className="ms-1">{data.likes}</span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

BlogDetails.propTypes = {
  setShowNavBar: PropTypes.func,
};

BlogDetails.defaultProps = {
  setShowNavBar: noop,
};

export default BlogDetails;
