import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input';

const RegisterScreen = ({ navigation, route }) => {
  const [userType] = useState(route.params?.userType || 'customer');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    bikeNumber: '',
    experience: '',
    documents: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    // Validate form data
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return;
    }
    if (!formData.city.trim()) {
      Alert.alert('Error', 'Please enter your city');
      return;
    }
    if (!formData.pincode.trim()) {
      Alert.alert('Error', 'Please enter your pincode');
      return;
    }

    if (userType === 'washer') {
      if (!formData.experience.trim()) {
        Alert.alert('Error', 'Please enter your experience');
        return;
      }
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Registration Successful',
        'Your account has been created successfully. Please verify your phone number to continue.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login', { userType }),
          },
        ]
      );
    }, 2000);
  };

  const renderCustomerFields = () => (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Bike Number (Optional)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="bicycle-outline" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Enter your bike number"
            value={formData.bikeNumber}
            onChangeText={(value) => handleInputChange('bikeNumber', value)}
          />
        </View>
      </View>
    </>
  );

  const renderWasherFields = () => (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Experience (Years)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="briefcase-outline" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Enter years of experience"
            value={formData.experience}
            onChangeText={(value) => handleInputChange('experience', value)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Documents Required</Text>
        <View style={styles.documentsContainer}>
          <TouchableOpacity style={styles.documentItem}>
            <Ionicons name="document-outline" size={24} color="#2196F3" />
            <Text style={styles.documentText}>Aadhar Card</Text>
            <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.documentItem}>
            <Ionicons name="document-outline" size={24} color="#2196F3" />
            <Text style={styles.documentText}>PAN Card</Text>
            <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.documentItem}>
            <Ionicons name="document-outline" size={24} color="#2196F3" />
            <Text style={styles.documentText}>Bank Details</Text>
            <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={['#2196F3', '#1976D2']}
          style={styles.background}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {userType === 'customer' ? 'Customer Registration' : 'Washer Registration'}
            </Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={userType === 'customer' ? 'person-add' : 'briefcase'}
                size={60}
                color="white"
              />
            </View>

            <Text style={styles.title}>
              Create Your Account
            </Text>
            <Text style={styles.subtitle}>
              {userType === 'customer'
                ? 'Join us to get your bike professionally cleaned'
                : 'Start earning by providing bike wash services'}
            </Text>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChangeText={(value) => handleInputChange('fullName', value)}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.phoneInputContainer}>
                  <PhoneInput
                    defaultCode="IN"
                    layout="first"
                    onChangeFormattedText={(text) => handleInputChange('phoneNumber', text)}
                    containerStyle={styles.phoneInput}
                    textContainerStyle={styles.phoneTextContainer}
                    textInputStyle={styles.phoneTextInput}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="location-outline" size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your address"
                    value={formData.address}
                    onChangeText={(value) => handleInputChange('address', value)}
                    multiline
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>City</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="business-outline" size={20} color="#666" />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter city"
                      value={formData.city}
                      onChangeText={(value) => handleInputChange('city', value)}
                    />
                  </View>
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>Pincode</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="location-outline" size={20} color="#666" />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChangeText={(value) => handleInputChange('pincode', value)}
                      keyboardType="numeric"
                      maxLength={6}
                    />
                  </View>
                </View>
              </View>

              {/* Conditional Fields */}
              {userType === 'customer' ? renderCustomerFields() : renderWasherFields()}

              {/* Terms and Conditions */}
              <View style={styles.termsContainer}>
                <TouchableOpacity style={styles.checkboxContainer}>
                  <Ionicons name="checkbox-outline" size={20} color="#2196F3" />
                  <Text style={styles.termsText}>
                    I agree to the Terms & Conditions and Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#4CAF50', '#45A049']}
                  style={styles.registerButtonGradient}
                >
                  <Text style={styles.registerButtonText}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login', { userType })}
                >
                  <Text style={styles.loginLink}>Login here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#212121',
  },
  phoneInputContainer: {
    marginBottom: 0,
  },
  phoneInput: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  phoneTextContainer: {
    backgroundColor: '#F5F5F5',
  },
  phoneTextInput: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  documentsContainer: {
    gap: 10,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  documentText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#212121',
  },
  termsContainer: {
    marginBottom: 25,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  registerButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen; 