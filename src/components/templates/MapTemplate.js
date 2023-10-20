/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {COLORS, IMGS, MARGINS, PADDINGS} from '../../constants';
import MapView, {
  Marker,
  AnimatedRegion,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  getCurrentLocation,
  locationPermission,
} from '../../helper/helperFunction';
import PressItem from '../atoms/PressItem';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapTemplate = props => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDMxoBJRH-Ia5Ik-tMFi3gTBE_2pEcMXv4';
  const mapRef = useRef();
  const markerRef = useRef();
  const [duration, setDuration] = useState(0);

  //calculate estimate time arrival
  var hours = new Date().getHours();
  var mins = new Date().getMinutes();
  const combineMins = mins + Math.ceil(duration);
  console.log('CurrentMin', mins);
  console.log('CombineMin', combineMins);
  console.log('All minute', Math.floor(hours * 60 + combineMins));
  const allMins = Math.floor(hours * 60 + combineMins);
  let calculateHour = Math.floor(allMins / 60);
  let minutes = allMins % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  console.log('Calculate hour', `${calculateHour}hrs:${minutes}mins`);
  var time = new Date();
  time.setHours(calculateHour);
  time.setMinutes(minutes);
  console.log(
    time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
  );

  const [state, setState] = useState({
    currentLoc: {
      latitude: 21.9162,
      longitude: 95.956,
    },
    destinationCords: {},
    coordinate: new AnimatedRegion({
      latitude: 21.9162,
      longitude: 95.956,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    heading: 0,
  });
  const {currentLoc, destinationCords, coordinate, heading} = state;
  useEffect(() => {
    getLiveLocation();
  }, []);

  //get live location
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      animate(latitude, longitude);
      console.log('get live location after 5 seconds');
      console.log('CurrentLocation', latitude, longitude);
      updateState({
        heading: heading,
        currentLoc: {latitude, longitude},
        destinationCords: {
          latitude: 16.861728343996752,
          longitude: 96.10830536754497,
        },
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  const updateState = data => setState(state => ({...state, ...data}));

  //animate live tracking
  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS === 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  //on center map region
  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: currentLoc.latitude,
      longitude: currentLoc.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  //get live location after 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  //render view
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.row}>
          <Text style={styles.normalText}>Address:</Text>
          <Text style={styles.boldText}>{props.detailsData.address}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.normalText}>Estimated time of arrival:</Text>
          <Text style={styles.boldText}>
            {time.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </Text>
        </View>
      </View>

      <View style={styles.mapView}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          mapType={'satellite'}
          style={{borderRadius: 12, flex: 4.5}}
          initialRegion={{
            ...currentLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker.Animated ref={markerRef} coordinate={coordinate}>
            <Image
              source={IMGS.bike}
              style={{
                width: 35,
                height: 35,
                transform: [{rotate: `${heading}deg`}],
              }}
              resizeMode="contain"
            />
          </Marker.Animated>
          {Object.keys(destinationCords).length > 0 && (
            <Marker coordinate={destinationCords}>
              <Image
                source={IMGS.destinationMark}
                style={{width: 36, height: 38}}
                resizeMode="cover"
              />
            </Marker>
          )}
          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={currentLoc}
              destination={destinationCords}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={6}
              strokeColor={COLORS.primary}
              optimizeWaypoints={true}
              onReady={result => {
                setDuration(result.duration);
                console.log('Duration', result.duration);
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
              }}
            />
          )}
        </MapView>
        <PressItem onPress={onCenter}>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.gray,
              backgroundColor: COLORS.lightGray,
              padding: PADDINGS.p14,
            }}>
            <Image
              source={IMGS.recenterMap}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          </View>
        </PressItem>
      </View>
    </View>
  );
};

export default MapTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingTop: PADDINGS.p10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: MARGINS.m10,
    marginRight: MARGINS.m10,
  },
  normalText: {
    fontSize: 12,
    flex: 1,
  },
  boldText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.black,
    flex: 1,
  },
  divider: {
    height: 1,
    marginTop: MARGINS.m14,
    marginBottom: MARGINS.m14,
    backgroundColor: COLORS.gray,
    marginLeft: MARGINS.m10,
    marginRight: MARGINS.m10,
  },
  mapView: {
    flex: 4.5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
});
