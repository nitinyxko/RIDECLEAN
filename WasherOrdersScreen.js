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

const WasherOrdersScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const orders = [
    {
      id: 'ORD123456789',
      customerName: 'Rahul Kumar',
      service: 'Premium Wash',
      price: 250,
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'in_progress',
      address: '123, MG Road, Bangalore',
      bikeNumber: 'KA-01-AB-1234',
      phone: '+91 98765 43210',
      specialInstructions: 'Please pay extra attention to the chain area',
      earnings: 225, // 90% of price (10% platform fee)
    },
    {
      id: 'ORD123456788',
      customerName: 'Priya Sharma',
      service: 'Basic Wash',
      price: 150,
      date: '2024-01-15',
      time: '11:30 AM',
      status: 'assigned',
      address: '456, Indiranagar, Bangalore',
      bikeNumber: 'KA-02-CD-5678',
      phone: '+91 98765 43211',
      specialInstructions: null,
      earnings: 135,
    },
    {
      id: 'ORD123456787',
      customerName: 'Amit Patel',
      service: 'Deluxe Package',
      price: 400,
      date: '2024-01-15',
      time: '02:00 PM',
      status: 'completed',
      address: '789, Koramangala, Bangalore',
      bikeNumber: 'KA-03-EF-9012',
      phone: '+91 98765 43212',
      specialInstructions: 'Customer prefers eco-friendly products',
      earnings: 360,
    },
    {
      id: 'ORD123456786',
      customerName: 'Sneha Reddy',
      service: 'Premium Wash',
      price: 250,
      date: '2024-01-14',
      time: '03:30 PM',
      status: 'completed',
      address: '321, JP Nagar, Bangalore',
      bikeNumber: 'KA-04-GH-3456',
      phone: '+91 98765 43213',
      specialInstructions: null,
      earnings: 225,
    },
  ];

  const filters = [
    { id: 'all', name: 'All Orders' },
    { id: 'assigned', name: 'Assigned' },
    { id: 'in_progress', name: 'In Progress' },
    { id: 'completed', name: 'Completed' },
  ];

  const filteredOrders = orders.filter(order => {
    if (selectedFilter === 'all') return true;
    return order.status === selectedFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return '#FF9800';
      case 'in_progress': return '#2196F3';
      case 'completed': return '#4CAF50';
      default: return '#999';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'assigned': return 'Assigned';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const handleStartService = (order) => {
    Alert.alert(
      'Start Service',
      `Start ${order.service} for ${order.customerName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start', onPress: () => console.log('Starting service...') },
      ]
    );
  };

  const handleCompleteService = (order) => {
    Alert.alert(
      'Complete Service',
      `Mark ${order.service} as completed for ${order.customerName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Complete', onPress: () => console.log('Completing service...') },
      ]
    );
  };

  const handleCallCustomer = (order) => {
    Alert.alert('Call Customer', `Call ${order.customerName}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => console.log('Calling customer...') },
    ]);
  };

  const handleMessageCustomer = (order) => {
    Alert.alert('Message Customer', `Message ${order.customerName}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Message', onPress: () => console.log('Messaging customer...') },
    ]);
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
          { backgroundColor: getStatusColor(order.status) }
        ]}>
          <Text style={styles.statusText}>
            {getStatusText(order.status)}
          </Text>
        </View>
      </View>

      <View style={styles.customerInfo}>
        <View style={styles.customerAvatar}>
          <Ionicons name="person" size={20} color="white" />
        </View>
        <View style={styles.customerDetails}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.customerPhone}>{order.phone}</Text>
        </View>
      </View>

      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{order.service}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.servicePrice}>₹{order.price}</Text>
          <Text style={styles.earningsText}>Earnings: ₹{order.earnings}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="bicycle-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{order.bikeNumber}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{order.address}</Text>
        </View>
        {order.specialInstructions && (
          <View style={styles.detailItem}>
            <Ionicons name="information-circle-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{order.specialInstructions}</Text>
          </View>
        )}
      </View>

      <View style={styles.orderActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleCallCustomer(order)}
        >
          <LinearGradient
            colors={['#4CAF50', '#45A049']}
            style={styles.actionGradient}
          >
            <Ionicons name="call" size={16} color="white" />
            <Text style={styles.actionText}>Call</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleMessageCustomer(order)}
        >
          <LinearGradient
            colors={['#2196F3', '#1976D2']}
            style={styles.actionGradient}
          >
            <Ionicons name="chatbubble" size={16} color="white" />
            <Text style={styles.actionText}>Message</Text>
          </LinearGradient>
        </TouchableOpacity>

        {order.status === 'assigned' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStartService(order)}
          >
            <LinearGradient
              colors={['#FF9800', '#F57C00']}
              style={styles.actionGradient}
            >
              <Ionicons name="play" size={16} color="white" />
              <Text style={styles.actionText}>Start</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {order.status === 'in_progress' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleCompleteService(order)}
          >
            <LinearGradient
              colors={['#4CAF50', '#45A049']}
              style={styles.actionGradient}
            >
              <Ionicons name="checkmark" size={16} color="white" />
              <Text style={styles.actionText}>Complete</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
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
          <Text style={styles.headerTitle}>My Orders</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filter Orders</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {filters.map(renderFilterButton)}
          </ScrollView>
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
                  You don't have any orders in this category.
                </Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  refreshButton: {
    padding: 8,
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
    paddingRight: 20,
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  customerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  customerPhone: {
    fontSize: 14,
    color: '#666',
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
  priceContainer: {
    alignItems: 'flex-end',
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 2,
  },
  earningsText: {
    fontSize: 12,
    color: '#666',
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
  orderActions: {
    flexDirection: 'row',
    gap: 8,
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
  },
});

export default WasherOrdersScreen; 