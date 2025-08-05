import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');

const CustomerHomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const [activeOrders, setActiveOrders] = useState(2);

  const services = [
    {
      id: 1,
      name: 'Basic Wash',
      price: '₹150',
      duration: '30 min',
      icon: 'water-outline',
      description: 'Waterless wash with basic cleaning',
      features: ['Exterior cleaning', 'Tire cleaning', 'Basic detailing'],
    },
    {
      id: 2,
      name: 'Premium Wash',
      price: '₹250',
      duration: '45 min',
      icon: 'sparkles-outline',
      description: 'Complete wash with detailing',
      features: ['Full exterior wash', 'Chain lubrication', 'Premium detailing', 'Tire shine'],
    },
    {
      id: 3,
      name: 'Deluxe Package',
      price: '₹400',
      duration: '60 min',
      icon: 'diamond-outline',
      description: 'Complete bike care package',
      features: ['Premium wash', 'Chain lubrication', 'Full detailing', 'Tire shine', 'Interior cleaning'],
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Book Service',
      icon: 'car-outline',
      color: '#4CAF50',
      onPress: () => navigation.navigate('Book Service'),
    },
    {
      id: 2,
      title: 'Track Order',
      icon: 'location-outline',
      color: '#2196F3',
      onPress: () => navigation.navigate('Orders'),
    },
    {
      id: 3,
      title: 'Buy Products',
      icon: 'bag-outline',
      color: '#FF9800',
      onPress: () => navigation.navigate('Products'),
    },
    {
      id: 4,
      title: 'Support',
      icon: 'help-circle-outline',
      color: '#9C27B0',
      onPress: () => {},
    },
  ];

  const renderServiceCard = (service) => (
    <TouchableOpacity
      key={service.id}
      style={styles.serviceCard}
      onPress={() => navigation.navigate('Book Service', { selectedService: service })}
    >
      <LinearGradient
        colors={['#FFFFFF', '#F8F9FA']}
        style={styles.serviceCardGradient}
      >
        <View style={styles.serviceHeader}>
          <View style={styles.serviceIconContainer}>
            <Ionicons name={service.icon} size={24} color="#2196F3" />
          </View>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>{service.price}</Text>
          </View>
        </View>
        <Text style={styles.serviceDescription}>{service.description}</Text>
        <View style={styles.serviceFeatures}>
          {service.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <View style={styles.serviceFooter}>
          <Text style={styles.serviceDuration}>{service.duration}</Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
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
        <Text style={styles.quickActionText}>{action.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#2196F3', '#1976D2']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Good Morning!</Text>
              <Text style={styles.userName}>John Doe</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="white" />
              {activeOrders > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>{activeOrders}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          
          {activeOrders > 0 && (
            <TouchableOpacity
              style={styles.activeOrderCard}
              onPress={() => navigation.navigate('Orders')}
            >
              <View style={styles.activeOrderContent}>
                <Ionicons name="bicycle" size={24} color="white" />
                <View style={styles.activeOrderText}>
                  <Text style={styles.activeOrderTitle}>
                    {activeOrders} Active Order{activeOrders > 1 ? 's' : ''}
                  </Text>
                  <Text style={styles.activeOrderSubtitle}>
                    Tap to track your orders
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="white" />
              </View>
            </TouchableOpacity>
          )}
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Book Service')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}
          >
            {services.map(renderServiceCard)}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Products')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.featuredProducts}>
            <TouchableOpacity style={styles.productCard}>
              <View style={styles.productImage}>
                <Ionicons name="water" size={40} color="#2196F3" />
              </View>
              <Text style={styles.productName}>Waterless Wash</Text>
              <Text style={styles.productPrice}>₹299</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.productCard}>
              <View style={styles.productImage}>
                <Ionicons name="construct" size={40} color="#FF9800" />
              </View>
              <Text style={styles.productName}>Chain Lube</Text>
              <Text style={styles.productPrice}>₹199</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.productCard}>
              <View style={styles.productImage}>
                <Ionicons name="sparkles" size={40} color="#9C27B0" />
              </View>
              <Text style={styles.productName}>Tire Shine</Text>
              <Text style={styles.productPrice}>₹149</Text>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
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
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeOrderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  activeOrderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeOrderText: {
    flex: 1,
    marginLeft: 12,
  },
  activeOrderTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeOrderSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
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
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  servicesContainer: {
    paddingRight: 20,
  },
  serviceCard: {
    width: 280,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  serviceCardGradient: {
    padding: 20,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
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
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  serviceFeatures: {
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceDuration: {
    fontSize: 12,
    color: '#999',
  },
  bookButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 50) / 3,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default CustomerHomeScreen; 