import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Splash } from '../screens/splash';
import { Home } from '../screens/home';

type RootAppRoutesParams = {
  splash: undefined
  home: undefined
}

const { Navigator, Screen} = createNativeStackNavigator<RootAppRoutesParams>()

export const AppRoutes = () => {
  return (
    <Navigator 
      screenOptions={{
      headerShown: false
      }}
    >
      <Screen name='home' component={Home} />
      <Screen name='splash' component={Splash} />
    </Navigator>
  )
}