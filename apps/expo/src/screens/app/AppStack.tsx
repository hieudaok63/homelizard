import React from 'react'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { type TabStackParams } from './routes';
import { HomeScreen } from './Home';
import { ProfileScreen } from './Profile';
import TabBar from '~/components/navigation/TabBar';

const Tab = createBottomTabNavigator<TabStackParams>();

const AppStack = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props}/> }>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{
        num: 2
      }}/>
    </Tab.Navigator>
  )
}

export default AppStack