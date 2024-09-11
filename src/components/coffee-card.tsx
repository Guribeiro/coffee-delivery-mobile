import { COFFEE_HIGHLIGHT } from "@data/coffee-highlights"
import { Box, HStack, Image, VStack, Text } from "@gluestack-ui/themed"
import { CoffeePrice } from "./coffee-price"

type CoffeeCard = {
  data: COFFEE_HIGHLIGHT
}

export const CoffeeCard = ({data}: CoffeeCard) => {
  return (
    <HStack
      borderTopLeftRadius={6} 
      borderTopRightRadius={36}
      borderBottomRightRadius={6}
      borderBottomLeftRadius={36}
      bgColor="$gray700"
      py='$4'
      gap='$4'
    >
      <Box mt='-$10'>
        <Image 
          source={data.image} 
          alt={data.title} 
          width={120} 
          height={120}
        />
      </Box>
      <VStack flexShrink={1} gap='$1' pr='$4'>
        <Text 
          fontFamily="$heading" 
          fontSize='$xl'
          color='$gray200'
          textAlign="left"
        >
          {data.title}
        </Text>
        <Text 
          fontFamily="$body"
          textAlign="left"
        >
          {data.description}
        </Text>
        <CoffeePrice price={data.price} />
      </VStack>
    </HStack>
  )
}