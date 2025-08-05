import React, { useState, useEffect } from 'react';
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

const OrderTrackingScreen = ({ navigation, route }) => {
  const [orderStatus, setOrderStatus] = useState('confirmed');
  const [washerDetails, setWasherDetails] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    rating: 4.5,
    completedOrders: 156,
    eta: '15 min',
  });

  const orderId = route.params?.orderId || 'ORD123456789';
  const orderDetails = {
    id: orderId,
    service: 'Premium Wash',
    price: 250,
    date: '2024-01-15',
    time: '10:00 AM',
    address: '123, MG Road, Bangalore',
    bikeNumber: 'KA-01-AB-1234',
    specialInstructions: 'Please pay extra attention to the chain area',
  };

  const statusSteps = [
    { id: 'confirmed', title: 'Order Confirmed', icon: 'checkmark-circle', completed: true },
    { id: 'assigned', title: 'Washer Assigned', icon: 'person', completed: orderStatus !== 'confirmed' },
    { id: 'arriving', title: 'Washer Arriving', icon: 'location', completed: ['assigned', 'arriving', 'working', 'completed'].includes(orderStatus) },
    { id: 'working', title: 'Service in Progress', icon: 'construct', completed: ['working', 'completed'].includes(orderStatus) },
    { id: 'completed', title: 'Service Completed', icon: 'checkmark-done-circle', completed: orderStatus === 'completed' },
  ];

  useEffect(() => {
    // Simulate status updates
    const statusTimer = setTimeout(() => {
      if (orderStatus === 'confirmed') {
        setOrderStatus('assigned');
      } else if (orderStatus === 'assigned') {
        setOrderStatus('arriving');
      } else if (orderStatus === 'arriving') {
        setOrderStatus('working');
      } else if (orderStatus === 'working') {
        setOrderStatus('completed');
      }
    }, 5000);

    return () => clearTimeout(statusTimer);
  }, [orderStatus]);

  const handleCallWasher = () => {
    Alert.alert('Call Washer', `Call ${washerDetails.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => console.log('Calling washer...') },
    ]);
  };

  const handleMessageWasher = () => {
    Alert.alert('Message Washer', 'Open chat with washer?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Chat', onPress: () => console.log('Opening chat...') },
    ]);
  };

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, Cancel', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const renderStatusStep = (step, index) => (
    <View key={step.id} style={styles.statusStep}>
      <View style={styles.stepIconContainer}>
        <Ionicons
          name={step.icon}
          size={24}
          color={step.completed ? '#4CAF50' : '#E0E0E0'}
        />
        {index < statusSteps.length - 1 && (
          <View
            style={[
              styles.stepLine,
              { backgroundColor: step.completed ? '#4CAF50' : '#E0E0E0' },
            ]}
          />
        )}
      </View>
      <View style={styles.stepContent}>
        <Text
          style={[
            styles.stepTitle,
            { color: step.completed ? '#212121' : '#999' },
          ]}
        >
          {step.title}
        </Text>
        {step.completed && step.id === orderStatus && (
          <Text style={styles.stepTime}>Just now</Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      
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
          <Text style={styles.headerTitle}>Track Order</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Status */}
        <View style={styles.section}>
          <View style={styles.orderStatusCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{orderDetails.id}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                </Text>
              </View>
            </View>
            
            <View style={styles.orderInfo}>
              <Text style={styles.serviceName}>{orderDetails.service}</Text>
              <Text style={styles.servicePrice}>₹{orderDetails.price}</Text>
            </View>

            <View style={styles.orderDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{orderDetails.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{orderDetails.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{orderDetails.address}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="bicycle-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{orderDetails.bikeNumber}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Status Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <View style={styles.statusTimeline}>
            {statusSteps.map((step, index) => renderStatusStep(step, index))}
          </View>
        </View>

        {/* Washer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Washer</Text>
          <View style={styles.washerCard}>
            <View style={styles.washerInfo}>
              <View style={styles.washerAvatar}>
                <Ionicons name="person" size={32} color="white" />
              </View>
              <View style={styles.washerDetails}>
                <Text style={styles.washerName}>{washerDetails.name}</Text>
                <View style={styles.washerStats}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.washerRating}>{washerDetails.rating}</Text>
                  <Text style={styles.washerOrders}>({washerDetails.completedOrders} orders)</Text>
                </View>
                <Text style={styles.etaText}>ETA: {washerDetails.eta}</Text>
              </View>
            </View>
            
            <View style={styles.washerActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleCallWasher}
              >
                <LinearGradient
                  colors={['#4CAF50', '#45A049']}
                  style={styles.actionGradient}
                >
                  <Ionicons name="call" size={20} color="white" />
                  <Text style={styles.actionText}>Call</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleMessageWasher}
              >
                <LinearGradient
                  colors={['#2196F3', '#1976D2']}
                  style={styles.actionGradient}
                >
                  <Ionicons name="chatbubble" size={20} color="white" />
                  <Text style={styles.actionText}>Message</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Special Instructions */}
        {orderDetails.specialInstructions && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <View style={styles.instructionsCard}>
              <Ionicons name="information-circle-outline" size={20} color="#2196F3" />
              <Text style={styles.instructionsText}>{orderDetails.specialInstructions}</Text>
            </View>
          </View>
        )}

        {/* Support */}
        <View style={styles.section}>
          <View style={styles.supportCard}>
            <View style={styles.supportHeader}>
              <Ionicons name="help-circle-outline" size={24} color="#FF9800" />
              <Text style={styles.supportTitle}>Need Help?</Text>
            </View>
            <Text style={styles.supportText}>
              If you have any questions or concerns about your order, our support team is here to help.
            </Text>
            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
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
  cancelButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 15,
  },
  orderStatusCard: {
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
    alignItems: 'center',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  orderInfo: {
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
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  statusTimeline: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepIconContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  stepLine: {
    width: 2,
    height: 30,
    marginTop: 8,
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  stepTime: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  washerCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  washerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  washerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  washerDetails: {
    flex: 1,
  },
  washerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  washerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  washerRating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginLeft: 4,
  },
  washerOrders: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  etaText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  washerActions: {
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
    paddingVertical: 12,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  instructionsCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  supportCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginLeft: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  supportButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderTrackingScreen; 