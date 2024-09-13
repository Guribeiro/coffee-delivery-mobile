import { useEffect } from "react"
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated" 
import { useWindowDimensions } from "react-native"

import { config } from '@config/gluestack-ui.config'

export const CoffeeBackgroundLayer = () => {
  const { colors } = config.tokens
  const { width, height} = useWindowDimensions()

  const coffeeLayerHeight = useSharedValue(0)

  const coffeeLayerStyles = useAnimatedStyle(() =>{
    return {
      height: coffeeLayerHeight.value
    }
  })

  useEffect(() => {
  const finalHeight = (55 * height) / 100

    coffeeLayerHeight.value = withTiming(finalHeight, {duration: 1000})
  },[height])

  return (
    <Animated.View style={{width, height, position: 'absolute'}}>
     <Animated.View 
        style={
          [{
          position: 'relative',
          backgroundColor: colors.gray100,
          height: 0
        }, coffeeLayerStyles]
      }
     />
    </Animated.View>
  )
}