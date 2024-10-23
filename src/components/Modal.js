import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme } from 'react-native-paper';

export default function Modal() {
  const theme = useTheme();

  const bottomSheetModalRef = useRef(null);

  // Snap Points used to define the different height of the bottom sheet.
  const snapPoints = useMemo(() => [50, '30%'], []);

  useEffect(() => {
    bottomSheetModalRef.current?.present(); // present modal on component mount
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ ...localStyles.modalBackground, backgroundColor: theme.colors.background, shadowColor: theme.colors.onSurface }}
      handleIndicatorStyle={localStyles.indicator}
      enablePanDownToClose={false}
      enableOverDrag={false}
      android_keyboardInputMode="adjustResize"
    >
      <BottomSheetView style={localStyles.contentContainer}>
        <Text>Content</Text>
      </BottomSheetView>

    </BottomSheetModal>
  );
}

const localStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
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
  }
});