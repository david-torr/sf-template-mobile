import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

// ── Screen components ────────────────────────────────────────────────────────

function Screen({ name }: { name: string }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenTitle}>{name}</Text>
    </View>
  )
}

function HomeScreen()     { return <Screen name="Home" /> }
function NewsScreen()     { return <Screen name="News" /> }
function FixturesScreen() { return <Screen name="Fixtures" /> }
function SquadScreen()    { return <Screen name="Squad" /> }
function MoreScreen()     { return <Screen name="More" /> }

// ── Navigator ────────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#29ABE2',
          tabBarInactiveTintColor: '#737373',
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: () => <Text style={styles.icon}>🏠</Text> }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{ tabBarIcon: () => <Text style={styles.icon}>📰</Text> }}
        />
        <Tab.Screen
          name="Fixtures"
          component={FixturesScreen}
          options={{ tabBarIcon: () => <Text style={styles.icon}>📅</Text> }}
        />
        <Tab.Screen
          name="Squad"
          component={SquadScreen}
          options={{ tabBarIcon: () => <Text style={styles.icon}>👥</Text> }}
        />
        <Tab.Screen
          name="More"
          component={MoreScreen}
          options={{ tabBarIcon: () => <Text style={styles.icon}>☰</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E5E5E5',
    borderTopWidth: 1,
  },
  tabLabel: {
    fontSize: 11,
  },
  icon: {
    fontSize: 20,
  },
})
