import { useState } from 'react';
import { List, Menu } from 'react-native-paper';
import { useGlobalStyles } from '../styles/globalStyles';
import { StyleSheet, Pressable } from 'react-native';

export default function DotMenu({itemID, props={}, items=[]}) {
    const styles = useGlobalStyles();

    const [visibleMenuId, setVisibleMenuId] = useState(null);
    const openMenu = (stationId) => setVisibleMenuId(stationId);
    const closeMenu = () => setVisibleMenuId(null);

    const handlePress = (onPress) => {
        closeMenu();
        if (onPress) {
            onPress();
        }
    }

    const itemRender = items.map((item, index) => {
        return (
            <Menu.Item 
                key={index} 
                title={item.title} 
                leadingIcon={item.icon} 
                onPress={() => handlePress(item.onPress)}
            />
        );
    });

    return (
        <Menu
            visible={visibleMenuId === itemID}
            onDismiss={closeMenu}
            anchorPosition='bottom'
            mode='flat'
            contentStyle={{...localStyles.dotMenu, ...styles.dotMenuColor}} 
            anchor={
                <Pressable onPress={() => openMenu(itemID)}>
                    <List.Icon {...props} icon="dots-vertical" />
                </Pressable>
            }
        >
            {itemRender}
        </Menu>
    );
}

const localStyles = StyleSheet.create({
    dotMenu: {
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
    },
});