import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../screens/CustomButton';
import styles from '../screens/styles';

const UserTypeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select User Type</Text>
      <CustomButton
        title="I am a Customer"
        onPress={() => navigation.navigate('CustomerLogin')}
      />
      <CustomButton
        title="I am a Vendor"
        onPress={() => navigation.navigate('VendorLogin')}
      />
    </View>
  );
};

export default UserTypeScreen;