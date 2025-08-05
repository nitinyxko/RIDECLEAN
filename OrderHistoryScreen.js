import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const OrderHistoryScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const orders = [
    {
      id: 'ORD123456789',
      service: 'Premium Wash',
      price: 250,
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'completed',
      washer: 'Rajesh Kumar',
      rating: 5,
      review: 'Excellent service! My bike looks brand new.',
      bikeNumber: 'KA-01-AB-1234',
      address: '123, MG Road, Bangalore',
    },
    {
      id: 'ORD123456788',
      service: 'Basic Wash',
      price: 150,
      date: '2024-01-10',
      time: '02:30 PM',
      status: 'completed',
      washer: 'Amit Patel',
      rating: 4,
      review: 'Good service, quick and efficient.',
      bikeNumber: 'KA-01-AB-1234',
      address: '123, MG Road, Bangalore',
    },
    {
      id: 'ORD123456787',
      service: 'Deluxe Package',
      price: 400,
      date: '2024-01-05',
      time: '11:00 AM',
      status: 'completed',
      washer: 'Priya Sharma',
      rating: 5,
      review: 'Amazing detailing work! Highly recommended.',
      bikeNumber: 'KA-01-AB-1234',
      address: '123, MG Road, Bangalore',
    },
    {
      id: 'ORD123456786',
      service: 'Premium Wash',
      price: 250,
      date: '2024-01-01',
      time: '09:00 AM',
      status: 'cancelled',
      washer: 'Rahul Kumar',
      rating: null,
      review: null,
      bikeNumber: 'KA-01-AB-1234',
      address: '123, MG Road, Bangalore',
    },
  ];

  const filters = [
    { id: 'all', name: 'All Orders' },
    { id: 'completed', name: 'Completed' },
    { id: 'cancelled', name: 'Cancelled' },
  ];

  const filteredOrders = orders.filter(order => {
    if (selectedFilter === 'all') return true;
    return order.status === selectedFilter;
  });

  const handleReorder = (order) => {
    Alert.alert(
      'Reorder Service',
      `Would you like to rebook the ${order.service} service?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reorder', onPress: () => navigation.navigate('Book Service', { selectedService: { name: order.service, price: order.price } }) },
      ]
    );
  };

  const handleRateOrder = (order) => {
    Alert.alert(
      'Rate Service',
      'Would you like to rate this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Rate', onPress: () => navigation.navigate('RateService', { order }) },
      ]
    );
  };

  const renderFilterButton = (filter) => (
    <TouchableOpacity
      key={filter.id}
      style={[
        styles.filterButton,
        selectedFilter === filter.id && styles.selectedFilterButton,
      ]}
      onPress={() => setSelectedFilter(filter.id)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === filter.id && styles.selectedFilterText,
        ]}
      >
        {filter.name}
      </Text>
    </TouchableOpacity>
  );

  const renderOrderCard = (order) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>{order.date} at {order.time}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: order.status === 'completed' ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.statusText}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{order.service}</Text>
        <Text style={styles.servicePrice}>₹{order.price}</Text>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="person-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{order.washer}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="bicycle-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{order.bikeNumber}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{order.address}</Text>
        </View>
      </View>

      {order.status === 'completed' && order.rating && (
        <View style={styles.ratingSection}>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= order.rating ? 'star' : 'star-outline'}
                size={16}
                color="#FFD700"
              />
            ))}
            <Text style={styles.ratingText}>{order.rating}/5</Text>
          </View>
          {order.review && (
            <Text style={styles.reviewText}>"{order.review}"</Text>
          )}
        </View>
      )}

      <View style={styles.orderActions}>
        {order.status === 'completed' && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleReorder(order)}
            >
              <LinearGradient
                colors={['#4CAF50', '#45A049']}
                style={styles.actionGradient}
              >
                <Ionicons name="refresh" size={16} color="white" />
                <Text style={styles.actionText}>Reorder</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            {!order.rating && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleRateOrder(order)}
              >
                <LinearGradient
                  colors={['#FF9800', '#F57C00']}
                  style={styles.actionGradient}
                >
                  <Ionicons name="star" size={16} color="white" />
                  <Text style={styles.actionText}>Rate</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </>
        )}
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('OrderDetails', { order })}
        >
          <LinearGradient
            colors={['#2196F3', '#1976D2']}
            style={styles.actionGradient}
          >
            <Ionicons name="eye" size={16} color="white" />
            <Text style={styles.actionText}>View Details</Text>
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
          <Text style={styles.headerTitle}>Order History</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filter Orders</Text>
          <View style={styles.filtersContainer}>
            {filters.map(renderFilterButton)}
          </View>
        </View>

        {/* Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedFilter === 'all' ? 'All Orders' : filters.find(f => f.id === selectedFilter)?.name}
            </Text>
            <Text style={styles.orderCount}>{filteredOrders.length} orders</Text>
          </View>
          
          <View style={styles.ordersContainer}>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(renderOrderCard)
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="document-outline" size={64} color="#E0E0E0" />
                <Text style={styles.emptyTitle}>No Orders Found</Text>
                <Text style={styles.emptySubtitle}>
                  You haven't placed any orders yet.
                </Text>
                <TouchableOpacity
                  style={styles.bookNowButton}
                  onPress={() => navigation.navigate('Book Service')}
                >
                  <LinearGradient
                    colors={['#4CAF50', '#45A049']}
                    style={styles.bookNowGradient}
                  >
                    <Text style={styles.bookNowText}>Book Your First Service</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
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
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 40,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  orderCount: {
    fontSize: 14,
    color: '#666',
  },
  filtersContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedFilterText: {
    color: 'white',
  },
  ordersContainer: {
    gap: 15,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  serviceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderDetails: {
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  ratingSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginLeft: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  bookNowButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  bookNowGradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  bookNowText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderHistoryScreen; 