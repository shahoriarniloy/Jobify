import { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "react-rating";
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import DashboardLoader from "../../Shared/DashboardLoader";

const Testimonial = ({ reviews ,isLoading}) => {
  const { t } = useTranslation();
  const [screenWidth, setScreenWidth] = useState();
  const [slidePerPage, setSlidePerPage] = useState(null);
  const theme = useSelector((state) => state.theme.theme);

  // Getting current width for responsive offer cards
  const getBrowserWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    // get resizing value
    window.addEventListener("resize", getBrowserWidth);
    return () => window.removeEventListener("resize", getBrowserWidth);
  }, []);
  useEffect(() => {
    if (screenWidth <= 640) {
      return setSlidePerPage(1);
    } else if (screenWidth <= 768 && screenWidth > 640) {
      return setSlidePerPage(2);
    } else {
      return setSlidePerPage(3);
    }
  }, [screenWidth]);
  if(isLoading) return <DashboardLoader/>

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gradient-to-r from-gray-800 to-slate-900"
          : "bg-secondary"
      }
    >
      <div className="container mx-auto py-[100px]">
        <h1
          className={
            theme === "dark"
              ? "text-3xl font-semibold mb-12 tracking-wider text-slate-200 text-center"
              : "text-3xl font-semibold mb-12 tracking-wider text-black text-center"
          }
        >
          {t("testimonial_title")}
        </h1>

        <Swiper
          slidesPerView={slidePerPage}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div
                className={
                  theme === "dark"
                    ? "bg-slate-700 bg-opacity-50 w-full p-8 rounded-md shadow-sm"
                    : "bg-white w-full p-8 rounded-md shadow-sm"
                }
              >
                <Rating
                  emptySymbol=<IoIosStarOutline className="text-3xl" />
                  fullSymbol=<IoIosStar className="text-3xl text-[#FFAA00]" />
                  placeholderSymbol=<IoIosStar className="text-3xl text-[#FFAA00]" />
                  readonly="true"
                  placeholderRating={review?.rating}
                />

                <p
                  className={
                    theme === "dark"
                      ? "text-white mt-4 h-[90px] overflow-y-auto"
                      : "text-[#464D61] mt-4 h-[90px] overflow-y-auto"
                  }
                >
                  “{review?.feedback}”
                </p>

                <div className="flex justify-between items-center mt-[40px]">
                  <div className="flex items-center gap-3">
                    <div>
                      <img
                        className="w-[38px] h-[38px] rounded-full"
                        src={review?.photoURL}
                        alt=""
                      />
                    </div>
                    <div>
                      <h1 className="font-bold">{review?.username}</h1>
                      <p className="text-[#767E94]">
                        {new Date(review?.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div>
                    <FaQuoteLeft className="text-5xl text-[#DADDE5]" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
