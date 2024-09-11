import { HStack, Text } from "@gluestack-ui/themed"
import {Feather} from '@expo/vector-icons'

import { config } from '@config/gluestack-ui.config'

export const HomeHeader = () => {
  const { colors } = config.tokens

  return (
    <HStack alignItems='center' justifyContent='space-between' px='$8' pt='$16' pb='$8' bgColor="$gray100">
      <HStack alignItems='center' gap='$2'>
        <Feather name='map-pin' color={colors.purple} size={20}/>
        <Text 
          color='$white' 
          fontFamily='$body' 
          fontSize='$md'
          >
            Sorocaba, SP
          </Text>
      </HStack>
      <Feather name='shopping-cart' color={colors.yelllowDark} size={20}/>
  </HStack>
  )
}