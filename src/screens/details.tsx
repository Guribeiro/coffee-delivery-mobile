import { useCallback, useEffect, useMemo, useState } from "react"
import { 
  Box, 
  HStack, 
  VStack, 
  Text, 
  Button, 
  Spinner
} from "@gluestack-ui/themed"
import Animated, { 
  interpolate,
  runOnJS, 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
} from "react-native-reanimated"
import { 
  Pressable, 
  useWindowDimensions, 
  BackHandler, 
  ScrollView, 
  Alert
} from "react-native"
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native"

import {Feather} from '@expo/vector-icons'
import { config } from '@config/gluestack-ui.config'
import { AppNavigatorRouteProps, RootAppRoutesParams } from "@routes/app.routes"
import { COFFEES } from '@data/coffees'
import { CoffeeWithSmokesImage } from "@components/smokes"

import { CoffeePrice } from "@components/coffee-price"
import { CoffeeSizeButton } from "@components/coffee-size-options"
import { CartButton } from "@components/cart-button"
import { useCart } from "@hooks/useCart"
import { CartItem } from "../contexts/cart"

import { useCartAmountController } from "@hooks/useCartAmountController"

const COFFEE_SIZES = ['114ml', '140ml', '220ml']

export const Details = () => {
  const { colors } = config.tokens

  const { params } = useRoute<RouteProp<RootAppRoutesParams, 'details'>>()
  const {goBack} = useNavigation<AppNavigatorRouteProps>()
  
  const {id} = params

  const [selectedSize, setSelectedSize] = useState<string>()
  const [addToCartLoading, setAddToCartLoading] = useState(false)

  const {amount, decreaseAmount, increaseAmount} = useCartAmountController()

  const {height} = useWindowDimensions()
  const {addToCart} = useCart()


  const coffee = useMemo(() => {
    const findCoffee = COFFEES.flatMap(({data}) => data).find(item => item.id === id)
    return findCoffee
  },[id])

  const layerHeight = useSharedValue(0)
  const coffeeImage = useSharedValue(0)
  const opacity = useSharedValue(0)

  const backgroundLayerStyles = useAnimatedStyle(() => {
    return {
      height: layerHeight.value,
      backgroundColor: colors.gray100
    }
  })

  const focusCoffeeImageStyles = useAnimatedStyle(() => {
    return {
      opacity: coffeeImage.value,
      transform: [{translateY: interpolate(
        coffeeImage.value,
        [0, 1],
        [-height, 0]
      )}]
    }
  })

  const cartControllsStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  function focusLayerAnimation() {
    const finalHeight = (75 * height) / 100
    layerHeight.value = withTiming(finalHeight, {duration: 500})

    coffeeImage.value = withTiming(1, {duration: 500})
    opacity.value = withTiming(1, {duration: 1000})
  }

  function blurLayerAnimation() {
    const finalHeight = 0
    opacity.value = withTiming(0, {duration: 500})
    coffeeImage.value = withTiming(0, {duration: 500})
    layerHeight.value = withTiming(finalHeight, {duration: 500}, (finished) => {
      if(finished){
        'worklet'
        runOnJS(goBack)()
      }
    })
    return true
  }
 
  const handleAddToCart = useCallback(async () => {
    try {
      if(!coffee) return

      if(!selectedSize) {
        return Alert.alert('Selecione o tamanho do seu cafe', 'Voce precisa selecionar um tamanho para o seu cafe')
      }

      setAddToCartLoading(true)
  
      const cartItem: CartItem = {
        ...coffee,
        size: selectedSize,
        amount
      }
  
      await addToCart(cartItem)
    } catch (error) {
      console.log('error - [handleAddToCart]')
    }finally {
      setAddToCartLoading(false)
    }
  },[coffee, selectedSize, amount])
  

  useFocusEffect(useCallback(() => {
    focusLayerAnimation()
  },[]))

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', blurLayerAnimation)

    return () => backHandler.remove()
  },[])

  if(!coffee) return
 
  return (
    <VStack flex={1}>
      <ScrollView>
        <Animated.View 
          style={[
          {width: '100%', backgroundColor: colors.gray100, paddingHorizontal: 32},
          backgroundLayerStyles
          ]}>
          <Animated.View
          style={[{ zIndex: 1 }, focusCoffeeImageStyles]}>
            <HStack 
              alignItems='center' 
              justifyContent='space-between' 
              top='$16' 
              w={'100%'}
            >
              <Pressable onPress={blurLayerAnimation}>
                <Feather name='arrow-left' color={colors.gray900} size={20}/>
              </Pressable>
              <CartButton />
            </HStack>
          </Animated.View>
          <Animated.View style={focusCoffeeImageStyles}>
            <VStack justifyContent="space-between" h={height/1.4} pt={'$16'}>
              <VStack gap='$4'>
                <HStack justifyContent="flex-start" mt='$8'>
                  <Box py='$1' px='$3' bgColor="$gray200"  rounded='$full'>
                    <Text 
                      textTransform="uppercase" 
                      color='$gray900'
                      fontFamily="$bodyBold"
                      fontSize='$xs'
                      >
                        {coffee.type_label}
                      </Text>
                  </Box>
                </HStack>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text
                    fontFamily="$heading"
                    color='$gray900'
                    fontSize='$2xl'
                  >
                    {coffee.title}
                  </Text>
                  <CoffeePrice price={coffee.price} />
                </HStack>
                <Text
                  color="$gray900"
                  fontSize='$lg'
                >
                  {coffee.description}
                </Text>
              </VStack>
              <CoffeeWithSmokesImage />
            </VStack>
          </Animated.View>
        </Animated.View>
        <Animated.View style={cartControllsStyles}>
          <VStack px='$8' py='$8' gap='$4' mt='$8'>
            <VStack gap='$2'>
              <Text>Selecione o tamanho:</Text>
              <HStack gap='$2'>
                {COFFEE_SIZES.map((size) => (
                  <CoffeeSizeButton 
                    key={size}
                    isChecked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                    label={size}
                />
                ))}
              </HStack>
            </VStack>
            <HStack bgColor="$gray600" p='$2' rounded='$md' justifyContent="space-between">
              <HStack alignItems="center" gap='$2'>
                <Button bgColor="$gray600" onPress={() => decreaseAmount(amount - 1)}>
                    <Feather name='minus' color={colors.purpleDark} size={20}/>
                </Button>
                <Text>{amount}</Text>
                <Button bgColor="$gray600" onPress={() => increaseAmount(amount + 1)}>
                    <Feather name='plus' color={colors.purpleDark} size={20}/>
                </Button>
              </HStack>
              <Button 
                flex={1} 
                h='$12' 
                bgColor='$purpleDark' 
                rounded='$md' 
                onPress={handleAddToCart}
                disabled={addToCartLoading}
              >
                {addToCartLoading ? (
                  <Spinner color={colors.gray900} />
                ) : (
                  <Text color='$gray900' fontFamily="$bodyBold">Adicionar</Text>
                )}
              </Button>
            </HStack>
          </VStack>
        </Animated.View>
      </ScrollView>
    </VStack>
  )
}