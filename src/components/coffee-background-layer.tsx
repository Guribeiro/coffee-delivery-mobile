import Animated from "react-native-reanimated" 
import {Canvas, Rect} from '@shopify/react-native-skia'
import { useWindowDimensions } from "react-native"

import { config } from '@config/gluestack-ui.config'


export const CoffeeBackgroundLayer = () => {
  const { colors } = config.tokens
  const { width, height} = useWindowDimensions()


  return (
    <Animated.View style={{width, height, position: 'absolute'}}>
      <Canvas style={{flex: 1}}>
        <Rect 
          x={0}
          y={0}
          width={width}
          height={height}
          color={colors.gray100}
        />
      </Canvas>
    </Animated.View>
  )
}