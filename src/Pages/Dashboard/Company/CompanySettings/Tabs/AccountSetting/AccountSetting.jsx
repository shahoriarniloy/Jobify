import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useCurrentUser from "../../../../../../Hooks/useCurrentUser";
import axiosSecure from "../../../../../../Hooks/UseAxiosSecure";
import { useSelector} from "react-redux";



const AccountSetting = () => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const [location, setLocation] = useState([51.505, -0.09]);
  const [formattedLocation, setFormattedLocation] = useState();
  const [formattedAddress, setFormattedAddress] = useState("");
  const theme = useSelector((state) => state.theme.theme);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      // Mock user data; replace with your API call
      const userData = {
        email: currentUser.email,
        phone_number: "123-456-7890", // replace with actual phone number
      };

      reset({
        email: userData?.email,
        phone: userData?.phone_number,
      });
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
      .on("markgeocode", async (e) => {
        const latLng = e.geocode.center;
        mapRef.current.setView(latLng, 13);
        L.marker(latLng).addTo(map);
        setLocation([latLng.lat, latLng.lng]);

        // Reverse geocoding
        const address = await getAddressFromCoordinates(latLng.lat, latLng.lng);

        // console.log(address);
        setFormattedAddress(address);
      })
      .addTo(map);

    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        map.setView(userLatLng, 13);
        L.marker(userLatLng).addTo(map);
        setLocation(userLatLng);
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

  const getAddressFromCoordinates = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();

      setFormattedLocation({
        city: data.address.city,
        country: data.address.country,
      });
      // console.log(data);
      return data.display_name;
      // Returns the formatted address
    } catch (error) {
      // console.error("Error fetching location:", error);
      return null;
    }
  };

  // console.log(formattedLocation);

  const onSubmit = async (data) => {
    const payload = {
      email: currentUser.email,
      phone: data.phone,
      formattedLocation,
    };

    try {
      const response = await axiosSecure.post("/companyAccountInfo", payload);
      // console.log("Success:", response.data);
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row lg:gap-24 gap-6">
      <section className="md:w-1/2">
        <h2 className="font-bold mb-4 text-xl mt-4">{t("map_location")}</h2>
        <div id="map" style={{ height: "400px", width: "100%" }}></div>
        {formattedAddress && (
          <p className="mt-2">Selected Location: {formattedAddress}</p>
        )}
      </section>

      <section className="md:w-1/2">
        <h2 className="font-bold mb-4 text-xl mt-4">{t("account_settings")}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex items-center">
            <label htmlFor="email" className="block mb-2">
              {t("email")}
            </label>
            <div className={ theme === "dark"? "mb-4 flex items-center border-2 border-slate-600 rounded-md ml-4" : "mb-4 flex items-center border-2 rounded-md ml-4"}>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className={ theme === "dark"? "input  bg-slate-900 text-slate-300   " : "input "}
                readOnly
              />
              {errors.email && (
                <span className="text-red-500">{t("field_required")}</span>
              )}
            </div>
          </div>

          <div className="mb-4 flex items-center ">
            <label htmlFor="phone" className="block mb-2">
              {t("phone")}
            </label>
            <div className={ theme === "dark"? "mb-4 flex items-center border-2 border-slate-600 rounded-md ml-4" : "mb-4 flex items-center border-2 rounded-md ml-4"}>
              <input
                type="tel"
                id="phone"
                {...register("phone", { required: true })}
                className={ theme === "dark"? "input  bg-slate-900 text-slate-300   " : "input "}
              />
              {errors.phone && (
                <span className="text-red-500">{t("field_required")}</span>
              )}
            </div>
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
