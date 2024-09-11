import {ComponentProps} from 'react'
import {Input as GluestackInput, HStack, InputField} from '@gluestack-ui/themed'
import {Feather} from '@expo/vector-icons'

import { config } from '@config/gluestack-ui.config'

const { colors } = config.tokens

type InputProps = ComponentProps<typeof InputField>

export const Input = ({...rest}:InputProps) => {
  return (
    <GluestackInput 
      h='$16' 
      bg='$gray200' 
      borderWidth='$1' 
      borderRadius='$md'
      px='$4' 
      borderColor={'$gray200'}
      $focus={{
        borderColor: '$gray300',
      }}
    >
      <HStack alignItems='center' width='$full'>
        <Feather name='search' color={colors.gray400} size={20}/>
        <InputField
          color='$white'
          fontFamily='$body'
          placeholderTextColor='$gray400' 
          {...rest}
          />
      </HStack>
    </GluestackInput>
  )
}  