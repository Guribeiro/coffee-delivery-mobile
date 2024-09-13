import Animated, { 
  SlideInRight, 
  useAnimatedScrollHandler, 
  useSharedValue, 
  ZoomIn
} from 'react-native-reanimated'

import { COFFEES_HIGHTLIGHT } from '@data/coffee-highlights'
import { CoffeeHighlightCard } from './coffee-highlight-card'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRouteProps } from '@routes/app.routes'
import { Pressable } from 'react-native'

const ONE_SECOND_IN_MILISECONDS = 1000

export const CoffeeHighlightsList = () => {
  const {navigate} = useNavigation<AppNavigatorRouteProps>()
  const scrollX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.FlatList 
      horizontal
      entering={SlideInRight.duration(ONE_SECOND_IN_MILISECONDS)}
      data={COFFEES_HIGHTLIGHT}
      showsHorizontalScrollIndicator={false}
      style={{marginTop: -40}}
      onScroll={scrollHandler}
      contentContainerStyle={{
        height: 403,
        gap: 12,
        marginLeft: 0,
        paddingHorizontal: 32,
        paddingRight: 36, 
        paddingTop: 120,
        alignItems: "center",
      }}
      renderItem={({item, index}) => (
        <Animated.View entering={ZoomIn.duration(ONE_SECOND_IN_MILISECONDS)}>
          <Pressable onPress={() => navigate('details', {id: item.id})}>
            <CoffeeHighlightCard data={item} scrollX={scrollX} index={index} />
          </Pressable>
        </Animated.View>
      )} 
    />
  )
}