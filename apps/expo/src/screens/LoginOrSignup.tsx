import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '~/components/ui/Button';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { type RootStackParams } from './routes';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParams, "LoginOrSignUp">;

const LoginOrSignup = ({navigation}: Props) => (
  <View className="flex items-center justify-center h-full">
    <Button title="Log in" onPress={() => {
      navigation.navigate("Login");
    }} />
    <Button title="Create a new account" onPress={() => {
      navigation.navigate("ObjectType");
    }}/>
  </View>
)

export default LoginOrSignup