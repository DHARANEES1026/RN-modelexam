
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritesScreen({ favorites = [], onBack, onToggleFavorite, onAddToCart, onProductPress }) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Ionicons name="arrow-back" size={25} color="#225C2B" />
        </Pressable>
        <Text style={styles.title}>My Favorites</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {favorites.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={65} color="#A8B6A3" />
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.muted}>Save products you love here.</Text>
          </View>
        ) : (
          favorites.map((item) => (
            <View style={styles.card} key={item.id}>
              <Pressable style={styles.product} onPress={() => onProductPress?.(item)}>
                <View style={styles.image}>
                  <Text style={{ fontSize: 36 }}>{item.image}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.muted}>{item.unit}</Text>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => onToggleFavorite?.(item)}>
                <Ionicons name="heart" size={24} color="#E45D65" />
              </Pressable>
              <Pressable style={styles.addButton} onPress={() => onAddToCart?.(item)}>
                <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F9F5' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 18, padding: 22 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#225C2B' },
  list: { padding: 17, flexGrow: 1 },
  empty: { flex: 1, minHeight: 300, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 19, fontWeight: 'bold', color: '#263528', marginTop: 15 },
  muted: { fontSize: 12, color: '#778274', marginTop: 5 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, marginBottom: 12,
  },
  product: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  image: {
    width: 70, height: 75, backgroundColor: '#EAF5E5',
    borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: 14, fontWeight: 'bold', color: '#263528' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#225C2B', marginTop: 6 },
  addButton: {
    width: 37, height: 37, borderRadius: 11, backgroundColor: '#2E7D32',
    alignItems: 'center', justifyContent: 'center',
  },
});
