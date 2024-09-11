import { FlatList, SectionList } from 'react-native'
import {
  Text, 
  VStack, 
  HStack, 
  View, 
  Image
} from '@gluestack-ui/themed'
import Animated, { 
  SlideInRight,
  ZoomIn,
  SlideInDown
} from 'react-native-reanimated'

import { config } from '@config/gluestack-ui.config'

import { Input } from '@components/input'
import { CoffeeCard } from '@components/coffee-card'
import { HomeHeader } from '@components/home-header'
import { CoffeeHighlightCard } from '@components/coffee-highlight-card'

import { COFFEES } from '@data/coffees'
import { COFFEES_TYPE, CoffeeType } from '@data/coffees-type'
import { COFFEES_HIGHTLIGHT } from '@data/coffee-highlights'

import CoffeeBeans from "@assets/coffeebeans.png";
import { useRef, useState } from 'react'

import { FilterButton } from '@components/filter-button'

const ITEM_HEIGHT = 200;
const HEADER_HEIGHT = 520;

const ONE_SECOND_IN_MILISECONDS = 1000

export const Home = () => {
  const {colors} = config.tokens
  const flatListRef = useRef<FlatList>(null);

  const [selectedCoffeeType, setSelectedCoffeeType] = useState<CoffeeType>()

  const getFlatListOffset = (selectedIndex: number) => {
    let offset = 0;

    for (let i = 0; i < selectedIndex; i++) {
      offset += COFFEES[i].data.length * ITEM_HEIGHT; // Ajuste conforme necessário
    }

    return offset + HEADER_HEIGHT;
  };

  const handleScrollToCoffeeSection = (sectionIndex: number) => {
    const offset = getFlatListOffset(sectionIndex);
    flatListRef.current?.scrollToOffset({ offset, animated: true });
  };

  return (
    <VStack bgColor='$gray900'>
      <VStack>
        <HomeHeader />
        <FlatList 
          ref={flatListRef}
          stickyHeaderIndices={[1]}
          data={["0", "1", "2"]}
          renderItem={({index}) => {
            if(index === 0){
              return (
                <VStack gap='$8' >
                  <VStack gap='$4' px='$8' pb={137} bgColor='$gray100'>
                    <Text 
                      color='$white' 
                      fontFamily='$heading'
                      lineHeight='$2xl'
                      fontSize='$2xl'
                      >
                        Encontre o café perfeito para qualquer hora do dia
                    </Text>
                    <View position='relative'>
                      <Image 
                        source={CoffeeBeans} 
                        alt='beans'
                        position='absolute'
                        right={0}
                        top={64}
                     
                      />
                      <Input placeholder='Pesquisar' />
                    </View>
                  </VStack>
               
                  <Animated.FlatList 
                    horizontal
                    entering={SlideInRight.duration(ONE_SECOND_IN_MILISECONDS)}
                    data={COFFEES_HIGHTLIGHT}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: -128 }}
                    contentContainerStyle={{
                      gap: 12,
                      marginLeft: 0,
                      paddingHorizontal: 32,
                      paddingRight: 36, 
                      paddingTop: 48,
                      alignItems: "center",
                    }}
                    renderItem={({item}) => (
                      <Animated.View entering={ZoomIn.duration(ONE_SECOND_IN_MILISECONDS)}>
                        <CoffeeHighlightCard data={item} />
                      </Animated.View>
                    )} 
                  />
                </VStack>
              )
            } 

            if(index === 1){
              return (
                <Animated.View entering={SlideInDown.duration(ONE_SECOND_IN_MILISECONDS)}>
                  <VStack pl='$8' gap='$2' py='$4' bgColor='$gray900'>
                    <Text fontSize='$xl' color='$gray300' fontFamily='$heading'>Nossos cafés</Text>
                    <HStack 
                      gap='$4'
                    >
                      {COFFEES_TYPE.map((type, index) => (
                        <FilterButton 
                          key={type.id}
                          data={type} 
                          isChecked={selectedCoffeeType?.id === type.id} 
                          onPress={() => {
                            setSelectedCoffeeType(type)
                            handleScrollToCoffeeSection(index)
                          }} 
                        />
                      ))}
                    </HStack>
                  </VStack>
                </Animated.View>
              )
            }

            if(index === 2){
              return (
                <Animated.View entering={SlideInDown.duration(ONE_SECOND_IN_MILISECONDS)}>
                  <SectionList 
                    style={{ 
                      paddingHorizontal: 16, 
                      gap: 48, 
                      paddingTop: 16, 
                      paddingBottom: 200, 
                      backgroundColor:colors.gray900
                    }}
                    sections={COFFEES}
                    renderSectionHeader={({section: {title}}) => (
                      <Text
                        color='$gray400'
                        fontSize='$md'
                        fontFamily='$heading'
                      >
                        {title}
                      </Text>
                    )}
                    renderItem={({item}) => (
                      <CoffeeCard data={item} />
                    )}
                  />
                </Animated.View>
              )
            }
            return <></>
          }}
        />
      </VStack>
    </VStack>
  )
}