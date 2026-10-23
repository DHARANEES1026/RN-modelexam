
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ onBack, onSignIn, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Customer');

  const handleRegister = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Your password must contain at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'The passwords do not match.');
      return;
    }

    if (onRegister) {
      onRegister({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      });
    } else {
      Alert.alert('Success', 'Demo registration completed.');
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
          <Ionicons name="arrow-back" size={24} color="#225C2B" />
        </Pressable>

        <View style={styles.logo}>
          <Ionicons name="leaf" size={35} color="#2E7D32" />
        </View>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join Fresh Basket and shop fresh every day.
        </Text>

        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#778274" />
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#9AA397"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
          />
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

        <Text style={styles.label}>Account Type</Text>
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
                size={19}
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

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#778274"
          />
          <TextInput
            style={styles.input}
            placeholder="At least 6 characters"
            placeholderTextColor="#9AA397"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#778274"
          />
          <TextInput
            style={styles.input}
            placeholder="Re-enter your password"
            placeholderTextColor="#9AA397"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <Pressable
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerText}>Create Account</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>

        <View style={styles.signInRow}>
          <Text style={styles.signInHint}>Already have an account? </Text>
          <Pressable onPress={onSignIn}>
            <Text style={styles.signInLink}>Sign In</Text>
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
    paddingTop: 35,
    paddingBottom: 30,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E2F2DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  logo: {
    width: 65,
    height: 65,
    borderRadius: 21,
    backgroundColor: '#E2F2DF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#225C2B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#778274',
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#263528',
    marginBottom: 8,
    marginTop: 13,
  },
  inputContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5D9',
    borderRadius: 12,
    paddingHorizontal: 13,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 10,
    fontSize: 14,
    color: '#263528',
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    minHeight: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
    fontWeight: '600',
  },
  selectedRoleText: {
    color: '#FFFFFF',
  },
  registerButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 14,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },
  signInHint: {
    fontSize: 14,
    color: '#778274',
  },
  signInLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  footer: {
    fontSize: 10,
    color: '#929A8F',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 25,
  },
});
