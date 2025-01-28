import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';


const Loading = () => {
  return (
    <View className={`flex-1 justify-center items-center bg-black/50`}>
      <ActivityIndicator size="large" color="#6200ee" />
      <Text className={`mt-4 text-white text-lg`}>Loading...</Text>
    </View>
  );
};

export default Loading;
