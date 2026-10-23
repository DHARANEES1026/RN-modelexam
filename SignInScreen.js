
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen({ onBack, onSignUp, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Customer');

  
const handleSignIn = () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert(
      'Required Fields',
      'Please enter your email and password.'
    );
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    Alert.alert('Invalid Email', 'Enter a valid email address.');
    return;
  }

  if (onLogin) {
    onLogin({
      email: email.trim(),
      password,
      role,
    });
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={25} color="#225C2B" />
        </Pressable>

        <View style={styles.logo}>
          <Ionicons name="leaf" size={34} color="#2E7D32" />
        </View>

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Sign in to your Fresh Basket account
        </Text>

        <Text style={styles.label}>Sign in as</Text>
        <View style={styles.roleContainer}>
          {['Customer', 'Admin'].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.roleButton,
                role === item && styles.selectedRole,
              ]}
              onPress={() => setRole(item)}
            >
              <Ionicons
                name={item === 'Admin' ? 'shield-checkmark' : 'person'}
                size={20}
                color={role === item ? '#FFFFFF' : '#2E7D32'}
              />
              <Text
                style={[
                  styles.roleText,
                  role === item && styles.selectedRoleText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#778274" />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9AA397"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#778274" />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9AA397"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <Pressable style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Pressable onPress={onSignUp}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>FRESH FOOD • HAPPY LIFE</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F9F5',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 45,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#E2F2DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: '#E2F2DF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#225C2B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#778274',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#263528',
    marginBottom: 9,
    marginTop: 15,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#D5DFD1',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  selectedRole: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  roleText: {
    color: '#2E7D32',
    fontSize: 15,
    fontWeight: '600',
  },
  selectedRoleText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5D9',
    borderRadius: 12,
    paddingHorizontal: 14,
    minHeight: 54,
  },
  input: {
    flex: 1,
    paddingVertical: 13,
    paddingLeft: 10,
    fontSize: 15,
    color: '#263528',
  },
  signInButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    padding: 17,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  signupText: {
    color: '#778274',
    fontSize: 14,
  },
  signupLink: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    fontSize: 10,
    color: '#929A8F',
    letterSpacing: 2,
    marginTop: 30,
  },
});
