import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '~/components/ui/Button'

const NumberOfRooms = () => {
  return (
    <View>
      <Text>NumberOfRooms</Text>
      <Button title="Weiter" onPress="/search/year-of-construction" />
    </View>
  )
}

export default NumberOfRooms