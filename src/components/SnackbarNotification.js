import { Snackbar } from 'react-native-paper';
import { useSnackbar } from '../context/SnackbarContext';
import { useTheme } from '../context/ThemeContext';

const SnackbarNotification = () => {
    const { visible, message, hideSnackbar } = useSnackbar();
    const { theme } = useTheme();

    return (
        <Snackbar
            visible={visible}
            onDismiss={hideSnackbar}
            duration={3000}
            icon="alert"
            style={{ backgroundColor: theme.colors.onBackground }}
        >
            {message}
        </Snackbar>
    );
};

export default SnackbarNotification;
