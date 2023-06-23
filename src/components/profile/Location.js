import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";

const Location = ({ notFound, setNotFound }) => {
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const address = JSON.parse(sessionStorage.getItem("user")).updateInfo.city;
  // console.log(address);
  // const address = "asd";
  useEffect(() => {
    setTimeout(() => {
      (async function myFunc() {
        const results = await getGeocode({ address });
        // console.log(results[0]);
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
      })();
    }, 200);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selected != null) {
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [selected]);

  // console.log(selected);

  if (!isLoaded) return <h3 style={{ marginTop: "160px" }}>Loading..</h3>;

  if (selected != null) {
    return (
      <div className="profileCardMap">
        <GoogleMap
          zoom={9}
          center={selected && selected}
          mapContainerClassName="mapContainer"
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    );
  }
};

Location.propTypes = {
  notFound: PropTypes.bool.isRequired,
  setNotFound: PropTypes.func.isRequired,
};

export default Location;
