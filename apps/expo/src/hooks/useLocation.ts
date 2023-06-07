import { useEffect, useState } from "react";
import { type LatLng } from "react-native-maps";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState<LatLng>();
  const [locationLoaded, setLocationLoaded] = useState(false);

  useEffect(() => {
    void (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getLastKnownPositionAsync({});
        if (!location) {
          location = await Location.getCurrentPositionAsync({});
        }
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        const location = (await Location.geocodeAsync("Germany"))[0];
        if (location) {
          setLocation({
            latitude: location.latitude,
            longitude: location.longitude,
          });
        }
      }
      setLocationLoaded(true);
    })();
  }, []);
  return { location, locationLoaded };
};
