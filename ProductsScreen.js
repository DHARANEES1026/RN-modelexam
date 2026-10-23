
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

const PRODUCTS = [
  { id: '1', name: 'Apple', category: 'Fruits', price: 120, unit: '1 kg', image: '🍎' },
  { id: '2', name: 'Banana', category: 'Fruits', price: 60, unit: '1 dozen', image: '🍌' },
  { id: '3', name: 'Orange', category: 'Fruits', price: 90, unit: '1 kg', image: '🍊' },
  { id: '4', name: 'Mango', category: 'Fruits', price: 100, unit: '1 kg', image: '🥭' },
  { id: '5', name: 'Tomato', category: 'Vegetables', price: 35, unit: '1 kg', image: '🍅' },
  { id: '6', name: 'Carrot', category: 'Vegetables', price: 45, unit: '1 kg', image: '🥕' },
  { id: '7', name: 'Broccoli', category: 'Vegetables', price: 80, unit: '1 piece', image: '🥦' },
  { id: '8', name: 'Milk', category: 'Dairy', price: 30, unit: '500 ml', image: '🥛' },
  { id: '9', name: 'Cheese', category: 'Dairy', price: 150, unit: '200 g', image: '🧀' },
  { id: '10', name: 'Bread', category: 'Bakery', price: 40, unit: '1 loaf', image: '🍞' },
];

const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery'];

export default function ProductsScreen({
  user,
  cart = [],
  onAddToCart,
  onOpenCart,
  onLogout,
  onProductPress,
  favorites = [],
  onToggleFavorite,
  onOpenFavorites,
  onOpenProfile,
  onOpenAdmin,
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const isFavorite = (item) =>
    favorites.some((favorite) => favorite.id === item.id);

  const handleAddToCart = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    } else {
      Alert.alert('Cart', 'The Add to Cart function is not connected yet.');
    }
  };

  const handleToggleFavorite = (item) => {
    if (onToggleFavorite) {
      onToggleFavorite(item);
    } else {
      Alert.alert('Favorites', 'The Favorites function is not connected yet.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Hello, {user?.name || user?.userName || 'Customer'}!</Text>
          <Text style={styles.subtitle}>What would you like to buy today?</Text>
        </View>

        <Pressable style={styles.cartButton} onPress={onOpenCart}>
          <Text style={styles.cartIcon}>🛒</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        </Pressable>
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search grocery products..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      {/* Quick navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickNav}
        contentContainerStyle={styles.quickNavContent}
      >
        <Pressable style={styles.navButton} onPress={onOpenFavorites}>
          <Text style={styles.navButtonText}>❤️ Favorites</Text>
        </Pressable>

        <Pressable style={styles.navButton} onPress={onOpenProfile}>
          <Text style={styles.navButtonText}>👤 Profile</Text>
        </Pressable>

        {user?.role?.toLowerCase() === 'admin' && (
          <Pressable style={styles.navButton} onPress={onOpenAdmin}>
            <Text style={styles.navButtonText}>⚙️ Admin</Text>
          </Pressable>
        )}

        <Pressable style={styles.navButton} onPress={onLogout}>
          <Text style={styles.navButtonText}>↪ Sign Out</Text>
        </Pressable>
      </ScrollView>

      {/* Section title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Daily Grocery</Text>
        <Text style={styles.productCount}>
          {filteredProducts.length} products
        </Text>
      </View>

      {/* Category filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Product list */}
      <ScrollView
        style={styles.productScroll}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
      >
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>
          </View>
        ) : (
          filteredProducts.map((item) => (
            <View key={item.id} style={styles.productCard}>
              {/* Favorite button */}
              <Pressable
                style={styles.favoriteButton}
                onPress={() => handleToggleFavorite(item)}
                accessibilityLabel={
                  isFavorite(item)
                    ? `Remove ${item.name} from favorites`
                    : `Add ${item.name} to favorites`
                }
              >
                <Text style={styles.favoriteIcon}>
                  {isFavorite(item) ? '❤️' : '🤍'}
                </Text>
              </Pressable>

              {/* Product image */}
              <Pressable
                style={styles.productImageContainer}
                onPress={() => onProductPress?.(item)}
              >
                <Text style={styles.productImage}>{item.image}</Text>
              </Pressable>

              {/* Updated product name Pressable */}
              <Pressable onPress={() => onProductPress?.(item)}>
                <Text style={styles.productName}>{item.name}</Text>
              </Pressable>

              <Text style={styles.productCategory}>{item.category}</Text>
              <Text style={styles.productUnit}>{item.unit}</Text>

              <View style={styles.productBottom}>
                <Text style={styles.productPrice}>₹{item.price}</Text>

                <Pressable
                  style={styles.addButton}
                  onPress={() => handleAddToCart(item)}
                >
                  <Text style={styles.addButtonText}>+ Add</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F5',
    paddingTop: 45,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 18,
  },
  headerText: {
    flex: 1,
    paddingRight: 10,
  },
  greeting: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#183D2B',
  },
  subtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
  },
  cartButton: {
    backgroundColor: '#E5F2E8',
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    fontSize: 23,
  },
  cartBadge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#F15B45',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
    marginBottom: 15,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E8E2',
    fontSize: 14,
    color: '#183D2B',
  },
  quickNav: {
    maxHeight: 44,
    marginBottom: 18,
  },
  quickNavContent: {
    paddingHorizontal: 18,
    gap: 9,
  },
  navButton: {
    backgroundColor: '#E5F2E8',
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 12,
  },
  navButtonText: {
    color: '#24583A',
    fontWeight: '600',
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#183D2B',
  },
  productCount: {
    color: '#777',
    fontSize: 12,
  },
  categoryScroll: {
    maxHeight: 43,
    marginBottom: 14,
  },
  categoryContent: {
    paddingHorizontal: 18,
    gap: 9,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E7E0',
  },
  categoryButtonActive: {
    backgroundColor: '#2E7D46',
    borderColor: '#2E7D46',
  },
  categoryText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#fff',
  },
  productScroll: {
    flex: 1,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EDF0EA',
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    right: 9,
    top: 9,
    zIndex: 1,
    backgroundColor: '#F7F9F5',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 17,
  },
  productImageContainer: {
    backgroundColor: '#F0F7EE',
    borderRadius: 14,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  productImage: {
    fontSize: 54,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#183D2B',
    marginTop: 2,
  },
  productCategory: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  productUnit: {
    fontSize: 11,
    color: '#999',
    marginTop: 3,
  },
  productBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24583A',
  },
  addButton: {
    backgroundColor: '#2E7D46',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#183D2B',
  },
  emptyText: {
    fontSize: 13,
    color: '#777',
    marginTop: 7,
  },
});
