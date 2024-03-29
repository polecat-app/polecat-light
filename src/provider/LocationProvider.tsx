import React, { createContext, useState, useEffect, useContext } from "react";
import useLocation from "../hooks/useLocation";
import getAddressFromCoordinates from "../api/Location";
import { combineNames } from "../util/Helpers";
import { getRegionFromLocation } from "../api/Region";
import { useTranslation } from "react-i18next";

type ContextProps = {
  location: location | null;
  setLocation: React.Dispatch<React.SetStateAction<location | null>>;
  geoName: string | null;
  region: region | null;
  locationName: string | null;
};

const LocationContext = createContext<ContextProps>({
  location: null,
  setLocation: () => {},
  geoName: null,
  region: null,
  locationName: "Loading location..",
});

interface Props {
  children: React.ReactNode;
}

const LocationProvider = (props: Props) => {
  // Location states
  const currentLocation = useLocation();
  const [location, setLocation] = useState<location | null>(null);
  const [geoName, setGeoName] = useState<string | null>(null);
  const [region, setRegion] = useState<region | null>(null);
  const [locationName, setLocationName] =
    useState<string | null>("Loading location..");

  // Update location by current location on mount
  useEffect(() => {
    if (!location && currentLocation) {
      setLocation(currentLocation);
    }
  }, [currentLocation]);

  const { i18n } = useTranslation();
  // @ts-ignore
  const language: Language = i18n.language;

  // Get location name by reverse geocoding, get region by location
  useEffect(() => {
    if (location) {
      getRegionFromLocation(location, language, setRegion);
      getAddressFromCoordinates(
        location.latitude,
        location.longitude,
        setGeoName
      );
    }
  }, [location, language]);

  // Set location name
  useEffect(() => {
    const aggregateLocationName = combineNames(geoName, region?.name);
    setLocationName(aggregateLocationName);
  }, [geoName, region]);

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        geoName,
        region,
        locationName,
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
