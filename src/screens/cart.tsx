import { useRef } from "react"
import { Alert, FlatList } from "react-native"
import { 
  HStack, 
  View, 
  VStack, 
  Text, 
  Pressable, 
  Button
} from "@gluestack-ui/themed"
import Animated, { 
  LinearTransition, 
  SlideInDown, 
  SlideInRight, 
  SlideInUp, 
  SlideOutRight,
} from "react-native-reanimated"
import {Feather} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import {Swipeable} from 'react-native-gesture-handler'

import { AppNavigatorRouteProps } from "@routes/app.routes"
import { config } from "@config/gluestack-ui.config"

import { useCart } from "@hooks/useCart"
import { CartItem } from "@contexts/cart"

import { CoffeeCartCard } from "@components/coffee-cart-card"
import { formatyCurrency } from "@utils/format-currency"

export const Cart = () => {
  const {goBack, navigate} = useNavigation<AppNavigatorRouteProps>()
  const { colors } = config.tokens
  const {cart, total, removeFromCart} = useCart()

  const swipeableRefs = useRef<Swipeable[]>([])

  const handleRemoveFromCart = (item: CartItem, index: number) => {
    swipeableRefs.current?.[index].close()
    try {
      return Alert.alert(
        'Remover item do carrinho', 
        'Deseja mesmo remover esse item ?',
        [
          {text: 'Cancelar'},
          {text: 'Remover', style: 'destructive', onPress: () => removeFromCart(item)}
        ]
       )
    } catch (error) {
      Alert.alert('error', JSON.stringify(error, null, 2))
    }
  }

  const handleSubmitOrder = () => {
    if(cart.length < 1) return

    // awai

    navigate('orderSuccessFeedback')
  }

  return (
    <VStack flex={1}>
      <Animated.View entering={SlideInUp.duration(500)}>
        <HStack 
          mt='$8'
          px='$8'
          alignItems="center"
          py='$8'
          borderColor="$gray500"
          borderBottomWidth={1}
        >
          <View position="absolute" left='$8'>
            <Pressable onPress={goBack}>
              <Feather name='arrow-left' color={colors.gray100} size={24}/>
            </Pressable>
          </View>
          <HStack 
            w='$full'
            justifyContent="center"
            alignItems="center"
          >
            <Text
              fontFamily="$heading"
              fontSize='$lg'
            >
              Carrinho
            </Text>
          </HStack>
        </HStack>
      </Animated.View>
      
      <FlatList 
        data={cart}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => (
          <Animated.View 
            key={item.id}
            layout={LinearTransition.springify()}
            entering={SlideInRight.delay((index + 1) * 300)}
            exiting={SlideOutRight}
          >
            <Swipeable
              ref={(ref) => {
                if(ref){
                  swipeableRefs.current.push(ref)
                }
              }}
              overshootLeft={false}
              leftThreshold={10}
              renderRightActions={() => null}
              renderLeftActions={() => (
                <Pressable 
                  w='$32'
                  bgColor="$redLight"
                  justifyContent="center"
                  alignItems="center"
                  onPress={() => handleRemoveFromCart(item, index)}
                >
                  <Feather name='trash-2' size={32} color={colors.redDark} />
                </Pressable>
              )}
            >
              <CoffeeCartCard data={item} />
            </Swipeable>
          </Animated.View>
        )}
      />
      
      <Animated.View
        entering={SlideInDown.duration(1000)}
      >
        <VStack px='$8' py='$8' gap='$4' bgColor='$gray900' >
          <HStack justifyContent="space-between">
            <Text fontSize='$lg'>Valor total</Text>
            <Text fontFamily="$heading" color='$gray200' fontSize='$2xl'>{formatyCurrency(total)}</Text>
          </HStack>
          <Button 
            bgColor='$yelllowDark' 
            size="xl" 
            rounded='$md'
            onPress={handleSubmitOrder}
            disabled={cart.length < 1}
          >
            <Text 
              color='$gray900' 
              fontFamily="$bodyBold" 
              textTransform="uppercase"
            >
              confrmar pedido
            </Text>
          </Button>
        </VStack>
      </Animated.View>
    </VStack>
  )
}