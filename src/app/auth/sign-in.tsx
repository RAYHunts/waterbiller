import { router } from "expo-router";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import useAuthStore from "@/store/authStore";
import { FontAwesome6 } from "@expo/vector-icons";

type SignInPayload = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<SignInPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInPayload) => {
    await login(data.email, data.password);
  };

  const handleHide = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Controller control={control} name="email" render={({ field: { onChange, value } }) => <TextInput style={styles.input} placeholder="Email" value={value} onChangeText={onChange} />} />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <View style={styles.passwordInputContainer}>
              <TextInput style={styles.passwordInput} secureTextEntry={!showPassword} placeholder="Password" value={value} onChangeText={onChange} />
              <TouchableOpacity style={styles.eyeIcon} onPress={handleHide}>
                <Text>{showPassword ? <FontAwesome6 name="eye-slash" size={20} /> : <FontAwesome6 name="eye" size={20} />}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/sign-up")}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)", // Replaced shadow* with boxShadow
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signupButtonText: {
    color: "#007bff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
