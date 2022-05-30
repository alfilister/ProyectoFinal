import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import { useSelector } from "react-redux";
import Card from "../Card";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/thumbs";

function CardSlider() {
  const featuredOnes = useSelector((state) => state.featProducts);

  return (
    <div className="cardSlider">
      {!featuredOnes[0] ? (
        <div className="loadingStatus">
          <h2>Loading Featured Items...</h2>
          <img
            src="https://i.imgur.com/EQSYdeQ.gif"
            alt="Loading..."
            className="loaderHome"
          />
        </div>
      ) : (
        <>
          <h3 className="h3">Check our featured items</h3>
          <Swiper
            className="swiperFeatured"
            loop={true}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            slidesPerView={3}
          >
            {featuredOnes.map((el) => {
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

export default CardSlider;
