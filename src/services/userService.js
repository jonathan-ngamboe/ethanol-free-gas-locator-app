import { supabase } from "../../lib/supabase";


export const getUser = async (showSnackbar) => {
    try {
        const { data, error } = await supabase.auth.getUser();
        
        if (error) {
            showSnackbar('Error fetching user data', error);
            return { error, data: null };
        }

        const randomNum = Math.floor(Math.random() * 1000);
        const formattedUser = {
            firstName: data.user?.user_metadata?.first_name,
            lastName: data.user?.user_metadata?.last_name,
            email: data.user?.email,
            isPro: data.user?.user_metadata?.is_pro || false,
            avatar: data.user?.user_metadata?.avatar_url || 'https://avatar.iran.liara.run/public',
            bannerImage: data.user?.user_metadata?.banner_image_url || `https://picsum.photos/seed/${randomNum}/500/200`,
        };

        return { data: { user: formattedUser }, error: null };
    } catch (error) {
        showSnackbar('An unexpected error occurred while fetching user data', error);
        return { error, data: null };
    }
};

export const deleteUser = async (showSnackbar) => {
    try {
        const { error } = await supabase.rpc('deleteUser');
        
        if (error) {
            showSnackbar('Error deleting user', error);
            console.log('Error deleting user:', error);
            return { error };
        } else {
            showSnackbar('User deleted successfully');
        }

        return { error: null };
    } catch (error) {
        console.log('Error deleting user:', error);
        showSnackbar('An unexpected error occurred while deleting user', error);
        return { error };
    }
}