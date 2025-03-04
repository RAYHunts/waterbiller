import { AuthError, Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "@/utils/supabase";
import { Alert } from "react-native";

export interface RegisterPayload {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
}


interface AuthState {
    session: Session | null;
    isLoading: boolean;
    setSession: (session: Session | null) => void;
    login: (email: string, password: string) => Promise<User | AuthError | null>;
    register: (payload: RegisterPayload
    ) => Promise<User | AuthError | null>;
    logout: () => Promise<void>;
    refreshSession: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    session: null,
    isLoading: true,
    setSession: (session) => set({ session }),
    login: async (email, password) => {
        try {
            set({ isLoading: true });
            if (!email) return Promise.reject("Email is required");
            if (!password) return Promise.reject("Password is required");

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) return Promise.reject(error);
            set({ session: data.session, isLoading: false });
            return Promise.resolve(data.user);
        } catch (error) {
            set({ isLoading: false });
            return Promise.reject(error);
        }

    },

    register: async (payload) => {
        // set({ isLoading: true });
        // if (!payload.email) return Promise.reject("Email is required");
        // if (!payload.password) return Promise.reject("Password is required");

        // const { data, error } = await supabase.auth.signUp({
        //     email: payload.email,
        //     password: payload.password,
        //     options: {
        //         data: {
        //             first_name: payload.first_name,
        //             last_name: payload.last_name,
        //             address: payload.address,
        //             phone_number: payload.phone_number,
        //         },
        //     },
        // });
        // if (error) return Promise.reject(error);

        // set({ session: data.session, isLoading: false });
        // return Promise.resolve(data.user);


        try {
            set({ isLoading: true });
            if (!payload.email) return Promise.reject("Email is required");
            if (!payload.password) return Promise.reject("Password is required");

            const { data, error } = await supabase.auth.signUp({
                email: payload.email,
                password: payload.password,
                options: {
                    data: {
                        first_name: payload.first_name,
                        last_name: payload.last_name,
                        address: payload.address,
                        phone_number: payload.phone_number,
                    },
                },
            });
            if (error) return Promise.reject(error);
            set({ session: data.session, isLoading: false });
            return Promise.resolve(data.user);
        } catch (error) {
            set({ isLoading: false });
            return Promise.reject(error);
        }
    },
    logout: async () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Sure",
                onPress: async () => {
                    const { error } = await supabase.auth.signOut();
                    if (error) return Promise.reject(error);
                    set({ session: null });
                    return Promise.resolve();
                },
            },
        ]);
    },



    // useEffect(() => {
    //     supabase.auth
    //       .refreshSession()
    //       .then(async (session) => {
    //         console.log("session", session);
    //         setSession(session.data.session);
    //         if (session.error) await logout();
    //       })
    //       .catch(async (error) => {
    //         console.log("error", error);
    //         await toast.show({
    //           variant: "left-accent",
    //           placement: "top",
    //           title: "Error",
    //           description: "Please login again",
    //           bg: "danger.500",
    //         });
    //       });
    //   }, []);
    refreshSession: async () => {
        try {
            set({ isLoading: true });
            supabase.auth.refreshSession().then((session) => {
                set({ session: session.data.session, isLoading: false });
                if (session.error) {
                    set({ session: null, isLoading: false });
                }
            }
            ).catch((error) => {
                set({ session: null, isLoading: false });
            });
        } catch (error) {
            set({ session: null, isLoading: false });
        }
    },
}));

export default useAuthStore;