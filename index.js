
import React, { useState } from 'react';
import {
  View,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';

const INITIAL_PRODUCTS = [
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

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  // Demo account storage
  const [accounts, setAccounts] = useState([]);

  // Logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Selected product for details
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart items
  const [cart, setCart] = useState([]);

  // Favorite products
  const [favorites, setFavorites] = useState([]);

  // Previous screen for back navigation
  const [previousScreen, setPreviousScreen] = useState('Products');

  // Register account
  const handleRegister = (details) => {
    const name = (details.name || '').trim();
    const email = (details.email || '').trim().toLowerCase();
    const password = details.password || '';
    const role = details.role || 'Customer';

    if (!name || !email || !password) {
      Alert.alert('Missing Details', 'Please fill in all required fields.');
      return;
    }

    const accountExists = accounts.some(
      (account) => account.email === email
    );

    if (accountExists) {
      Alert.alert('Account Exists', 'This email is already registered.');
      return;
    }

    const newAccount = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role,
    };

    setAccounts((previous) => [...previous, newAccount]);

    Alert.alert(
      'Registration Successful',
      'Your account has been created. Please sign in.',
      [
        {
          text: 'Sign In',
          onPress: () => setCurrentScreen('SignIn'),
        },
      ]
    );
  };

  // Sign in
  const handleLogin = ({ email, password, role }) => {
    const normalizedEmail = (email || '').trim().toLowerCase();

    const account = accounts.find(
      (item) =>
        item.email === normalizedEmail &&
        item.password === password &&
        item.role.toLowerCase() === (role || 'Customer').toLowerCase()
    );

    if (!account) {
      Alert.alert(
        'Login Failed',
        'Check your email, password, and selected account type. Register an account first if you are a new user.'
      );
      return;
    }

    setCurrentUser(account);
    setCurrentScreen(
      account.role.toLowerCase() === 'admin'
        ? 'AdminDashboard'
        : 'Products'
    );
  };

  // Add product or increase its quantity
  const handleAddToCart = (product, quantity = 1) => {
    if (!product) return;

    const amount = Math.max(1, Number(quantity) || 1);

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + amount }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: amount }];
    });

    Alert.alert(
      'Added to Cart',
      `${product.name} added to your cart.`
    );
  };

  // Increase cart quantity
  const handleIncrease = (productId) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease cart quantity; remove item if quantity reaches zero
  const handleDecrease = (productId) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item completely from cart
  const handleRemoveFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== productId)
    );
  };

  // Checkout demo
  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add products before checkout.');
      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    Alert.alert(
      'Order Placed',
      `Your demo order has been placed successfully.\nTotal: ₹${total.toFixed(2)}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setCart([]);
            setCurrentScreen('Products');
          },
        },
      ]
    );
  };

  // Add or remove a favorite
  const handleToggleFavorite = (product) => {
    setFavorites((previousFavorites) => {
      const alreadyFavorite = previousFavorites.some(
        (item) => item.id === product.id
      );

      if (alreadyFavorite) {
        return previousFavorites.filter(
          (item) => item.id !== product.id
        );
      }

      return [...previousFavorites, product];
    });
  };

  // Open product details
  const handleProductPress = (product, fromScreen = 'Products') => {
    setSelectedProduct(product);
    setPreviousScreen(fromScreen);
    setCurrentScreen('ProductDetails');
  };

  // Open cart
  const openCart = () => {
    setCurrentScreen('Cart');
  };

  // Open favorites
  const openFavorites = () => {
    setCurrentScreen('Favorites');
  };

  // Open profile
  const openProfile = () => {
    setCurrentScreen('Profile');
  };

  // Save edited profile
  const handleSaveProfile = (updatedUser) => {
    const updatedAccount = {
      ...currentUser,
      ...updatedUser,
    };

    setCurrentUser(updatedAccount);

    setAccounts((previousAccounts) =>
      previousAccounts.map((account) =>
        account.id === currentUser.id
          ? { ...account, ...updatedUser }
          : account
      )
    );

    Alert.alert('Profile Updated', 'Your profile has been updated.');
    setCurrentScreen('Profile');
  };

  // Sign out
  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          onPress: () => {
            setCurrentUser(null);
            setSelectedProduct(null);
            setCurrentScreen('Home');
          },
        },
      ]
    );
  };

  // Navigate back from product details
  const handleProductDetailsBack = () => {
    setCurrentScreen(previousScreen);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F9F5' }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9F5"
      />

      {/* HOME SCREEN */}
      {currentScreen === 'Home' && (
        <HomeScreen
          onSignIn={() => setCurrentScreen('SignIn')}
          onSignUp={() => setCurrentScreen('SignUp')}
        />
      )}

      {/* SIGN IN SCREEN */}
      {currentScreen === 'SignIn' && (
        <SignInScreen
          onBack={() => setCurrentScreen('Home')}
          onSignUp={() => setCurrentScreen('SignUp')}
          onLogin={handleLogin}
        />
      )}

      {/* SIGN UP SCREEN */}
      {currentScreen === 'SignUp' && (
        <SignUpScreen
          onBack={() => setCurrentScreen('Home')}
          onSignIn={() => setCurrentScreen('SignIn')}
          onRegister={handleRegister}
        />
      )}

      {/* PRODUCTS SCREEN */}
      {currentScreen === 'Products' && (
        <ProductsScreen
          user={currentUser}
          cart={cart}
          onAddToCart={handleAddToCart}
          onOpenCart={openCart}
          onLogout={handleLogout}
          onProductPress={(product) =>
            handleProductPress(product, 'Products')
          }
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenFavorites={openFavorites}
          onOpenProfile={openProfile}
          onOpenAdmin={() => setCurrentScreen('AdminDashboard')}
        />
      )}

      {/* PRODUCT DETAILS SCREEN */}
      {currentScreen === 'ProductDetails' && selectedProduct && (
        <ProductDetailsScreen
          product={selectedProduct}
          onBack={handleProductDetailsBack}
          onAddToCart={(product, quantity = 1) => {
            handleAddToCart(product, quantity);
          }}
        />
      )}

      {/* CART SCREEN */}
      {currentScreen === 'Cart' && (
        <CartScreen
          cart={cart}
          onBack={() => setCurrentScreen('Products')}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {/* FAVORITES SCREEN */}
      {currentScreen === 'Favorites' && (
        <FavoritesScreen
          favorites={favorites}
          onBack={() => setCurrentScreen('Products')}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
          onProductPress={(product) =>
            handleProductPress(product, 'Favorites')
          }
        />
      )}

      {/* PROFILE SCREEN */}
      {currentScreen === 'Profile' && (
        <ProfileScreen
          user={currentUser}
          onBack={() => setCurrentScreen('Products')}
          onEdit={() => setCurrentScreen('EditProfile')}
          onLogout={handleLogout}
        />
      )}

      {/* EDIT PROFILE SCREEN */}
      {currentScreen === 'EditProfile' && (
        <EditProfileScreen
          user={currentUser}
          onBack={() => setCurrentScreen('Profile')}
          onSave={handleSaveProfile}
        />
      )}

      {/* ADMIN DASHBOARD */}
      {currentScreen === 'AdminDashboard' && (
        <AdminDashboardScreen
          user={currentUser}
          products={INITIAL_PRODUCTS}
          onBack={() => setCurrentScreen('Products')}
          onManageProducts={() => setCurrentScreen('Products')}
          onLogout={handleLogout}
        />
      )}
    </View>
  );
}
  