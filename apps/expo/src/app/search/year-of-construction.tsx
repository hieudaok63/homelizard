import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '~/components/ui/Button'

const YearOfConstruction = () => {
  return (
    <View>
      <Text>YearOfConstruction</Text>
      <Button title="Weiter" onPress="/search/availability" />
    </View>
  )
}

export default YearOfConstruction