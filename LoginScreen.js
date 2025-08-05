import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input';

const LoginScreen = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType] = useState(route.params?.userType || 'customer');

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpInput(true);
      Alert.alert('Success', `OTP sent to ${phoneNumber}`);
    }, 2000);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate based on user type
      if (userType === 'customer') {
        navigation.replace('CustomerTabs');
      } else {
        navigation.replace('WasherTabs');
      }
    }, 2000);
  };

  const handleResendOtp = () => {
    Alert.alert('Success', 'OTP resent successfully');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
              {userType === 'customer' ? 'Customer Login' : 'Washer Login'}
            </Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={userType === 'customer' ? 'person' : 'briefcase'}
                size={60}
                color="white"
              />
            </View>

            <Text style={styles.title}>
              Welcome to BikeWash Pro
            </Text>
            <Text style={styles.subtitle}>
              {userType === 'customer'
                ? 'Get your bike professionally cleaned'
                : 'Start earning by washing bikes'}
            </Text>

            {/* Phone Number Input */}
            {!showOtpInput && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.phoneInputContainer}>
                  <PhoneInput
                    defaultCode="IN"
                    layout="first"
                    onChangeFormattedText={(text) => setPhoneNumber(text)}
                    containerStyle={styles.phoneInput}
                    textContainerStyle={styles.phoneTextContainer}
                    textInputStyle={styles.phoneTextInput}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.button, isLoading && styles.buttonDisabled]}
                  onPress={handleSendOtp}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={['#4CAF50', '#45A049']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>
                      {isLoading ? 'Sending...' : 'Send OTP'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            {/* OTP Input */}
            {showOtpInput && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Enter OTP</Text>
                <Text style={styles.otpSubtext}>
                  We've sent a 6-digit code to {phoneNumber}
                </Text>
                <TextInput
                  style={styles.otpInput}
                  value={otp}
                  onChangeText={setOtp}
                  placeholder="Enter 6-digit OTP"
                  keyboardType="numeric"
                  maxLength={6}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  style={[styles.button, isLoading && styles.buttonDisabled]}
                  onPress={handleVerifyOtp}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={['#4CAF50', '#45A049']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={handleResendOtp}
                >
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register', { userType })}
              >
                <Text style={styles.registerLink}>Register here</Text>
              </TouchableOpacity>
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
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  phoneInputContainer: {
    marginBottom: 20,
  },
  phoneInput: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  phoneTextContainer: {
    backgroundColor: 'white',
  },
  phoneTextInput: {
    fontSize: 16,
  },
  otpSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  otpInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 5,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  resendText: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  registerLink: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen; 