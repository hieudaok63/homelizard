import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { type TabStackParams } from './routes';
import { HomeScreen } from './Home';
import { ProfileScreen } from './Profile';

const TabStack = createBottomTabNavigator<TabStackParams>();

const AppStack = () => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen name="Home" component={HomeScreen} />
      <TabStack.Screen name="Profile" component={ProfileScreen} initialParams={{
        num: 2
      }}/>
    </TabStack.Navigator>
  )
}

export default AppStack