import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '~/components/ui/Button'
import { Stack } from 'expo-router'

const Location = () => {
  return (
    <View>
      <Stack.Screen name="" options={{ title: "Location" }} />
      <Text>Location</Text>
      <Button title="Weiter" onPress="/search/plot-size" />
    </View>
  )
}

export default Location