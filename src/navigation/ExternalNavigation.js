import { Alert, Linking, Platform } from 'react-native';

export function openMap({ destinationName, destinationLat, destinationLon }) {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${destinationLat},${destinationLon}`;
    const label = destinationName;

    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
        })
    
    const openLink = async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with map app, 
        await Linking.openURL(url);
      } else {
        Alert.alert(`No navigation app found to show directions to ${label}`);
      }
    };

    openLink();        
}

export function openPhone(phoneNumber) {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
}