import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../../hooks/useLocation";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { Colors } from "../../styles/Colors";
import { Offsets } from "../../styles/Offsets";
import textStyles from "../../styles/TextStyles";
import TopBarContainer from "../../components/TopBarContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DiscoverStackParamList } from "../../types/navigation";
import { alerts } from "../../util/Constants";
import { LocationContext } from "../../provider/LocationProvider";
import { useTranslation } from "react-i18next";

type MapScreenProps = NativeStackScreenProps<DiscoverStackParamList, "Map">;

function MapScreen({ navigation }: MapScreenProps) {
  // Location context
  const locationContext = useContext(LocationContext);
  const { t } = useTranslation();

  // Save original location
  const [originalLocation, setOriginalLocation] = useState<location>({
    latitude: 52.04,
    longitude: 6.02,
  });
  useEffect(() => {
    setOriginalLocation({
      latitude: locationContext.location
        ? locationContext.location.latitude
        : 52.04,
      longitude: locationContext.location
        ? locationContext.location.longitude
        : 6.02,
    });
  }, []);

  // States
  const currentLocation = useLocation();
  const region = {
    latitude: originalLocation.latitude,
    longitude: originalLocation.longitude,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };
  const mapRef = useRef<any>(null);

  // Select new location
  function selectLocationHandler(event: {
    nativeEvent: { coordinate: location };
  }) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    locationContext.setLocation({ latitude: lat, longitude: lng });
  }

  // Move to current location
  function useCurrentLocationHandler() {
    const lat = currentLocation?.latitude;
    const lng = currentLocation?.longitude;
    if (lat && lng) {
      locationContext.setLocation({ latitude: lat, longitude: lng });
      mapRef.current?.animateToRegion({
        latitude: lat,
        longitude: lng,
      });
    } else {
      alert(alerts.location);
    }
  }

  // Press cancel
  function cancelHandler() {
    locationContext.setLocation(originalLocation);
    navigation.navigate("List");
  }

  return (
    <View style={styles.container}>
      {/* Map background */}
      <MapView
        ref={mapRef}
        region={region}
        style={styles.map}
        onPress={selectLocationHandler}
      >
        {locationContext.location && (
          <Marker coordinate={locationContext.location} />
        )}
      </MapView>

      {/* Top bar */}
      <View style={[styles.onMapTop, styles.shadow]}>
        <TopBarContainer title={t("pick location")}>
          <View style={styles.row}>
            <Ionicons
              style={{ marginRight: 5 }}
              name="location"
              size={15}
              color={Colors.AccentIcon}
            />
            <Text style={textStyles.basicAccentBold}>
              {locationContext.locationName}
            </Text>
          </View>
        </TopBarContainer>
      </View>

      {/* Bottom bar */}
      <View style={styles.onMapBottom}>
        <TouchableOpacity
          onPress={useCurrentLocationHandler}
          style={styles.buttonCurrentLocation}
        >
          <Ionicons name="navigate" size={32} color={Colors.Primary} />
        </TouchableOpacity>

        {/* Elements below map */}
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("List");
            }}
            style={styles.buttonConfirm}
          >
            <Text style={textStyles.basicAccentBold}>{t("confirm location")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelHandler} style={styles.buttonCancel}>
            <Text style={textStyles.basicAccentBold}>{t("cancel")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  onMapTop: {
    width: "100%",
    position: "absolute",
    zIndex: 5,
    top: 0,
  },
  onMapBottom: {
    width: "100%",
    position: "absolute",
    zIndex: 5,
    bottom: 0,
  },
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bottom: {
    backgroundColor: Colors.Primary,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: Offsets.DefaultMargin,
  },
  buttonCurrentLocation: {
    alignSelf: "flex-end",
    marginBottom: Offsets.LargeMargin,
    marginRight: Offsets.LargeMargin,
    backgroundColor: "rgba(100,100,100,0.5)",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    zIndex: 8,
  },
  buttonConfirm: {
    padding: Offsets.DefaultMargin,
    width: "100%",
    backgroundColor: Colors.AccentPrimary,
    margin: Offsets.DefaultMargin,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Offsets.DefaultMargin,
  },
  buttonCancel: {
    padding: Offsets.DefaultMargin,
    width: "100%",
    backgroundColor: Colors.Quaternary,
    margin: Offsets.DefaultMargin,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Offsets.DefaultMargin,
  },
  closeIcon: {
    color: Colors.AccentIcon,
  },
  shadow: {
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: Offsets.DefaultMargin,
  },
});
