import React from "react";
import eggImage from "../images/egg.png";
import fishImage from "../images/fish.png";
import chickenImage from "../images/chicken.png";
import fruitImage from "../images/fruit.png";
import vegitableImage from "../images/vegitable.png";
import riceImage from "../images/rice.png";
import meatImage from "../images/meat.png";
import spiceImage from "../images/spice.png";

const ProductCategories = () => {
  const handleClick = (category) => {
    console.log(`You clicked on ${category}`);
    // You can add routing or other logic here for each category click
  };

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Our Product Categories
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            faucibus massa dignissim tempus.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
          {/* Egg */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleClick("Egg")}
          >
            <div className="overflow-hidden">
              <img
                className="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125"
                src={eggImage}
                alt="Egg"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl text-center">
                  Egg
                </h3>
              </div>
            </div>
          </div>

          {/* Fish */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleClick("Fish")}
          >
            <div className="overflow-hidden">
              <img
                className="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125"
                src={fishImage}
                alt="Fish"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl text-center">
                  Fish
                </h3>
              </div>
            </div>
          </div>

          {/* Chicken */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleClick("Chicken")}
          >
            <div className="overflow-hidden">
              <img
                className="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125"
                src={chickenImage}
                alt="Chicken"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl text-center">
                  Chicken
                </h3>
              </div>
            </div>
          </div>

          {/* Vegetables */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleClick("Vegetables")}
          >
            <div className="overflow-hidden">
              <img
                className="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125"
                src={vegitableImage}
                alt="Vegetables"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl text-center">
                  Vegetables
                </h3>
              </div>
            </div>
          </div>

          {/* Fruits */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleClick("Fruits")}
          >
            <div className="overflow-hidden">
              <img
                className="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125"
                src={fruitImage}
                alt="Fruits"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl text-center">
                  Fruits
                </h3>
              </div>
            </div>
          </div>

          {/* Rice */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleClick("Rice")}
          >
            <div className="overflow-hidden">
              <img
                className="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125"
                src={riceImage}
                alt="Rice"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl text-center">
                  Rice
                </h3>
              </div>
            </div>
          </div>

          {/* Meat */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleClick("Meat")}
          >
            <div className="overflow-hidden">
              <img
                className="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125"
                src={meatImage}
                alt="Meat"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl text-center">
                  Meat
                </h3>
              </div>
            </div>
          </div>

          {/* Spice */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleClick("Spice")}
          >
            <div className="overflow-hidden">
              <img
                className="object-cover w-64 h-64 transition-all duration-300 group-hover:scale-125"
                src={spiceImage}
                alt="Spice"
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl text-center">
                  Spice
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
