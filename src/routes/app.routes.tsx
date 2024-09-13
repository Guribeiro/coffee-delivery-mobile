import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Splash } from '@screens/splash';
import { Home } from '@screens/home';
import { Details } from '@screens/details';
import { Cart } from '@screens/cart';
import { OrderSuccessFeedback } from '@screens/order-success-feedback';

export type RootAppRoutesParams = {
  splash: undefined
  home: undefined
  details: {id: number}
  cart: undefined
  orderSuccessFeedback: undefined
}

export type AppNavigatorRouteProps = NativeStackNavigationProp<RootAppRoutesParams>  

const { Navigator, Screen, Group} = createNativeStackNavigator<RootAppRoutesParams>()

export const AppRoutes = () => {
  return (
    <Navigator 
      screenOptions={{
      headerShown: false
      }}
      initialRouteName='home'
    >
      <Screen name='splash' component={Splash} />
      <Group
        screenOptions={{gestureEnabled: false}}
      >
        <Screen name='home' component={Home} />
        <Screen name='orderSuccessFeedback' component={OrderSuccessFeedback}/>
      </Group>
      <Screen name='details' component={Details} />
      <Screen name='cart' component={Cart} />
    </Navigator>
  )
}