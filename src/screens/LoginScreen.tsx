import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import {GoogleSigninButton} from 'react-native-google-signin';
import {
  ActivityIndicator,
  Button,
  Colors,
  DefaultTheme,
  Text,
  TextInput,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SnackBarAlert} from '../components/SnackBarAlert';
import {AuthContext} from '../context/auth/AuthContext';
import {SnackBarContext} from '../context/snackBar/SnackBarContext';
import {TYPEALERT} from '../context/snackBar/SnackBarReducer';
import {IUser} from '../interface/IUser';
import {styles} from '../theme/appTheme';

export const LoginScreen = () => {
  const navigator = useNavigation<StackNavigationProp<any>>();
  const {sigIn, SignInGoogle} = useContext(AuthContext);
  const {openF} = useContext(SnackBarContext);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [verify, setVerify] = useState(false);

  const login = async () => {
    if (
      Object.keys(user).length < 2 ||
      [user.email, user.password].includes('')
    ) {
      return openF(
        'Todos los campos son obligatorios!',
        2000,
        TYPEALERT.DANGER,
      );
    }
    setVerify(true);
    await sigIn(user);
    setVerify(false);
    let clear: IUser = {} as IUser;
    setUser(clear);
  };
  const onChange = (name: string, value: string) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const _signIn = async () => {
    await SignInGoogle();
  };

  if (verify) {
    return (
      <ActivityIndicator
        animating={true}
        color={Colors.purple600}
        style={{flex: 1}}
        size="large"
      />
    );
  }
  return (
    <SafeAreaView style={styles.login}>
      <SnackBarAlert />
      <SafeAreaView style={{alignItems: 'center'}}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.loginImage}
        />
      </SafeAreaView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <SafeAreaView style={{marginVertical: 20, marginBottom: 50}}>
          <Text style={styles.titleLogin}>Bienvenido!</Text>
          <Text style={{color: 'black', fontSize: 20}}>
            Inicia sesion para continuar
          </Text>
        </SafeAreaView>
        <TextInput
          label="Email"
          mode="flat"
          theme={DefaultTheme}
          underlineColorAndroid="black"
          activeUnderlineColor="black"
          style={styles.input}
          onChangeText={value => onChange('email', value)}
        />
        <TextInput
          label="Password"
          mode="flat"
          secureTextEntry={true}
          onChangeText={value => onChange('password', value)}
          theme={DefaultTheme}
          underlineColorAndroid="black"
          activeUnderlineColor="black"
          style={styles.input}
        />
        <Button
          icon="login"
          mode="contained"
          color="black"
          onPress={() => login()}
          labelStyle={{
            color: 'white',
            fontWeight: '900',
            fontSize: 15,
          }}
          style={{marginBottom: 10, marginTop: 20}}>
          Iniciar Sesion
        </Button>
        <GoogleSigninButton
          style={{
            width: Dimensions.get('screen').width - 40,
          }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={_signIn}
        />

        <SafeAreaView
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 100,
          }}>
          <Text style={{color: 'black', fontSize: 20}}>Soy nuevo, quiero </Text>
          <TouchableOpacity
            onPress={() => navigator.navigate('RegisterScreen')}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              registrarme
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};
