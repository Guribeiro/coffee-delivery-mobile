import { HStack } from "@gluestack-ui/themed"
import {Feather} from '@expo/vector-icons'

import { config } from '@config/gluestack-ui.config'
import Animated, {
  interpolateColor, 
  SharedValue, 
  useAnimatedStyle
} from "react-native-reanimated"
import { CartButton } from "./cart-button"

type HomeHeaderProps = {
  scrollY: SharedValue<number>
}

export const HomeHeader = ({scrollY}:HomeHeaderProps) => {
  const { colors } = config.tokens

  const homeHeaderTextStyles = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollY.value,
        [525, 530],
        [colors.gray900, colors.gray100]
      )
    }
  })

  return (
    <HStack alignItems='center' justifyContent='space-between' px='$8' pt='$16' pb='$8'>
      <HStack alignItems='center' gap='$2'>
        <Feather name='map-pin' color={colors.purple} size={20}/>
        <Animated.Text 
          style={homeHeaderTextStyles}
          color='$white' 
          fontFamily='$body' 
          fontSize='$md'
          >
            Sorocaba, SP
          </Animated.Text>
      </HStack>
      <CartButton scrollY={scrollY} />
    </HStack>
  )
}