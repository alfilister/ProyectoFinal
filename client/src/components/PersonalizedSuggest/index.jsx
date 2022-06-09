import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getOrdersFromDb } from "../../redux/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination, Keyboard } from "swiper";
import Card from "../Card";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/thumbs";

function PersonalizedSuggest() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getOrdersFromDb());
  }, [dispatch]);

  const infoUser = useSelector((state) => state.userEmailId);
  const ordersDb = useSelector((state) => state.ordersDb);
  const allProducts = useSelector((state) => state.copyProducts);
  const verifiedLog = useSelector((state) => state.isAuthenticated);

  const ordersUser =
    ordersDb[0] &&
    ordersDb
      .filter((el) => el.user_id === infoUser && el.status !== "attempted")
      .map((el) => el.products_id)
      .flat();

  const selectedOnes =
    ordersDb[0] && allProducts.filter((el) => !ordersUser.includes(el.id));
  console.log(selectedOnes);

  const toShow = selectedOnes?.slice(0, 4);
  console.log(toShow);

  return (
    <div className="suggestSlider">
      {!verifiedLog ? (
        <div></div>
      ) : (
        <>
          <div className="h3">
            <h3>Special selection for you</h3>
          </div>
          <Swiper
            className="swiperFeatured"
            loop={false}
            navigation={true}
            spaceBetween={-200}
            keyboard={{ enabled: true }}
            pagination={{ clickable: true }}
            modules={[Navigation, Thumbs, Pagination, Keyboard]}
            grabCursor={true}
            slidesPerView={2}
          >
            {toShow.map((el) => {
              return (
                <SwiperSlide className="slideCard" key={el.id}>
                  <Card
                    key={el.id}
                    id={el.id}
                    aux_images={el.aux_images}
                    name={el.name}
                    image={el.image}
                    price={el.price}
                    stock={el.stock}
                    rating={el.rating}
                    featured={el.featured}
                    categories={el.categories.map((el) => el.name).join(" | ")}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default PersonalizedSuggest;
