import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from 'react-native-date-picker';

const { width } = Dimensions.get('window');

const ServiceBookingScreen = ({ navigation, route }) => {
  const [selectedService, setSelectedService] = useState(route.params?.selectedService || null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [address, setAddress] = useState('');
  const [bikeNumber, setBikeNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('online');

  const services = [
    {
      id: 1,
      name: 'Basic Wash',
      price: 150,
      duration: '30 min',
      icon: 'water-outline',
      description: 'Waterless wash with basic cleaning',
      features: ['Exterior cleaning', 'Tire cleaning', 'Basic detailing'],
    },
    {
      id: 2,
      name: 'Premium Wash',
      price: 250,
      duration: '45 min',
      icon: 'sparkles-outline',
      description: 'Complete wash with detailing',
      features: ['Full exterior wash', 'Chain lubrication', 'Premium detailing', 'Tire shine'],
    },
    {
      id: 3,
      name: 'Deluxe Package',
      price: 400,
      duration: '60 min',
      icon: 'diamond-outline',
      description: 'Complete bike care package',
      features: ['Premium wash', 'Chain lubrication', 'Full detailing', 'Tire shine', 'Interior cleaning'],
    },
  ];

  const paymentMethods = [
    { id: 'online', name: 'Online Payment', icon: 'card-outline' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'cash-outline' },
    { id: 'upi', name: 'UPI Payment', icon: 'phone-portrait-outline' },
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
  ];

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const handleBooking = () => {
    if (!selectedService) {
      Alert.alert('Error', 'Please select a service');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return;
    }
    if (!bikeNumber.trim()) {
      Alert.alert('Error', 'Please enter your bike number');
      return;
    }
    if (!selectedTimeSlot) {
      Alert.alert('Error', 'Please select a time slot');
      return;
    }

    // Calculate total with platform fee
    const platformFee = Math.round(selectedService.price * 0.1); // 10% platform fee
    const total = selectedService.price + platformFee;

    Alert.alert(
      'Confirm Booking',
      `Service: ${selectedService.name}\nPrice: ₹${selectedService.price}\nPlatform Fee: ₹${platformFee}\nTotal: ₹${total}\n\nProceed with booking?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => handlePayment(total) },
      ]
    );
  };

  const handlePayment = (total) => {
    if (selectedPaymentMethod === 'online') {
      // Navigate to payment screen
      navigation.navigate('PaymentScreen', { amount: total });
    } else {
      // Direct booking for COD
      Alert.alert('Booking Confirmed', 'Your booking has been confirmed. Our washer will contact you soon.');
      navigation.navigate('OrderTracking', { orderId: 'ORD' + Date.now() });
    }
  };

  const renderServiceCard = (service) => (
    <TouchableOpacity
      key={service.id}
      style={[
        styles.serviceCard,
        selectedService?.id === service.id && styles.selectedServiceCard,
      ]}
      onPress={() => handleServiceSelection(service)}
    >
      <LinearGradient
        colors={
          selectedService?.id === service.id
            ? ['#2196F3', '#1976D2']
            : ['#FFFFFF', '#F8F9FA']
        }
        style={styles.serviceCardGradient}
      >
        <View style={styles.serviceHeader}>
          <View
            style={[
              styles.serviceIconContainer,
              selectedService?.id === service.id && styles.selectedIconContainer,
            ]}
          >
            <Ionicons
              name={service.icon}
              size={24}
              color={selectedService?.id === service.id ? 'white' : '#2196F3'}
            />
          </View>
          <View style={styles.serviceInfo}>
            <Text
              style={[
                styles.serviceName,
                selectedService?.id === service.id && styles.selectedText,
              ]}
            >
              {service.name}
            </Text>
            <Text
              style={[
                styles.servicePrice,
                selectedService?.id === service.id && styles.selectedText,
              ]}
            >
              ₹{service.price}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.serviceDescription,
            selectedService?.id === service.id && styles.selectedText,
          ]}
        >
          {service.description}
        </Text>
        <View style={styles.serviceFeatures}>
          {service.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={selectedService?.id === service.id ? 'white' : '#4CAF50'}
              />
              <Text
                style={[
                  styles.featureText,
                  selectedService?.id === service.id && styles.selectedText,
                ]}
              >
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderTimeSlot = (time) => (
    <TouchableOpacity
      key={time}
      style={[
        styles.timeSlot,
        selectedTimeSlot === time && styles.selectedTimeSlot,
      ]}
      onPress={() => setSelectedTimeSlot(time)}
    >
      <Text
        style={[
          styles.timeSlotText,
          selectedTimeSlot === time && styles.selectedTimeSlotText,
        ]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );

  const renderPaymentMethod = (method) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethod,
        selectedPaymentMethod === method.id && styles.selectedPaymentMethod,
      ]}
      onPress={() => setSelectedPaymentMethod(method.id)}
    >
      <Ionicons
        name={method.icon}
        size={24}
        color={selectedPaymentMethod === method.id ? 'white' : '#666'}
      />
      <Text
        style={[
          styles.paymentMethodText,
          selectedPaymentMethod === method.id && styles.selectedPaymentMethodText,
        ]}
      >
        {method.name}
      </Text>
    </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Book Service</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Service Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Service</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}
          >
            {services.map(renderServiceCard)}
          </ScrollView>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Location</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>
        </View>

        {/* Bike Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bike Details</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="bicycle-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Enter bike number"
              value={bikeNumber}
              onChangeText={setBikeNumber}
            />
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.dateButtonText}>
              {selectedDate.toLocaleDateString()}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Time Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeSlotsGrid}>
            {timeSlots.map(renderTimeSlot)}
          </View>
        </View>

        {/* Special Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Instructions (Optional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Any special instructions for the washer..."
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethodsContainer}>
            {paymentMethods.map(renderPaymentMethod)}
          </View>
        </View>

        {/* Booking Summary */}
        {selectedService && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Summary</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service:</Text>
                <Text style={styles.summaryValue}>{selectedService.name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Price:</Text>
                <Text style={styles.summaryValue}>₹{selectedService.price}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Platform Fee:</Text>
                <Text style={styles.summaryValue}>
                  ₹{Math.round(selectedService.price * 0.1)}
                </Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalValue}>
                  ₹{selectedService.price + Math.round(selectedService.price * 0.1)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Book Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.bookButton, !selectedService && styles.bookButtonDisabled]}
          onPress={handleBooking}
          disabled={!selectedService}
        >
          <LinearGradient
            colors={['#4CAF50', '#45A049']}
            style={styles.bookButtonGradient}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <DateTimePicker
        modal
        open={showDatePicker}
        date={selectedDate}
        mode="date"
        minimumDate={new Date()}
        onConfirm={handleDateChange}
        onCancel={() => setShowDatePicker(false)}
      />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 15,
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
  selectedServiceCard: {
    elevation: 5,
    shadowOpacity: 0.2,
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
  selectedIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  selectedText: {
    color: 'white',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateButtonText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: (width - 50) / 3,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedTimeSlot: {
    backgroundColor: '#2196F3',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  selectedTimeSlotText: {
    color: 'white',
  },
  textArea: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  paymentMethodsContainer: {
    gap: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedPaymentMethod: {
    backgroundColor: '#2196F3',
  },
  paymentMethodText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#212121',
  },
  selectedPaymentMethodText: {
    color: 'white',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  bookButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  bookButtonDisabled: {
    opacity: 0.6,
  },
  bookButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServiceBookingScreen; 