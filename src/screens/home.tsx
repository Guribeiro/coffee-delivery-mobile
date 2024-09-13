import { FlatList, Pressable, SectionList } from 'react-native'
import {
  Text, 
  VStack, 
  HStack, 
  View, 
  Image
} from '@gluestack-ui/themed'
import Animated, { 
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedScrollHandler,
  interpolateColor,
  FadeIn,
  FadeOut
} from 'react-native-reanimated'

import { config } from '@config/gluestack-ui.config'

import { Input } from '@components/input'
import { CoffeeCard } from '@components/coffee-card'
import { HomeHeader } from '@components/home-header'
import { CoffeeHighlightsList } from '@components/coffee-highlights-list'

import { COFFEES } from '@data/coffees'
import { COFFEES_TYPE, CoffeeType } from '@data/coffees-type'


import CoffeeBeans from "@assets/coffeebeans.png";
import { useRef, useState } from 'react'

import { FilterButton } from '@components/filter-button'
import { CoffeeBackgroundLayer } from '@components/coffee-background-layer'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRouteProps } from '@routes/app.routes'

const ITEM_HEIGHT = 200;
const HEADER_HEIGHT = 520;

const ONE_SECOND_IN_MILISECONDS = 1000

export const Home = () => {
  const {colors} = config.tokens
  const flatListRef = useRef<FlatList>(null);

  const {navigate} = useNavigation<AppNavigatorRouteProps>()

  const [selectedCoffeeType, setSelectedCoffeeType] = useState<CoffeeType>()

  const contentOpacity = useSharedValue(0)

  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  });

  const homeHeaderContainerStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY.value,
        [525, 530],
        [colors.gray100, colors.gray900]
      ),
      borderBottomWidth: 1,
      borderBottomColor: interpolateColor(
        scrollY.value,
        [525, 530],
        [colors.gray100, colors.gray800 ]
      ),
    }
  })
 
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
      <CoffeeBackgroundLayer />
      <VStack>
        <Animated.View 
          entering={FadeIn.delay(1000)} 
          style={homeHeaderContainerStyles}
        >
          <HomeHeader scrollY={scrollY}/>
        </Animated.View>
        <Animated.FlatList 
          ref={flatListRef}
          stickyHeaderIndices={[1]}
          onScroll={scrollHandler}
          data={["0", "1", "2"]}
          renderItem={({index}) => {
            if(index === 0){
              return (
                <VStack gap='$8' >
                  <Animated.View entering={FadeIn.delay(1000)}>
                    <VStack gap='$4' px='$8'>
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
                  </Animated.View>
                  <CoffeeHighlightsList />
                </VStack>
              )
            } 

            if(index === 1){
              return (
                <Animated.View entering={SlideInDown.duration(ONE_SECOND_IN_MILISECONDS).withCallback((finished) => {
                  if(finished) {
                    contentOpacity.value = withTiming(1, {duration: 1000})
                  }
                })}>
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
                      <Pressable onPress={() => navigate('details', {id: item.id})}>
                        <CoffeeCard data={item} />
                      </Pressable>
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