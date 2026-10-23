
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailsScreen({ product, onBack, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
        <Pressable onPress={onBack}><Text>Go Back</Text></Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 22 }}>
      <Pressable style={styles.back} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#225C2B" />
      </Pressable>

      <View style={styles.imageBox}>
        <Text style={styles.emoji}>{product.image}</Text>
      </View>

      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.unit}>{product.unit}</Text>
      <Text style={styles.price}>₹{product.price}</Text>

      <Text style={styles.heading}>Product Details</Text>
      <Text style={styles.description}>
        Enjoy {product.name.toLowerCase()} with your daily meals.
        This grocery item is available in the Fresh Basket store.
      </Text>

      <Text style={styles.heading}>Quantity</Text>
      <View style={styles.quantityRow}>
        <Pressable
          style={styles.quantityButton}
          onPress={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          <Ionicons name="remove" size={22} color="#2E7D32" />
        </Pressable>
        <Text style={styles.quantity}>{quantity}</Text>
        <Pressable
          style={styles.quantityButton}
          onPress={() => setQuantity((q) => q + 1)}
        >
          <Ionicons name="add" size={22} color="#2E7D32" />
        </Pressable>
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => onAddToCart?.(product, quantity)}
      >
        <Ionicons name="cart-outline" size={22} color="#FFFFFF" />
        <Text style={styles.addText}>
          Add to Cart • ₹{product.price * quantity}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F5' },
  back: {
    width: 45, height: 45, borderRadius: 14,
    backgroundColor: '#E2F2DF', alignItems: 'center',
    justifyContent: 'center', marginBottom: 20,
  },
  imageBox: {
    height: 240, borderRadius: 24, backgroundColor: '#EAF5E5',
    alignItems: 'center', justifyContent: 'center',
  },
  emoji: { fontSize: 110 },
  category: { color: '#2E7D32', fontWeight: 'bold', marginTop: 24 },
  name: { fontSize: 27, fontWeight: 'bold', color: '#263528', marginTop: 8 },
  unit: { color: '#778274', marginTop: 6 },
  price: { fontSize: 25, fontWeight: 'bold', color: '#225C2B', marginTop: 12 },
  heading: { fontSize: 18, fontWeight: 'bold', color: '#263528', marginTop: 25 },
  description: { fontSize: 14, lineHeight: 22, color: '#778274', marginTop: 10 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', gap: 22, marginTop: 14 },
  quantityButton: {
    width: 43, height: 43, borderRadius: 12, backgroundColor: '#E2F2DF',
    alignItems: 'center', justifyContent: 'center',
  },
  quantity: { fontSize: 19, fontWeight: 'bold', color: '#263528' },
  addButton: {
    backgroundColor: '#2E7D32', padding: 17, borderRadius: 14,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    gap: 10, marginTop: 30,
  },
  addText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
});
