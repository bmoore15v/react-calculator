import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Switch, View } from 'react-native'
import { myColors } from './src/styles/Colors'
import { ThemeContext } from './src/context/ThemeContext'
import MyKeyboard from './src/components/MyKeyboard'
import SwitchWithIcons from './src/components/Toggle'

export default function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={
          theme === 'light'
            ? styles.container
            : [styles.container, { backgroundColor: 'black' }]
        }
      >
        <View style={styles.switch}>
          <SwitchWithIcons
            value={theme === 'dark'}
            trackColor={{
              true: myColors.btnGray,
              false: myColors.btnDark,
            }}
            thumbColor={{
              true: myColors.blue,
              false: myColors.light,
            }}
            onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          ></SwitchWithIcons>
        </View>
        <MyKeyboard />
      </SafeAreaView>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
    </ThemeContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  switch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})
