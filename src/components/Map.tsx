import { useCallback, useEffect, useState, FunctionComponent } from "react";
import "./../Map.css";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "598px",
  height: "461px",
};

const Map: FunctionComponent = () => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map>();
  const [visited, setVisited] = useState([
    {
      lat: 0,
      lng: 0,
    },
  ]);

  const [coord, setCoord] = useState<
    google.maps.LatLng | google.maps.LatLngLiteral
  >({
    lat: -3.745,
    lng: -38.523,
  });

  const getRandomRange = (from: number, to: number) => {
    return (Math.random() * (to - from) + from).toFixed(3);
  };

  const generateRandomPosition = () => {
    const lat = +getRandomRange(90, -90);
    const lng = +getRandomRange(180, -180);
    setCoord({
      lat,
      lng,
    });
    sitesVisited({
      lat,
      lng,
    });
  };

  const getPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoord({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const sitesVisited = (coord: any) => {
    setVisited((prev) => [...prev, coord]);
  };

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  return (
    <div className="box__container">
      <h5  className="text-center font__title p-3">
        Map project
      </h5>
      <div>
        <div className="d-flex justify-content-center">
          <LoadScript
          //!paste your APIKEYHERE
            googleMapsApiKey={""}
          >
            <GoogleMap
              onLoad={(map) => setGoogleMap(map)}
              mapContainerStyle={containerStyle}
              center={coord}
              zoom={15}
            >
              <Marker position={coord} options={{ map: googleMap }} />
            </GoogleMap>
          </LoadScript>
        </div>
        <div className="box_buttons">
          <button
            className="teleport__button"
            onClick={() => generateRandomPosition()}
          >
            Teleport me to somewhere random
          </button>
          <button className="home__button" onClick={() => getPosition()}>
            Bring me back home
          </button>
        </div>
        <div className="text-center text-light mt-3 bold">
          <>
            <span>
              <>
                Latitude:{coord.lat}, Longitude:{coord.lng}
              </>
            </span>
          </>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="">Visited places</h1>
        
        <ul>
          {visited.map((item, i) => (
            <li key={i}>
              <span>
                Latitude: {item.lat}, Longitude: {item.lng}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default Map;
