import { VStack, Text } from '@gluestack-ui/themed'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { Audio } from "expo-av"
import * as Heptics from 'expo-haptics'

import OrderHeroSvg from '@assets/orderhero.svg'
import SuccessAudioMp3 from '@assets/success.mp3'

import { Button } from '@gluestack-ui/themed'
import { BackHandler } from 'react-native'
import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { AppNavigatorRouteProps } from '@routes/app.routes'

export const OrderSuccessFeedback = () => {
  const {navigate} = useNavigation<AppNavigatorRouteProps>()

  async function playSound() {
    await Heptics.notificationAsync(Heptics.NotificationFeedbackType.Success)
    const {sound, status} = await Audio.Sound.createAsync(SuccessAudioMp3, {shouldPlay: true})
    
    if(status.isLoaded) {
      await sound.setPositionAsync(0)
      await sound.playAsync()
    }
  }

  useEffect(() => {
    playSound()
  },[])
  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigate('home')

      return true
    })

    return () => backHandler.remove()
  },[])

  return (
    <VStack 
      flex={1} 
      justifyContent='center' 
      alignItems='center' 
      px='$16'
      gap='$16'
      bgColor='$gray800'
    >
      <Animated.View entering={FadeInLeft.duration(1000)}>
        <OrderHeroSvg />
      </Animated.View>
      
      <Animated.View entering={FadeInRight.duration(1000)}>
          <VStack gap='$1'>
            <Text 
              textAlign='center'
              fontSize='$2xl'
              fontFamily='$heading'
              color='$yelllowDark'
              >
                Uhu! Pedido confirmado
            </Text>
            <Text 
              textAlign='center'
              fontSize='$lg'
            >
              Agora é só aguardar que logo o café chegará até você!
            </Text>
          </VStack>
        </Animated.View>
        <Animated.View style={{width: '100%'}} entering={FadeInLeft.duration(1000)}>
          <Button 
            bgColor='$purpleDark' 
            size="xl" 
            rounded='$md' 
            w='$full'
            onPress={() => navigate('home')}
          >
            <Text 
              color='$gray900' 
              fontFamily="$bodyBold" 
              textTransform="uppercase"
            >
              ir para a home
            </Text>
          </Button>
        </Animated.View>  
       
    </VStack>
  )
} 