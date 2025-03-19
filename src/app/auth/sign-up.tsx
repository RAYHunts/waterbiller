import { useThemeColor } from '@/hooks/useThemeColor';
import useAuthStore from '@/store/authStore';
import { FontAwesome6 } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

const registerSchema = z
  .object({
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    address: z.string().min(5, 'Address must be at least 5 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const { register } = useAuthStore();
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const errorColor = useThemeColor({}, 'error');
  const [isShownPass, setIsShownPass] = useState({ pass: false, c_pass: false });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
      address: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const togglePass = (field: 'pass' | 'c_pass') => {
    if (field === 'pass') {
      setIsShownPass((prev) => ({ ...prev, pass: !prev.pass }));
    }
    if (field === 'c_pass') {
      setIsShownPass((prev) => ({ ...prev, c_pass: !prev.c_pass }));
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.contentContainer}>
      <Text style={[styles.title, { color: textColor }]}>Create Account</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor,
                  color: textColor,
                  borderColor: errors.email ? errorColor : textColor,
                },
              ]}
              placeholder="Email"
              placeholderTextColor={textColor}
              value={value}
              onChangeText={onChange}
            />
            {errors.email && (
              <Text style={[styles.errorText, { color: errorColor }]}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: backgroundColor,
                  color: textColor,
                  borderColor: errors.password ? errorColor : textColor,
                },
              ]}
              placeholder="Password"
              placeholderTextColor={textColor}
              value={value}
              onChangeText={onChange}
              secureTextEntry={!isShownPass.pass}
            />
            {errors.password && (
              <Text style={[styles.errorText, { color: errorColor }]}>
                {errors.password.message}
              </Text>
            )}
            <TouchableOpacity style={styles.eye}>
              <FontAwesome6
                name={isShownPass.pass ? 'eye-slash' : 'eye'}
                size={24}
                color={textColor}
                onPress={() => togglePass('pass')}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: backgroundColor,
                  color: textColor,
                  borderColor: errors.confirmPassword ? errorColor : textColor,
                },
              ]}
              placeholder="Confirm Password"
              placeholderTextColor={textColor}
              value={value}
              onChangeText={onChange}
              secureTextEntry={!isShownPass.c_pass}
            />
            {errors.confirmPassword && (
              <Text style={[styles.errorText, { color: errorColor }]}>
                {errors.confirmPassword.message}
              </Text>
            )}
            <TouchableOpacity style={styles.eye}>
              <FontAwesome6
                name={isShownPass.c_pass ? 'eye-slash' : 'eye'}
                size={24}
                color={textColor}
                onPress={() => togglePass('c_pass')}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <Controller
        control={control}
        name="phone_number"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: backgroundColor,
                  color: textColor,
                  borderColor: errors.phone_number ? errorColor : textColor,
                },
              ]}
              placeholder="Phone Number"
              placeholderTextColor={textColor}
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
            />
            {errors.phone_number && (
              <Text style={[styles.errorText, { color: errorColor }]}>
                {errors.phone_number.message}
              </Text>
            )}
          </View>
        )}
      />

      <View style={styles.addressContainer}>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <View style={styles.addressInputContainer}>
              <TextInput
                style={[
                  styles.addressInput,
                  {
                    backgroundColor: backgroundColor,
                    color: textColor,
                    borderColor: errors.address ? errorColor : textColor,
                  },
                ]}
                placeholder="Address"
                placeholderTextColor={textColor}
                value={value}
                onChangeText={onChange}
                multiline
              />
              {errors.address && (
                <Text style={[styles.errorText, { color: errorColor }]}>
                  {errors.address.message}
                </Text>
              )}
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: backgroundColor }]}
        onPress={handleSubmit(onSubmit)}>
        <Text style={[styles.buttonText, { color: textColor }]}>Create Account</Text>
      </TouchableOpacity>

      <Link href="/auth/sign-in" asChild>
        <TouchableOpacity style={styles.linkContainer}>
          <Text style={[styles.link, { color: textColor }]}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  addressInputContainer: {
    flex: 1,
  },
  addressInput: {
    height: 80,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  locationButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyTypeContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  propertyTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  propertyTypeButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  propertyTypeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  link: {
    fontSize: 14,
  },
  eye: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});
