import React, { Suspense } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificationProvider } from '@/src/context/NotificationContext';
import { NotificationListScreen } from '@/src/screens/NotificationListScreen';
import { NotificationDetailScreen } from '@/src/screens/NotificationDetailScreen';
import { RootStackParamList } from '@/src/types';

const Stack = createStackNavigator<RootStackParamList>();

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error capturado por Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Algo salió mal. Por favor reinicia la aplicación.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const AppLoadingFallback: React.FC = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingText}>Iniciando aplicación...</Text>
  </View>
);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Suspense fallback={<AppLoadingFallback />}>
          <NotificationProvider>
            <NavigationContainer>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor="transparent"
                translucent
              />
              <Stack.Navigator
                initialRouteName="NotificationList"
                screenOptions={{
                  headerShown: false,
                  gestureEnabled: true,
                  cardStyleInterpolator: ({ current, layouts }) => {
                    return {
                      cardStyle: {
                        transform: [
                          {
                            translateX: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [layouts.screen.width, 0],
                            }),
                          },
                        ],
                      },
                    };
                  },
                }}
              >
                <Stack.Screen
                  name="NotificationList"
                  component={NotificationListScreen}
                />
                <Stack.Screen
                  name="NotificationDetail"
                  component={NotificationDetailScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </NotificationProvider>
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default App;
