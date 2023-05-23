import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { alerts } from "../util/Constants";

function useLocation() {
  const [location, setLocation] = useState<location | null>(null);

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (granted) {
        /* Change the code below this comment */
        const lastKnownPosition = await Location.getLastKnownPositionAsync();
        if (!lastKnownPosition) {
          return;
        }
        const { latitude, longitude } = lastKnownPosition.coords;
        setLocation({ latitude, longitude });
      } else {
        alert(alerts.location);
        return;
      }
    } catch (error: any) {
      alert("Error while getting location: " + error.message);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  return location;
}

export default useLocation;
