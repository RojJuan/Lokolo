import * as Location from 'expo-location';
import React from 'react';
import { ActivityIndicator, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { WebView } from 'react-native-webview';

type Coordinates = {
	latitude: number;
	longitude: number;
};

const HomeScreen: React.FC = () => {
	const [coords, setCoords] = React.useState<Coordinates | null>(null);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		let isMounted = true;

		(async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					if (!isMounted) return;
					setErrorMessage('Location permission was denied.');
					setIsLoading(false);
					return;
				}

				const position = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.Balanced,
				});
				if (!isMounted) return;
				setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
			} catch (error) {
				if (!isMounted) return;
				const message = (error as Error)?.message ?? 'Failed to get current location.';
				setErrorMessage(message);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, []);

	const html: string | null = coords
		? `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />
    <style>
      html, body, #map { height: 100%; margin: 0; padding: 0; }
      .leaflet-control-attribution { font-size: 11px; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script
      src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      crossorigin=""
    ></script>
    <script>
      const lat = ${coords?.latitude ?? 0};
      const lng = ${coords?.longitude ?? 0};
      const map = L.map('map', { zoomControl: true }).setView([lat, lng], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker([lat, lng]).addTo(map).bindPopup('You are here');
    </script>
  </body>
</html>`
		: null;

	return (
		<SafeAreaView style={styles.safeArea}>
			{isLoading && (
				<View style={styles.centered}>
					<ActivityIndicator size="large" color="#4ECDC4" />
					<Text style={styles.statusText}>Fetching your location...</Text>
				</View>
			)}

			{!isLoading && errorMessage && (
				<View style={styles.centered}>
					<Text style={styles.errorText}>{errorMessage}</Text>
				</View>
			)}

			{!isLoading && !errorMessage && coords && (
				<View style={styles.mapContainer}>
					{Platform.OS === 'ios' ? (
						<MapView
							style={styles.map}
							initialRegion={{
								latitude: coords.latitude,
								longitude: coords.longitude,
								latitudeDelta: 0.01,
								longitudeDelta: 0.01,
							}}
							showsUserLocation
						>
							<Marker coordinate={{ latitude: coords.latitude, longitude: coords.longitude }} title="You are here" />
						</MapView>
					) : (
						html && (
							<WebView
								originWhitelist={["*"]}
								javaScriptEnabled
								domStorageEnabled
								style={styles.map}
								source={{ html }}
							/>
						)
					)}
					<View style={styles.coordsPill}>
						<Text style={styles.coordsText}>
							Lat: {coords.latitude.toFixed(6)} | Lng: {coords.longitude.toFixed(6)}
						</Text>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#fff',
	},
	centered: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
	statusText: {
		marginTop: 12,
		fontSize: 16,
		color: '#333',
	},
	errorText: {
		fontSize: 16,
		color: '#D9534F',
		textAlign: 'center',
	},
	mapContainer: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
	coordsPill: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 14,
		backgroundColor: 'rgba(0,0,0,0.6)',
		alignItems: 'center',
	},
	coordsText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
		letterSpacing: 0.3,
	},
});

export default HomeScreen;

