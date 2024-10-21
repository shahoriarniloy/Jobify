import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useForm } from "react-hook-form";
import axiosSecure from "../../../../../../Hooks/UseAxiosSecure";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const AccountSetting = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [location, setLocation] = useState([51.505, -0.09]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosSecure.get(
          `/companies/${currentUser.email}`
        );
        const userData = response.data;

        reset({
          email: userData?.email,
          phone: userData?.phone_number,
        });
      } catch (error) {
        // console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [currentUser.email, reset]);

  useEffect(() => {
    const map = L.map("map").setView(location, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    mapRef.current = map;

    const geocoder = L.Control.geocoder()
      .on("markgeocode", (e) => {
        const latLng = e.geocode.center;
        if (mapRef.current) {
          mapRef.current.setView(latLng, 13);
          L.marker(latLng).addTo(map);
          setLocation([latLng.lat, latLng.lng]);
        }
      })
      .addTo(map);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        if (mapRef.current) {
          mapRef.current.setView(userLatLng, 13);
          L.marker(userLatLng).addTo(map);
          setLocation(userLatLng);
        }
      },
      (error) => {
        // console.error("Error getting location: ", error);
      }
    );

    return () => {
      if (mapRef.current) {
        map.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      email: currentUser.email,
      phone: data.phone,
      location: location,
    };

    try {
      const response = await axiosSecure.post("/companyAccountInfo", payload);
      // console.log("Success:", response.data);
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <section className="md:w-1/2">
        <h2 className="font-bold mb-4 text-xl">{t("map_location")}</h2>
        <div id="map" style={{ height: "400px", width: "100%" }}></div>
      </section>

      <section className="md:w-1/2">
        <h2 className="font-bold mb-4 text-xl">{t("account_settings")}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="input"
              readOnly
            />
            {errors.email && (
              <span className="text-red-500">{t("field_required")}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2">
              {t("phone")}
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone", { required: true })}
              className="input"
            />
            {errors.phone && (
              <span className="text-red-500">{t("field_required")}</span>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-blue-600 text-white mt-4 px-6 py-3 rounded-lg w-full md:w-auto"
          >
            {t("save_changes")}
          </button>
        </form>
      </section>
    </div>
  );
};

export default AccountSetting;
