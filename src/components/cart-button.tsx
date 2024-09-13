import { Text, Box } from "@gluestack-ui/themed"
import { Pressable } from "react-native"
import Animated, { FadeIn, FadeOut, interpolateColor, SharedValue, useAnimatedStyle } from "react-native-reanimated"


import {Feather} from '@expo/vector-icons'

import { config } from '@config/gluestack-ui.config'
import { useCart } from "@hooks/useCart"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRouteProps } from "@routes/app.routes"


const AnimatedFeather = Animated.createAnimatedComponent(Feather)


type CartButtonProps = {
  scrollY?: SharedValue<number>
}

export const CartButton = ({scrollY}: CartButtonProps) => {
  const { colors } = config.tokens

  const {cart} = useCart()

  const {navigate} = useNavigation<AppNavigatorRouteProps>()

  const homeHeaderIconStyles = useAnimatedStyle(() => {
    if(!scrollY) return {
      color: colors.gray900
    }
    return {
      color: interpolateColor(
        scrollY.value,
        [525, 530],
        [colors.gray900, colors.gray100]
      )
    }
  })

  return (
    <Pressable onPress={() => navigate('cart')}>
      <AnimatedFeather name='shopping-cart' style={homeHeaderIconStyles} color={homeHeaderIconStyles.color} size={20}/>
      <Box  
        position="absolute"
        bottom='$4'
        left='$4'
        w='$6' 
        h='$6' 
        bgColor="$purpleDark" 
        rounded='$full'
        alignItems="center"
        justifyContent='center'
      >
        <Text 
          color="$gray900"
          >
            {cart.length}
          </Text>
      </Box>
    </Pressable>
  )
}