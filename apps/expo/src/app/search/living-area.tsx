import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '~/components/ui/Button'

const LivingArea = () => {
  return (
    <View>
      <Text>LivingArea</Text>
      <Button title="Weiter" onPress="/search/number-of-rooms" />
    </View>
  )
}

export default LivingArea