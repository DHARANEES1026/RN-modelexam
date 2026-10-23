
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ onSignIn, onSignUp }) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9F5"
      />

      {/* Logo */}
      <View style={styles.logo}>
        <Ionicons name="leaf" size={42} color="#2E7D32" />
      </View>

      {/* App Name */}
      <Text style={styles.appName}>Fresh Basket</Text>
      <Text style={styles.tagline}>
        Fresh groceries, delivered with care.
      </Text>

      {/* Grocery Banner */}
      <View style={styles.banner}>
        <Text style={styles.fruits}>🍎 🥑 🍊</Text>
        <Text style={styles.vegetables}>🥕 🥦 🍌</Text>

        <Text style={styles.bannerText}>
          Eat Fresh. Live Well.
        </Text>

        <Text style={styles.bannerDescription}>
          Healthy food for a healthier lifestyle
        </Text>
      </View>

      {/* Welcome Message */}
      <Text style={styles.heading}>
        Your daily groceries,{' \n'}made easy
      </Text>

      <Text style={styles.description}>
        Discover fresh fruits, vegetables and everyday
        essentials in one place. Shop your favourites
        with Fresh Basket.
      </Text>

      {/* Sign In Button */}
      <Pressable
        style={({ pressed }) => [
          styles.signInButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={onSignIn}
      >
        <Text style={styles.signInText}>Sign In</Text>
        <Ionicons
          name="arrow-forward"
          size={20}
          color="#FFFFFF"
        />
      </Pressable>

      {/* Sign Up Button */}
      <Pressable
        style={({ pressed }) => [
          styles.signUpButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={onSignUp}
      >
        <Text style={styles.signUpText}>
          Create an Account
        </Text>
      </Pressable>

      {/* Footer */}
      <Text style={styles.footer}>
        FRESH FOOD • HAPPY LIFE
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7F9F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 35,
  },

  logo: {
    width: 82,
    height: 82,
    backgroundColor: '#E2F2DF',
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#225C2B',
  },

  tagline: {
    fontSize: 14,
    color: '#778274',
    marginTop: 7,
  },

  banner: {
    width: '100%',
    backgroundColor: '#EAF5E5',
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginVertical: 28,
  },

  fruits: {
    fontSize: 39,
    marginBottom: 8,
  },

  vegetables: {
    fontSize: 39,
  },

  bannerText: {
    fontSize: 19,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginTop: 15,
  },

  bannerDescription: {
    fontSize: 12,
    color: '#63745F',
    marginTop: 6,
    textAlign: 'center',
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#263528',
    textAlign: 'center',
    lineHeight: 35,
  },

  description: {
    fontSize: 14,
    color: '#7A8378',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 23,
  },

  signInButton: {
    width: '100%',
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  signUpButton: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#2E7D32',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#FFFFFF',
  },

  signUpText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonPressed: {
    opacity: 0.75,
  },

  footer: {
    fontSize: 10,
    color: '#929A8F',
    letterSpacing: 2,
    marginTop: 25,
  },
});
