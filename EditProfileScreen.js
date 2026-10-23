
import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Pressable, Alert, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen({ user, onBack, onSave }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Missing Details', 'Please enter your name and email.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    onSave?.({ ...user, name: name.trim(), email: email.trim().toLowerCase() });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 22 }}>
      <Pressable style={styles.back} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#225C2B" />
      </Pressable>

      <Text style={styles.title}>Edit Profile</Text>
      <Text style={styles.subtitle}>Update your account information.</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F9F5' },
  back: {
    width: 44, height: 44, borderRadius: 13, backgroundColor: '#E2F2DF',
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 27, fontWeight: 'bold', color: '#225C2B', marginTop: 25 },
  subtitle: { fontSize: 14, color: '#778274', marginTop: 7, marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#263528', marginTop: 18, marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DDE5D9',
    borderRadius: 12, padding: 15, fontSize: 15, color: '#263528',
  },
  saveButton: { backgroundColor: '#2E7D32', padding: 16, borderRadius: 13, alignItems: 'center', marginTop: 30 },
  saveText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
