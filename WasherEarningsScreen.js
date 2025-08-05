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

const WasherEarningsScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const earningsData = {
    today: {
      total: 1250,
      orders: 8,
      average: 156,
      pending: 450,
    },
    week: {
      total: 8750,
      orders: 45,
      average: 194,
      pending: 1200,
    },
    month: {
      total: 32500,
      orders: 180,
      average: 181,
      pending: 3500,
    },
  };

  const recentTransactions = [
    {
      id: 1,
      orderId: 'ORD123456789',
      customer: 'Rahul Kumar',
      service: 'Premium Wash',
      amount: 225,
      date: '2024-01-15',
      time: '10:30 AM',
      status: 'completed',
    },
    {
      id: 2,
      orderId: 'ORD123456788',
      customer: 'Priya Sharma',
      service: 'Basic Wash',
      amount: 135,
      date: '2024-01-15',
      time: '11:45 AM',
      status: 'completed',
    },
    {
      id: 3,
      orderId: 'ORD123456787',
      customer: 'Amit Patel',
      service: 'Deluxe Package',
      amount: 360,
      date: '2024-01-15',
      time: '02:15 PM',
      status: 'pending',
    },
    {
      id: 4,
      orderId: 'ORD123456786',
      customer: 'Sneha Reddy',
      service: 'Premium Wash',
      amount: 225,
      date: '2024-01-14',
      time: '03:30 PM',
      status: 'completed',
    },
  ];

  const periods = [
    { id: 'today', name: 'Today' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
  ];

  const currentData = earningsData[selectedPeriod];

  const handleWithdraw = () => {
    Alert.alert(
      'Withdraw Earnings',
      `Withdraw ₹${currentData.pending} to your bank account?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Withdraw', onPress: () => console.log('Processing withdrawal...') },
      ]
    );
  };

  const renderPeriodButton = (period) => (
    <TouchableOpacity
      key={period.id}
      style={[
        styles.periodButton,
        selectedPeriod === period.id && styles.selectedPeriodButton,
      ]}
      onPress={() => setSelectedPeriod(period.id)}
    >
      <Text
        style={[
          styles.periodText,
          selectedPeriod === period.id && styles.selectedPeriodText,
        ]}
      >
        {period.name}
      </Text>
    </TouchableOpacity>
  );

  const renderTransactionItem = (transaction) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={styles.transactionIcon}>
          <Ionicons
            name={transaction.status === 'completed' ? 'checkmark-circle' : 'time'}
            size={20}
            color={transaction.status === 'completed' ? '#4CAF50' : '#FF9800'}
          />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionOrderId}>{transaction.orderId}</Text>
          <Text style={styles.transactionCustomer}>{transaction.customer}</Text>
          <Text style={styles.transactionService}>{transaction.service}</Text>
        </View>
      </View>
      
      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>₹{transaction.amount}</Text>
        <Text style={styles.transactionTime}>{transaction.time}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: transaction.status === 'completed' ? '#4CAF50' : '#FF9800' }
        ]}>
          <Text style={styles.statusText}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </Text>
        </View>
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
          <Text style={styles.headerTitle}>My Earnings</Text>
          <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
            <Ionicons name="wallet-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.section}>
          <View style={styles.periodSelector}>
            {periods.map(renderPeriodButton)}
          </View>
        </View>

        {/* Earnings Overview */}
        <View style={styles.section}>
          <View style={styles.earningsCard}>
            <LinearGradient
              colors={['#4CAF50', '#45A049']}
              style={styles.earningsGradient}
            >
              <View style={styles.earningsHeader}>
                <Text style={styles.earningsLabel}>Total Earnings</Text>
                <Text style={styles.earningsAmount}>₹{currentData.total}</Text>
              </View>
              
              <View style={styles.earningsStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{currentData.orders}</Text>
                  <Text style={styles.statLabel}>Orders</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹{currentData.average}</Text>
                  <Text style={styles.statLabel}>Average</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>₹{currentData.pending}</Text>
                  <Text style={styles.statLabel}>Pending</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <LinearGradient
                colors={['#FF9800', '#F57C00']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="wallet-outline" size={24} color="white" />
                <Text style={styles.quickActionText}>Withdraw</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="analytics-outline" size={24} color="white" />
                <Text style={styles.quickActionText}>Analytics</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <LinearGradient
                colors={['#9C27B0', '#7B1FA2']}
                style={styles.quickActionGradient}
              >
                <Ionicons name="document-text-outline" size={24} color="white" />
                <Text style={styles.quickActionText}>Reports</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.transactionsContainer}>
            {recentTransactions.map(renderTransactionItem)}
          </View>
        </View>

        {/* Performance Tips */}
        <View style={styles.section}>
          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Ionicons name="bulb-outline" size={24} color="#FF9800" />
              <Text style={styles.tipsTitle}>Earnings Tips</Text>
            </View>
            <Text style={styles.tipsText}>
              • Complete more orders to earn bonus rewards{'\n'}
              • Maintain high ratings for better order priority{'\n'}
              • Work during peak hours for more orders{'\n'}
              • Provide excellent service for tips
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
  withdrawButton: {
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
  seeAllText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  periodSelector: {
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
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: '#2196F3',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedPeriodText: {
    color: 'white',
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
    alignItems: 'center',
    marginBottom: 20,
  },
  earningsLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    marginHorizontal: 5,
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
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionOrderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  transactionCustomer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  transactionService: {
    fontSize: 12,
    color: '#999',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
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

export default WasherEarningsScreen; 