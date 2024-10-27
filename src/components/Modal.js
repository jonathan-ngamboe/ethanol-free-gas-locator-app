import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';


export default function Modal({ initialSnapIndex = 1, snapToOnAction, renderItem, backgroundColor }) {
  const theme = useTheme();
  const [hideContent, setHideContent] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const [isContentReady, setIsContentReady] = useState(false);
  // Snap Points used to define the different height of the bottom sheet.
  const snapPoints = useMemo(() => [35, 300, 600], []);


  // Open the bottom sheet when the component mounts
  useEffect(() => {
    bottomSheetModalRef.current?.present();
    // Small delay to allow the content to be ready before showing it otherwise the scrollview will not work
    const timer = setTimeout(() => {
      setIsContentReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);


  // Function to snap to a specific point, defaults to index 0 (50%)
  const snapToPosition = useCallback((snapPoint) => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.snapToIndex(snapPoint);
    }
  }, []);

  // Give the parent component the ability to snap the bottom sheet to a specific position
  useEffect(() => {
    if (snapToOnAction) {
      snapToOnAction({
        minimize: minimizeModal,
        open: openModal,
        snapTo: snapToPosition
      });
    }
  }, [snapToOnAction, minimizeModal, openModal, snapToPosition]);


  // Function to toggle the content visibility
  const toggleContent = (index) => {
    setHideContent(!hideContent);
  };

  const openModal = useCallback(() => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.snapToIndex(1);
    }
  }, []);

  const minimizeModal = useCallback(() => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.snapToIndex(0);
    }
  }, []);
  

  return (
    <BottomSheetModal
      enableDynamicSizing={true}
      ref={bottomSheetModalRef}
      index={initialSnapIndex}  // Default to the initial snap point 
      snapPoints={snapPoints}
      backgroundStyle={{ ...localStyles.modalBackground, backgroundColor:  backgroundColor || theme.colors.background, shadowColor: theme.colors.onSurface }}
      handleIndicatorStyle={localStyles.indicator}
      enablePanDownToClose={false}
      enableOverDrag={false}
      android_keyboardInputMode="adjustResize"
      //onChange={toggleContent}
    >
      <BottomSheetView style={localStyles.contentContainer}>


        {isContentReady && (
          <Animated.View 
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
          >
            {renderItem ? renderItem() : <Text>No content</Text>}
          </Animated.View>
        )}

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
    height: '100%',
  },

  animatedContent: {
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0,
    height: '100%',
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