"use client";
import { Pagination } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation"; // Updated
import React, { useEffect, useState } from "react";
import "@/app/pages/Blog/Blog.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import PropTypes from "prop-types";
import { noop } from "lodash";
import { getFormattedDate } from "@/app/formatter/date";
import URL from "@/app/constants/urls";
import { showSnackBar } from "@/app/redux/snackBarSlice";
import UI from "@/app/constants/ui";
import { getRequest } from "@/app/services";
import { API_URL, getBlogsParam } from "@/app/constants/apiUrls";
import { PAGINATION_ROWS_12 } from "@/app/constants/index";
import { ismallMobileDevice } from "@/app/hooks/useMobileDevice";
import Loader from "@/app/loader";
import BlogShare from "./BlogShare";
import onClickOnLike from "./Blog.helper";
import STORAGE_KEY from "@/app/constants/storageKey";

function BlogPage(props) {
  // const { setShowNavBar } = props;
  const [Blogs, setBlogs] = useState([]);
  const [BlogsCount, setBlogsCount] = useState();
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [loader, setLoader] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState(
    JSON.parse(localStorage.getItem(STORAGE_KEY.LIKED_BLOGS)) || []
  );
  const isMobileDevice = ismallMobileDevice();

  const router = useRouter();
  const searchParams = useSearchParams(); // Replaces useLocation()
  const dispatch = useDispatch();

  const getBlogsBasedOnPage = (value) => {
    setLoader(true);
    getRequest(getBlogsParam(value))
      .then((res) => {
        setBlogs(res?.blog);
        setBlogsCount(res?.count);
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
  };

  const onClickBlogCard = (value) => {
    window.location.href = `${URL.BLOG_META}${value}`;
  };

  const handleShare = (event, data) => {
    event.preventDefault();
    event.stopPropagation();
    setShouldShowDialog(true);
    setSelectedCard(data);
  };

  const pagination = (pageNo) => {
    setPageNumber(pageNo);
    router.push(`${URL.BLOG_PAGE}?page=${pageNo}`);
  };

  const handleLike = (event, id) => {
    onClickOnLike({
      event,
      blogId: id,
      likedBlogs,
      setLikedBlogs,
      dispatch,
      setBlogs,
    });
  };

  useEffect(() => {
    // setShowNavBar(true);

    const page = parseInt(searchParams.get("page"), 10) || 1; // Fetch page number
    setPageNumber(page);
    getBlogsBasedOnPage(page);
  }, [searchParams]); // Dependency updated

  useEffect(() => {
    if (Blogs.length > 0 && window.location.pathname !== URL.BLOG_PAGE) {
      setBlogs((prevBlogs) => {
        const newBlogs = Blogs.slice(0, 3);
        if (JSON.stringify(prevBlogs) !== JSON.stringify(newBlogs)) {
          return newBlogs;
        }
        return prevBlogs;
      });
    }
  }, [Blogs]);

  return (
    <div className={isMobileDevice ? "container-fluid" : "container"}>
      <div
        className={
          window.location.pathname === URL.BLOG_PAGE
            ? "my-3"
            : "section-heading"
        }
      >
        <span
          className={
            window.location.pathname === URL.BLOG_PAGE
              ? "headline-5-bold"
              : "section_head"
          }
        >
          {window.location.pathname === URL.BLOG_PAGE
            ? UI.ALL_BLOGS
            : UI.BLOG_SECTION_TITLE}
        </span>
      </div>
      {loader ? (
        <Loader size="2rem" />
      ) : (
        <>
          <div className="blogs-container">
            {Blogs?.map((eachItem) => (
              <div className="card-container card" key={eachItem.id}>
                <div className="card-image ">
                  <img
                    src={`${API_URL.PHOTO_PRE}${eachItem.image}`}
                    alt={eachItem.imageAltText}
                    loading="lazy"
                  />
                </div>
                <div className="card-body">
                  <div
                    className="w-100"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <div
                      className="headline-5 card-content blog-detail-cursor-icon"
                      onClick={() => onClickBlogCard(eachItem.id)}
                    >
                      {eachItem.title}
                    </div>
                    <div className="author-info my-1">
                      <span>{getFormattedDate(eachItem.postDate)}</span>
                    </div>
                  </div>
                  <div className="w-100">
                    <hr
                      style={{
                        height: "2px",
                        borderWidth: 0,
                        color: "gray",
                        backgroundColor: "gray",
                        margin: 0,
                      }}
                    />
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div onClick={(event) => handleLike(event, eachItem.id)}>
                        {likedBlogs.includes(eachItem.id) ? (
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
                        <span className="mx-1">{eachItem.likes}</span>
                      </div>
                      <div>
                        <span className="mx-1">
                          <VisibilityIcon fontSize="medium" />
                          <span className="mx-1">{eachItem.views}</span>
                        </span>
                        <span onClick={(event) => handleShare(event, eachItem)}>
                          <ShareIcon
                            fontSize="medium"
                            className="blog-detail-cursor-icon"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More */}
          {window.location.pathname !== URL.BLOG_PAGE && (
            <div
              onClick={() => router.push(URL.BLOG_PAGE)}
              className="viewmore mt-4"
            >
              <span>{UI.VIEW_MORE}...</span>
            </div>
          )}

          {/* Pagination */}
          {Blogs?.length > 0 && window.location.pathname === URL.BLOG_PAGE && (
            <div className=" mt-2">
              <Pagination
                count={Math.ceil(BlogsCount / PAGINATION_ROWS_12)}
                className="justify-content-center d-flex py-2"
                showFirstButton
                showLastButton
                onChange={(_, page) => pagination(page)}
                page={pageNumber}
              />
            </div>
          )}

          {/* Social Media Share Dialog */}
          <BlogShare
            shouldShowDialog={shouldShowDialog}
            setShouldShowDialog={setShouldShowDialog}
            selectedCard={selectedCard}
            isFromBlogPage
          />
        </>
      )}
    </div>
  );
}

BlogPage.propTypes = {
  setShowNavBar: PropTypes.func,
};

BlogPage.defaultProps = {
  setShowNavBar: noop,
};

export default BlogPage;
