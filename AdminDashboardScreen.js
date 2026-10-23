
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboardScreen({ user, products = [], onBack, onManageProducts, onLogout }) {
  const actions = [
    { title: 'Manage Products', subtitle: 'Add, edit, and remove products', icon: 'cube-outline', action: onManageProducts },
    { title: 'Orders', subtitle: 'Review customer orders', icon: 'receipt-outline', action: () => {} },
    { title: 'Customers', subtitle: 'Customer account overview', icon: 'people-outline', action: () => {} },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>FRESH BASKET</Text>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Welcome, {user?.name || 'Administrator'}</Text>
        </View>
        <Pressable onPress={onLogout}>
          <Ionicons name="log-out-outline" size={25} color="#B3261E" />
        </Pressable>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryIcon}>
          <Ionicons name="cube-outline" size={27} color="#2E7D32" />
        </View>
        <Text style={styles.summaryLabel}>Products available</Text>
        <Text style={styles.summaryValue}>{products.length}</Text>
      </View>

      <Text style={styles.sectionTitle}>Administration</Text>

      {actions.map((item) => (
        <Pressable key={item.title} style={styles.actionCard} onPress={item.action}>
          <View style={styles.actionIcon}>
            <Ionicons name={item.icon} size={25} color="#2E7D32" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>{item.title}</Text>
            <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={21} color="#778274" />
        </Pressable>
      ))}

      <Pressable style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>Back to Products</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F9F5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  eyebrow: { fontSize: 10, color: '#2E7D32', fontWeight: 'bold', letterSpacing: 2 },
  title: { fontSize: 24, color: '#225C2B', fontWeight: 'bold', marginTop: 5 },
  subtitle: { color: '#778274', marginTop: 6 },
  summary: { backgroundColor: '#E2F2DF', borderRadius: 18, padding: 20, marginBottom: 28 },
  summaryIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  summaryLabel: { color: '#52624F', marginTop: 15 },
  summaryValue: { fontSize: 31, fontWeight: 'bold', color: '#225C2B', marginTop: 4 },
  sectionTitle: { fontSize: 19, fontWeight: 'bold', color: '#263528', marginBottom: 14 },
  actionCard: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 15, backgroundColor: '#FFFFFF', borderRadius: 15, marginBottom: 12 },
  actionIcon: { width: 47, height: 47, borderRadius: 13, backgroundColor: '#EAF5E5', alignItems: 'center', justifyContent: 'center' },
  actionTitle: { fontSize: 15, color: '#263528', fontWeight: 'bold' },
  actionSubtitle: { fontSize: 12, color: '#778274', marginTop: 5 },
  backButton: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 13, alignItems: 'center', marginTop: 12 },
  backText: { color: '#FFFFFF', fontWeight: 'bold' },
});
