import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#2196F3', '#1976D2', '#0D47A1']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="bicycle" size={80} color="white" />
          <Text style={styles.appTitle}>BikeWash Pro</Text>
          <Text style={styles.appSubtitle}>Professional Waterless Bike Care</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="water-outline" size={24} color="white" />
            <Text style={styles.featureText}>Waterless Wash</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="sparkles-outline" size={24} color="white" />
            <Text style={styles.featureText}>Professional Detailing</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="construct-outline" size={24} color="white" />
            <Text style={styles.featureText}>Chain Lubrication</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="bag-outline" size={24} color="white" />
            <Text style={styles.featureText}>Quality Products</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.customerButton}
            onPress={() => navigation.navigate('Login', { userType: 'customer' })}
          >
            <LinearGradient
              colors={['#4CAF50', '#45A049']}
              style={styles.buttonGradient}
            >
              <Ionicons name="person" size={24} color="white" />
              <Text style={styles.buttonText}>I'm a Customer</Text>
              <Text style={styles.buttonSubtext}>Book bike wash services</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.washerButton}
            onPress={() => navigation.navigate('Login', { userType: 'washer' })}
          >
            <LinearGradient
              colors={['#FF9800', '#F57C00']}
              style={styles.buttonGradient}
            >
              <Ionicons name="briefcase" size={24} color="white" />
              <Text style={styles.buttonText}>I'm a Washer</Text>
              <Text style={styles.buttonSubtext}>Earn money washing bikes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Starting at ₹150 per wash • Earn up to ₹500/day
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  featureItem: {
    alignItems: 'center',
    width: width * 0.4,
    marginVertical: 10,
  },
  featureText: {
    color: 'white',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
  },
  customerButton: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  washerButton: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default WelcomeScreen; 