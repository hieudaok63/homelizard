import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '~/components/ui/Button'

const Availability = () => {
  return (
    <View>
      <Text>Availability</Text>
      <Button title="Weiter" onPress="/search/object-style" />
    </View>
  )
}

export default Availability