import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeStore } from '@/store/themeStore';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const colors = {
    background: '#f5f5f5',
    text: '#333333',
  };

  const { setPreferredTheme, preferredTheme } = useThemeStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={[styles.container]}>
        <View style={styles.userInfoSection}>
          <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.userImage} />
          <ThemedText style={[styles.userName]}>John Doe</ThemedText>
          <ThemedText style={[styles.userEmail]}>john.doe@example.com</ThemedText>
        </View>

        <View style={styles.menuWrapper}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <ThemedText style={[styles.menuItemText]}>Profile</ThemedText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <ThemedText style={[styles.menuItemText]}>Meter Device</ThemedText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.menuItem}>
              <ThemedText style={[styles.menuItemText]}>About App</ThemedText>
            </View>
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <ThemedText style={[styles.menuItemText]}>Theme</ThemedText>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.themeButton, preferredTheme === 'system' && styles.activeButton]}
                onPress={() => setPreferredTheme('system')}>
                <FontAwesome6 size={12} name="mobile-screen" color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.themeButton, preferredTheme === 'light' && styles.activeButton]}
                onPress={() => setPreferredTheme('light')}>
                <FontAwesome6 size={12} name="sun" color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.themeButton, preferredTheme === 'dark' && styles.activeButton]}
                onPress={() => setPreferredTheme('dark')}>
                <FontAwesome6 size={12} name="moon" color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              /* Handle logout */
            }}>
            <View style={styles.menuItem}>
              <ThemedText style={[styles.menuItemText]}>Logout</ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
  },
  menuWrapper: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemText: {
    fontSize: 18,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeButton: {
    flex: 1,
    padding: 1,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  activeButton: {
    backgroundColor: '#BB86FC',
  },
});

export default SettingsScreen;
