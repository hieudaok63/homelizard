import { useEffect, useState } from "react";
import { type LatLng } from "react-native-maps";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState<LatLng>();

  useEffect(() => {
    void (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getLastKnownPositionAsync({});
        if (!location) {
          location = await Location.getCurrentPositionAsync({});
        }
        setLocation(location.coords);
      } else {
        const location = await Location.geocodeAsync("Germany");
        if (location.length > 0) {
          setLocation(location[0]);
        }
      }
    })();
  }, []);
  return location;
};
