import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';


export default function Modal({ initialSnapIndex = 1, snapToOnAction, renderItem }) {
  const theme = useTheme();

  const [hideContent, setHideContent] = useState(false);

  const bottomSheetModalRef = useRef(null);

  // Snap Points used to define the different height of the bottom sheet.
  const snapPoints = useMemo(() => [50, 300], []);

  // Open the bottom sheet when the component mounts
  useEffect(() => {
    bottomSheetModalRef.current?.present(); 
  }, []);

  // Function to snap to a specific point, defaults to index 0 (50%)
  const snapToPosition = useCallback((index = 0) => {
    bottomSheetModalRef.current?.snapToIndex(index);
  }, []);

  // Give the parent component the ability to snap the bottom sheet to a specific position
  useEffect(() => {
    if (snapToOnAction) {
      snapToOnAction(snapToPosition); // Pass the snap function to the parent to let it control the sheet position
    }
  }, [snapToOnAction, snapToPosition]);

  // Function to toggle the content visibility
  const toggleContent = () => {
    setHideContent(!hideContent);
  }


  return (
    <BottomSheetModal
      enableDynamicSizing={true}
      ref={bottomSheetModalRef}
      index={initialSnapIndex}  // Default to the initial snap point (30% by default)
      snapPoints={snapPoints}
      backgroundStyle={{ ...localStyles.modalBackground, backgroundColor: theme.colors.background, shadowColor: theme.colors.onSurface }}
      handleIndicatorStyle={localStyles.indicator}
      enablePanDownToClose={false}
      enableOverDrag={false}
      android_keyboardInputMode="adjustResize"
      onChange={toggleContent}
    >
      <BottomSheetView style={localStyles.contentContainer}>

      <Animated.View
        key={hideContent ? 'hidden' : 'visible'}
        entering={FadeIn.duration(350)}
        exiting={FadeOut.duration(200)}
        style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
        { !hideContent ? <></> : renderItem ? renderItem() : <Text>No content</Text> }

      </Animated.View>

      </BottomSheetView>

    </BottomSheetModal>
  );
}

const localStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },

  modalBackground: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  indicator: {
    backgroundColor: '#DDDDDD',
    width: 40,
  },

});