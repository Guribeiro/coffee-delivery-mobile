import { config } from "@config/gluestack-ui.config"
import { Button, HStack, Text } from "@gluestack-ui/themed"

import {Feather} from '@expo/vector-icons'

type CartAmountControllerProps = {
  onIncreasePress() : void
  onDecreasePress() : void
  amount: number
}

export const CartAmountController = ({onDecreasePress, onIncreasePress, amount}: CartAmountControllerProps) => {
  const { colors } = config.tokens
  return (
    <HStack alignItems="center" gap='$2' borderColor="$gray600" borderWidth={2} rounded='$lg'>
      <Button size="sm" bgColor="transparent" onPress={onDecreasePress}>
        <Feather name='minus' color={colors.purpleDark} size={20}/>
      </Button>
      <Text>{amount}</Text>
      <Button size="sm" bgColor="transparent" onPress={onIncreasePress}>
        <Feather name='plus' color={colors.purpleDark} size={20}/>
      </Button>
  </HStack>
  )
}