import { Button, Text } from "@gluestack-ui/themed"
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { config } from '@config/gluestack-ui.config'
import { useEffect } from "react"

const {colors, fonts} = config.tokens


type CoffeeSizeButton = {
  label: string
  isChecked?: boolean
  onChange: () => void
}

type FontFamilySharedValue = 'Roboto_400Regular' | 'Roboto_700Bold'

const AnimatedButton = Animated.createAnimatedComponent(Button)


export const CoffeeSizeButton = ({isChecked, label, onChange}: CoffeeSizeButton) => {

  const checked = useSharedValue(0)
  const fontFamily = useSharedValue<FontFamilySharedValue>('Roboto_400Regular')

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderWidth: 2,
      borderColor: interpolateColor(
        checked.value,
        [0, 1],
        [colors.gray600, colors.purpleDark]
      )
    }
  })

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        checked.value,
        [0, 1],
        [colors.gray300, colors.purpleDark]
      ),
    }
  })

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0)
  },[isChecked])

 
  return (
    <AnimatedButton 
      style={buttonAnimatedStyle}
      bgColor="$gray600"
      onPress={onChange}
    >
      <Animated.Text style={textAnimatedStyle}>
        {label}
      </Animated.Text>
    </AnimatedButton>
  )
}