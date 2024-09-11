import { HStack, Text } from "@gluestack-ui/themed"

type CoffeePrice = {
  price: number
}

export const CoffeePrice = ({price}:CoffeePrice) => {
  return (
    <HStack alignItems="baseline" gap='$1'>
      <Text color='$yelllowDark'>R$</Text>
      <Text 
        color='$yelllowDark'
        fontFamily="$heading" 
        fontSize='$3xl'
        >
          {price.toFixed(2).replace('.', ',')}
      </Text>
    </HStack>
  )
}