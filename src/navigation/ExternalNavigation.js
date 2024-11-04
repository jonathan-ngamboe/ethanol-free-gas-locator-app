import { Alert, Linking, Platform, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export async function openMap({ destinationName, destinationLat, destinationLon }) {
    console.log('destinationName', destinationName)
    console.log('destinationLat', destinationLat)
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${destinationLat},${destinationLon}`;
    // Remove any # symbols from the destination name to avoid any issues with the Maps URL
    const label = destinationName.replace(/#/g, '');

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
        Alert.alert(`No navigation app found to show directions to ${destinationName}`);
      }
    };

    await openLink();        
}

export async function openPhone(phoneNumber) {
    const url = `tel:${phoneNumber}`;
    await Linking.openURL(url);
}

export async function openLink(url) {
    await Linking.openURL(url);
}

export async function openEmail(email) {
    const url = `mailto:${email}`;
    await Linking.openURL(url);
}

export async function share(text) {
    await Share.share({
        message: text,
    });
}

export async function copyToClipboard(text) {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied to clipboard');
}