import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductStoreScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const categories = [
    { id: 'all', name: 'All Products', icon: 'grid-outline' },
    { id: 'wash', name: 'Wash Products', icon: 'water-outline' },
    { id: 'lube', name: 'Lubricants', icon: 'construct-outline' },
    { id: 'accessories', name: 'Accessories', icon: 'bag-outline' },
    { id: 'helmets', name: 'Helmets', icon: 'shield-outline' },
  ];

  const products = [
    {
      id: 1,
      name: 'Waterless Wash Solution',
      price: 299,
      originalPrice: 399,
      category: 'wash',
      rating: 4.5,
      reviews: 128,
      image: 'water',
      description: 'Professional waterless wash solution for bikes',
      inStock: true,
    },
    {
      id: 2,
      name: 'Chain Lubricant',
      price: 199,
      originalPrice: 249,
      category: 'lube',
      rating: 4.3,
      reviews: 89,
      image: 'construct',
      description: 'High-quality chain lubricant for smooth operation',
      inStock: true,
    },
    {
      id: 3,
      name: 'Tire Shine Spray',
      price: 149,
      originalPrice: 199,
      category: 'wash',
      rating: 4.2,
      reviews: 67,
      image: 'sparkles',
      description: 'Long-lasting tire shine and protection',
      inStock: true,
    },
    {
      id: 4,
      name: 'Bike Cover',
      price: 399,
      originalPrice: 499,
      category: 'accessories',
      rating: 4.4,
      reviews: 156,
      image: 'shield',
      description: 'Waterproof bike cover for protection',
      inStock: true,
    },
    {
      id: 5,
      name: 'Safety Helmet',
      price: 899,
      originalPrice: 1299,
      category: 'helmets',
      rating: 4.6,
      reviews: 234,
      image: 'shield',
      description: 'ISI certified safety helmet',
      inStock: true,
    },
    {
      id: 6,
      name: 'Microfiber Cloth Set',
      price: 199,
      originalPrice: 299,
      category: 'accessories',
      rating: 4.1,
      reviews: 78,
      image: 'grid',
      description: 'Set of 3 microfiber cleaning cloths',
      inStock: true,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(prev => prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const renderCategoryItem = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryItem,
        selectedCategory === category.id && styles.selectedCategoryItem,
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons
        name={category.icon}
        size={24}
        color={selectedCategory === category.id ? 'white' : '#666'}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category.id && styles.selectedCategoryText,
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductCard = (product) => (
    <View key={product.id} style={styles.productCard}>
      <View style={styles.productImage}>
        <Ionicons name={product.image} size={40} color="#2196F3" />
        {product.originalPrice > product.price && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{product.rating}</Text>
          <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₹{product.price}</Text>
          {product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(product)}
        >
          <LinearGradient
            colors={['#4CAF50', '#45A049']}
            style={styles.addToCartGradient}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      {/* Header */}
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Store</Text>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color="white" />
            {getCartItemCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map(renderCategoryItem)}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
            </Text>
            <Text style={styles.productCount}>{filteredProducts.length} products</Text>
          </View>
          
          <View style={styles.productsGrid}>
            {filteredProducts.map(renderProductCard)}
          </View>
        </View>
      </ScrollView>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <View style={styles.cartSummary}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartTotal}>Total: ₹{getCartTotal()}</Text>
            <Text style={styles.cartItems}>{getCartItemCount()} items</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Checkout', { cartItems, total: getCartTotal() })}
          >
            <LinearGradient
              colors={['#FF9800', '#F57C00']}
              style={styles.checkoutGradient}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  productCount: {
    fontSize: 14,
    color: '#666',
  },
  categoriesContainer: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginRight: 15,
    minWidth: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCategoryItem: {
    backgroundColor: '#2196F3',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: 'white',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 50) / 2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  productImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#212121',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  addToCartButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  cartSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cartInfo: {
    flex: 1,
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  cartItems: {
    fontSize: 14,
    color: '#666',
  },
  checkoutButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  checkoutGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductStoreScreen; 