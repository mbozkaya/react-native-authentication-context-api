import React, { createContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Register } from './screens';
import fakeApi from './api/fakeApi';

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();

const App = () => {

  const [state, setState] = useState({
    user: null,
    isAuth: false,
    isLoading: false,
  });

  const checkAuth = async () => {
    const response = await fakeApi.checkAuth();
    setState({
      ...state,
      isAuth: response,
    });
  };

  const login = async (email, password) => {
    setState({
      ...state,
      isLoading: true,
    });
    const response = await fakeApi.login(email, password);

    setState({
      ...state,
      isLoading: false,
      isAuth: response.success,
      ...response,
    });

    return response;
  };

  const register = async (email, password) => {
    setState({
      ...state,
      isLoading: true,
    });
    const response = await fakeApi.register(email, password);

    setState({
      ...state,
      isLoading: false,
    });

    return response;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            state.isAuth ? (
              <Stack.Screen name="Home" component={Home} />
            ) :
              (
                <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                </>
              )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

