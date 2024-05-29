import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Image, Animated } from 'react-native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const VendorHomeScreen = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'vendors', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setCompanyName(docSnap.data().companyName);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching company info:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompanyInfo();
  }, [user]);

  const data = [
    { id: '1', title: 'View Bookings', icon: require('../assets/viewbookingicon.jpg'), screen: 'VendorBookings' },
    { id: '2', title: 'New Service', icon: require('../assets/viewbookingicon.jpg'), screen: 'NewService' },
  ];

  const renderItem = ({ item }) => (
    <AnimatedTouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.screen, { vendorId: user.uid })}
      activeOpacity={0.7}
    >
      {item.icon && <Image source={item.icon} style={styles.icon} />}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
    </AnimatedTouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0288D1" />
      ) : (
        <>
          {companyName ? (
            <Text style={styles.companyName}>{companyName}</Text>
          ) : (
            <Text style={styles.noCompany}>No company information available.</Text>
          )}
        </>
      )}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cardContainer}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('NewService', { vendorId: user.uid })}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  companyName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0288D1',
  },
  noCompany: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FF7F50',
  },
  cardContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333333',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#0288D1',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 36,
    color: '#FFF',
    lineHeight: 40,
  },
});

export default VendorHomeScreen;
