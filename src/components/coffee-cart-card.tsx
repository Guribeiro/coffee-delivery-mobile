import { Image, Text, VStack } from "@gluestack-ui/themed"
import { HStack } from "@gluestack-ui/themed"
import { formatyCurrency } from "@utils/format-currency"
import { CartAmountController } from "./cart-amount-controller"
import { CartItem } from "../contexts/cart"
import { useCart } from "@hooks/useCart"

interface CoffeeCartCardProps {
  data: CartItem
}

export const CoffeeCartCard = ({data}: CoffeeCartCardProps) => {
  const {decreaseAmount, increaseAmount} = useCart()

  return (
    <HStack
      alignItems="center"
      px='$8'
      gap='$4'
      borderBottomWidth={1}
      width={'100%'}
      height={138}
      borderColor="$gray500"
      bgColor='$gray800'
    >
      <Image 
        width={84}
        height={84}
        source={data.image}
        alt={data.title}
      />
      <VStack flex={1} gap='$2'>
        <HStack 
          alignItems="flex-start" 
          justifyContent="space-between"
        >
          <VStack gap='$1' >
            <Text color='$gray100' fontFamily="$bodyBold">{data.title}</Text>
            <Text color='$gray400'>{data.size}</Text>
          </VStack>
          <Text fontFamily="$heading" fontSize='$2xl'>{formatyCurrency(data.price)}</Text>
        </HStack>
        
        <HStack>
          <CartAmountController  
            amount={data.amount}
            onDecreasePress={() => decreaseAmount(data)}
            onIncreasePress={() => increaseAmount(data)}
          />
        </HStack>
      </VStack>
    </HStack>
  )
}