import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const WasherHomeScreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(1250);
  const [totalEarnings, setTotalEarnings] = useState(8500);
  const [completedOrders, setCompletedOrders] = useState(12);
  const [pendingOrders, setPendingOrders] = useState(3);

  const availableOrders = [
    {
      id: 1,
      customerName: 'Rahul Kumar',
      service: 'Premium Wash',
      price: 250,
      distance: '1.2 km',
      time: '10:00 AM',
      address: '123, MG Road, Bangalore',
      bikeNumber: 'KA-01-AB-1234',
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      service: 'Basic Wash',
      price: 150,
      distance: '0.8 km',
      time: '11:30 AM',
      address: '456, Indiranagar, Bangalore',
      bikeNumber: 'KA-02-CD-5678',
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      service: 'Deluxe Package',
      price: 400,
      distance: '2.1 km',
      time: '02:00 PM',
      address: '789, Koramangala, Bangalore',
      bikeNumber: 'KA-03-EF-9012',
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Accept Orders',
      icon: 'checkmark-circle-outline',
      color: '#4CAF50',
      count: pendingOrders,
      onPress: () => navigation.navigate('Orders'),
    },
    {
      id: 2,
      title: 'My Earnings',
      icon: 'wallet-outline',
      color: '#FF9800',
      count: `₹${todayEarnings}`,
      onPress: () => navigation.navigate('Earnings'),
    },
    {
      id: 3,
      title: 'Schedule',
      icon: 'calendar-outline',
      color: '#2196F3',
      count: 'Today',
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Support',
      icon: 'help-circle-outline',
      color: '#9C27B0',
      count: '24/7',
      onPress: () => {},
    },
  ];

  const renderEarningsCard = () => (
    <View style={styles.earningsCard}>
      <LinearGradient
        colors={['#4CAF50', '#45A049']}
        style={styles.earningsGradient}
      >
        <View style={styles.earningsHeader}>
          <View>
            <Text style={styles.earningsLabel}>Today's Earnings</Text>
            <Text style={styles.earningsAmount}>₹{todayEarnings}</Text>
          </View>
          <View style={styles.earningsIcon}>
            <Ionicons name="trending-up" size={32} color="white" />
          </View>
        </View>
        <View style={styles.earningsStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedOrders}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{pendingOrders}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹{totalEarnings}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderQuickAction = (action) => (
    <TouchableOpacity
      key={action.id}
      style={styles.quickActionCard}
      onPress={action.onPress}
    >
      <LinearGradient
        colors={[action.color, action.color + 'CC']}
        style={styles.quickActionGradient}
      >
        <Ionicons name={action.icon} size={32} color="white" />
        <Text style={styles.quickActionTitle}>{action.title}</Text>
        <Text style={styles.quickActionCount}>{action.count}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderOrderCard = (order) => (
    <TouchableOpacity
      key={order.id}
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetails', { order })}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.customerName}>{order.customerName}</Text>
          <Text style={styles.serviceType}>{order.service}</Text>
        </View>
        <View style={styles.orderPrice}>
          <Text style={styles.priceText}>₹{order.price}</Text>
          <Text style={styles.distanceText}>{order.distance}</Text>
        </View>
      </View>
      
      <View style={styles.orderDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{order.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{order.address}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="bicycle-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{order.bikeNumber}</Text>
        </View>
      </View>

      <View style={styles.orderActions}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAcceptOrder(order.id)}
        >
          <Text style={styles.acceptButtonText}>Accept Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => handleDeclineOrder(order.id)}
        >
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleAcceptOrder = (orderId) => {
    // Handle order acceptance
    console.log('Order accepted:', orderId);
  };

  const handleDeclineOrder = (orderId) => {
    // Handle order decline
    console.log('Order declined:', orderId);
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      
      {/* Header */}
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.washerName}>Rajesh Kumar</Text>
          </View>
          <TouchableOpacity
            style={[styles.onlineButton, isOnline && styles.onlineButtonActive]}
            onPress={toggleOnlineStatus}
          >
            <View style={[styles.onlineIndicator, isOnline && styles.onlineIndicatorActive]} />
            <Text style={styles.onlineText}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Earnings Card */}
        <View style={styles.section}>
          {renderEarningsCard()}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Available Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Orders</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ordersContainer}>
            {availableOrders.map(renderOrderCard)}
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb-outline" size={24} color="#FF9800" />
              <Text style={styles.tipsTitle}>Today's Tips</Text>
            </View>
            <Text style={styles.tipsText}>
              • Complete more orders to earn bonus rewards{'\n'}
              • Maintain 4.5+ rating for better order priority{'\n'}
              • Use quality products for better customer satisfaction{'\n'}
              • Keep your schedule updated for more orders
            </Text>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  washerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  onlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  onlineButtonActive: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F44336',
    marginRight: 6,
  },
  onlineIndicatorActive: {
    backgroundColor: '#4CAF50',
  },
  onlineText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
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
  seeAllText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  earningsCard: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  earningsGradient: {
    padding: 20,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  earningsLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  earningsIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  earningsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 50) / 2,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  quickActionTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  quickActionCount: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.9,
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
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    color: '#666',
  },
  orderPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#999',
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
    gap: 10,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  declineButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginLeft: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default WasherHomeScreen; 