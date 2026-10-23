
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ user, onBack, onEdit, onLogout }) {
  return (
    <View style={styles.screen}>
      <Pressable style={styles.back} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#225C2B" />
      </Pressable>

      <View style={styles.avatar}>
        <Ionicons name="person" size={55} color="#2E7D32" />
      </View>

      <Text style={styles.title}>{user?.name || 'Customer'}</Text>
      <Text style={styles.email}>{user?.email || 'No email available'}</Text>

      <View style={styles.card}>
        <ProfileRow icon="person-outline" label="Full Name" value={user?.name} />
        <ProfileRow icon="mail-outline" label="Email Address" value={user?.email} />
        <ProfileRow icon="shield-checkmark-outline" label="Account Type" value={user?.role || 'Customer'} />
      </View>

      <Pressable style={styles.editButton} onPress={onEdit}>
        <Ionicons name="create-outline" size={20} color="#FFFFFF" />
        <Text style={styles.editText}>Edit Profile</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={20} color="#B3261E" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

function ProfileRow({ icon, label, value }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={22} color="#2E7D32" />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || 'Not provided'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F9F5', padding: 22 },
  back: {
    width: 44, height: 44, borderRadius: 13, backgroundColor: '#E2F2DF',
    alignItems: 'center', justifyContent: 'center',
  },
  avatar: {
    width: 105, height: 105, borderRadius: 53, backgroundColor: '#E2F2DF',
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20,
  },
  title: { fontSize: 25, fontWeight: 'bold', color: '#225C2B', textAlign: 'center', marginTop: 14 },
  email: { fontSize: 14, color: '#778274', textAlign: 'center', marginTop: 6 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 17, padding: 16, marginTop: 28 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingVertical: 14 },
  label: { fontSize: 12, color: '#778274' },
  value: { fontSize: 15, color: '#263528', fontWeight: '600', marginTop: 4 },
  editButton: {
    backgroundColor: '#2E7D32', borderRadius: 13, padding: 15, marginTop: 24,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
  },
  editText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  logoutButton: {
    borderWidth: 1, borderColor: '#E8C7C4', borderRadius: 13, padding: 14, marginTop: 12,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 9,
  },
  logoutText: { color: '#B3261E', fontWeight: '600' },
});
