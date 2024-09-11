import { useEffect } from "react"
import { Button, Text } from "@gluestack-ui/themed"
import { CoffeeType } from "@data/coffees-type"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming
} from 'react-native-reanimated'
import { config } from '@config/gluestack-ui.config'

const AnimatedButton = Animated.createAnimatedComponent(Button)
const AnimatedButtonText = Animated.createAnimatedComponent(Text)

type FilterButton = {
  data: CoffeeType,
  isChecked: boolean
  onPress: () => void
}

const {colors} = config.tokens

export const FilterButton = ({data, isChecked, onPress}: FilterButton) => {

    
  const checked = useSharedValue(0)

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        checked.value,
        [0, 1],
        ['transparent', colors.purpleDark]
      )
    }
  })
  const buttonTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [colors.purpleDark, colors.gray900]
      )
    }
  })



  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0)
  },[isChecked])


  return (
    <AnimatedButton 
      key={data.id}
      bgColor='transparent' 
      style={buttonAnimatedStyle}
      borderColor='$purpleDark'
      borderWidth={2} 
      rounded='$full'
      onPress={onPress}
    >
    <AnimatedButtonText
      textTransform="uppercase" 
      style={buttonTextAnimatedStyle}
      color={'$purpleDark'}
      fontFamily="$bodyBold"
      fontSize='$xs'
    >
      {data.title}
    </AnimatedButtonText>
  </AnimatedButton>
  )
}