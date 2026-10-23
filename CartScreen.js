
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen({ cart = [], onBack, onIncrease, onDecrease, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Ionicons name="arrow-back" size={25} color="#225C2B" />
        </Pressable>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.count}>{count}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {cart.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="cart-outline" size={65} color="#A8B6A3" />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.muted}>Add fresh products to get started.</Text>
          </View>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.productEmoji}>
                <Text style={{ fontSize: 38 }}>{item.image}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.muted}>{item.unit}</Text>
                <Text style={styles.price}>₹{item.price * item.quantity}</Text>
                <View style={styles.quantityRow}>
                  <Pressable style={styles.qtyButton} onPress={() => onDecrease?.(item.id)}>
                    <Ionicons name="remove" size={18} color="#2E7D32" />
                  </Pressable>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Pressable style={styles.qtyButton} onPress={() => onIncrease?.(item.id)}>
                    <Ionicons name="add" size={18} color="#2E7D32" />
                  </Pressable>
                </View>
              </View>
              <Pressable onPress={() => onRemove?.(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#B3261E" />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.total}>₹{total}</Text>
        </View>
        <Pressable
          disabled={cart.length === 0}
          style={[styles.checkout, cart.length === 0 && { opacity: 0.5 }]}
          onPress={onCheckout}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7F9F5' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 18,
    padding: 20, paddingTop: 25,
  },
  title: { flex: 1, fontSize: 25, fontWeight: 'bold', color: '#225C2B' },
  count: { color: '#778274' },
  content: { padding: 17, paddingBottom: 25, flexGrow: 1 },
  empty: { flex: 1, minHeight: 300, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 19, fontWeight: 'bold', marginTop: 18, color: '#263528' },
  muted: { fontSize: 12, color: '#778274', marginTop: 5 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 16, padding: 13, marginBottom: 13, gap: 12,
  },
  productEmoji: {
    width: 75, height: 85, backgroundColor: '#EAF5E5',
    borderRadius: 13, alignItems: 'center', justifyContent: 'center',
  },
  details: { flex: 1 },
  name: { fontSize: 15, fontWeight: 'bold', color: '#263528' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#225C2B', marginTop: 6 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', gap: 13, marginTop: 9 },
  qtyButton: {
    width: 30, height: 30, borderRadius: 9, backgroundColor: '#E2F2DF',
    alignItems: 'center', justifyContent: 'center',
  },
  quantity: { fontWeight: 'bold', color: '#263528' },
  footer: { padding: 20, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5EAE1' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 17 },
  totalLabel: { fontSize: 16, color: '#263528' },
  total: { fontSize: 22, fontWeight: 'bold', color: '#225C2B' },
  checkout: {
    backgroundColor: '#2E7D32', borderRadius: 14, padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  checkoutText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
});
