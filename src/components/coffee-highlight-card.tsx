import { Box, HStack, Image, Text, VStack } from "@gluestack-ui/themed"
import { COFFEE_HIGHLIGHT } from "@data/coffee-highlights"
import { CoffeePrice } from '@components/coffee-price'

type CoffeeHighlightCardProps = {
  data: COFFEE_HIGHLIGHT  
}

export const CoffeeHighlightCard = ({data}: CoffeeHighlightCardProps) => {
    return (
      <VStack 
        position="relative"
        overflow="visible"
        borderTopLeftRadius={6} 
        borderTopRightRadius={36}
        borderBottomRightRadius={6}
        borderBottomLeftRadius={36}
        bgColor="$gray700"
        py='$4'
        width={'100%'}
        maxWidth={208}
      >
        <VStack gap='$4' alignItems="center">
          <Box mt='-$16'>
            <Image 
              source={data.image} 
              alt={data.title} 
              width={120} 
              height={120}
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
    )
}