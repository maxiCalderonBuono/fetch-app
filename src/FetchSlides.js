import React, { useState, useEffect, useCallback } from "react";
import { getPhotoByName } from "./helpers/getPhotoByName";
import { useForm } from "./hooks/useForm";
import "./FetchSlides.css";

import { IconContext } from "react-icons";
import { FcSearch } from "react-icons/fc";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

export const FetchSlides = () => {
  const [photos, setPhotos] = useState(() => []);

  const [q, setQ] = useState(() => "");

  const [formData, handleInputChange] = useForm({ inputValue: "" });
  const { inputValue } = formData;

  const [current, setCurrent] = useState(() => 0);

  const updatePhotos = useCallback(() => {
    getPhotoByName(q).then((newPhotos) => {
      setPhotos(newPhotos);
    });
  }, [q]);

  useEffect(() => {
    updatePhotos();
  }, [q, updatePhotos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQ(inputValue);
  };

  const nextSlide = () => {
    setCurrent(current === photos.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? photos.length - 1 : current - 1);
  };

  console.log(photos);

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center">
        <h1 className="me-3">Photo Bucket</h1>
        <IconContext.Provider value={{ size: "2rem" }}>
          <FcSearch />
        </IconContext.Provider>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="inputValue"
            className="form-control text-center"
            autoComplete="off"
            placeholder="Search free high-resolution images"
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <hr />
      <section className="slider">
        <FaArrowCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowCircleRight className="right-arrow" onClick={nextSlide} />

        {photos ? (
          photos.map((photo, index) => (
            <div
              className={index === current ? "slide active" : "slide"}
              key={photo.id}
            >
              {index === current && (
                <img
                  className="image"
                  src={photo.src.large}
                  alt={`${photo.photographer}`}
                />
              )}
            </div>
          ))
        ) : (
          <h1>Se ha producido un error </h1>
        )}
      </section>
    </>
  );
};
