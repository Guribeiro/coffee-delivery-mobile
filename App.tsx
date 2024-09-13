import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {Baloo2_800ExtraBold} from '@expo-google-fonts/baloo-2'
import {Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {GluestackUIProvider} from '@gluestack-ui/themed'
import {config} from '@config/gluestack-ui.config'

import { Routes } from './src/routes';
import { CartProvider } from './src/contexts/cart';
 
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    Baloo2_800ExtraBold, 
    Roboto_400Regular, 
    Roboto_700Bold
  })

  if(loaded) {
    SplashScreen.hideAsync();
  }

  if(!loaded) return

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GluestackUIProvider config={config}>
        <CartProvider>
          <Routes />
        </CartProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
