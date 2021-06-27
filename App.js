import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainNav from './navigators/MainNavigator';
import BottomNavScreen from './navigators/BottomNav';
import { AuthContex } from './components/contex';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
  initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContex = React.useMemo(
    () => ({
      signIn: async (userName, password, setIsLoading) => {
        let userToken;
        userToken = null;
        fetch(`https://scanappbarcode.azurewebsites.net/CreateToken`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            UserName: userName,
            Password: password,
          }),
        })
          .then((res) => {
            if (res.ok && res.status === 201) {
              return res.json();
            } else {
              alert('Неправильный логин или пароль!');
              setIsLoading(false);
            }
          })
          .then((data) => {
            try {
              if (data) {
                userToken = data.token;
                AsyncStorage.setItem('userToken', 'Bearer ' + userToken);

                fetch(`https://scanappbarcode.azurewebsites.net/GetUser`, {
                  headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + userToken,
                  },
                })
                  .then((res) => {
                    if (res.status === 200) {
                      return res.json();
                    } else {
                      alert('Истек срок действия токена!');
                    }
                  })
                  .then((data) => {
                    if (data) {
                      // alert(`data is ${JSON.stringify(data)}`)
                      try {
                        AsyncStorage.setItem('user', JSON.stringify(data));
                        AsyncStorage.setItem('id', data.id);
                      } catch (error) {
                        //  alert(`${JSON.stringify(error)}`)
                      }
                      dispatch({
                        type: 'LOGIN',
                        id: userName,
                        token: userToken,
                      });
                    }
                  });
              }
            } catch (e) {
              alert(e);
            }
          });
      },
      signOut: async () => {
        try {
          AsyncStorage.removeItem('userToken');
          AsyncStorage.removeItem('user');
          AsyncStorage.removeItem('id');
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        setToken('qwer');
        setIsLoading(false);
      },
    }),
    [],
  );

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        alert(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color="#00aa00" size="large" />
      </View>
    );
  }
  return (
    <AuthContex.Provider value={authContex}>
      <NavigationContainer>
        {loginState.userToken !== null ? <BottomNavScreen /> : <MainNav />}
      </NavigationContainer>
    </AuthContex.Provider>
  );
}
