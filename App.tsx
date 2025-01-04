import 'react-native-gesture-handler';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
