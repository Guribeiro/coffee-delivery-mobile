import { Box, Text, VStack } from "@gluestack-ui/themed"
import { COFFEE_HIGHLIGHT } from "@data/coffee-highlights"
import { CoffeePrice } from '@components/coffee-price'
import Animated, { interpolate, SharedValue, useAnimatedStyle, withTiming, Easing, Extrapolation, useSharedValue } from "react-native-reanimated"

type CoffeeHighlightCardProps = {
  data: COFFEE_HIGHLIGHT  
  index: number
  scrollX: SharedValue<number>;
}

export const CoffeeHighlightCard = ({data, index, scrollX}: CoffeeHighlightCardProps) => {
  const inputRange = [(index - 1) * 160, index * 160, (index + 1) * 160];

  const imageWidth = useSharedValue(104)
  const imageHeight = useSharedValue(104)

  const containerAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(interpolate(scrollX.value, inputRange, [0.80, 1, 0.80], Extrapolation.CLAMP), {duration: 50, easing: Easing.ease}),
        },
      ],
    };
  });

  const imageAnimatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(interpolate(scrollX.value, inputRange, [104, 140, 104], Extrapolation.CLAMP), {duration: 500}),
      height:  withTiming(interpolate(scrollX.value, inputRange, [104, 140, 104], Extrapolation.CLAMP),{duration: 500}),
    };
  });
    return (
      <Animated.View style={containerAnimatedStyles}>
        <VStack 
          position="relative"
          overflow="visible"
          borderTopLeftRadius={6} 
          borderTopRightRadius={36}
          borderBottomRightRadius={6}
          borderBottomLeftRadius={36}
          bgColor="$gray800"
          py='$4'
          width={'100%'}
          maxWidth={208}
        >
          <VStack gap='$4' alignItems="center">
            <Box mt='-$16'>
              <Animated.Image 
                style={imageAnimatedStyles}
                source={data.image} 
                alt={data.title} 
              />
            </Box>
            <Box py='$1' px='$3' bgColor="$purpleLight"  rounded='$full'>
              <Text 
                textTransform="uppercase" 
                color='$purpleDark'
                fontFamily="$bodyBold"
                fontSize='$xs'
                >
                  {data.type_label}
                </Text>
            </Box>
            <VStack gap='$2' alignItems="center">
              <Text 
                fontFamily="$heading" 
                fontSize='$xl'
                color='$gray200'
                textAlign="center"
              >
                {data.title}
              </Text>
              <Text 
                fontFamily="$body"
                textAlign="center"
                px='$4'
              >
                {data.description}
              </Text>
            </VStack>
            <CoffeePrice 
              price={data.price}
            />
          </VStack>
        </VStack>
      </Animated.View>
    )
}