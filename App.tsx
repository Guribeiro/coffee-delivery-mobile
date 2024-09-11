import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Routes } from './src/routes';
import {Baloo2_800ExtraBold} from '@expo-google-fonts/baloo-2'
import {Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import {GluestackUIProvider} from '@gluestack-ui/themed'
import {config} from '@config/gluestack-ui.config'
 
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
    <GluestackUIProvider config={config}>
      <Routes />
    </GluestackUIProvider>
  );
}
