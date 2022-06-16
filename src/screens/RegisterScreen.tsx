import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Button,
  Colors,
  DefaultTheme,
  Text,
  TextInput,
} from 'react-native-paper';
import {styles} from '../theme/appTheme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import {AuthContext} from '../context/auth/AuthContext';
import {Collection, FirebaseContext} from '../context/firebase/FirebaseContext';
import {IUserApp, TypeAdmin} from '../interface/IUserApp';
import {SnackBarAlert} from '../components/SnackBarAlert';
import {SnackBarContext} from '../context/snackBar/SnackBarContext';
import {TYPEALERT} from '../context/snackBar/SnackBarReducer';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {registerUser} = useContext(AuthContext);
  const {createCollection, getDatabyParam} = useContext(FirebaseContext);
  const [user, setUser] = useState<IUserApp>({} as IUserApp);
  const {openF} = useContext(SnackBarContext);
  const [registrando, setRegistrando] = useState(false);
  const onChange = (name: string, value: string) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const registerUserApp = async () => {
    if (
      Object.keys(user).length < 4 ||
      [user.name, user.phone, user.username, user.password].includes('')
    ) {
      setRegistrando(false);
      return openF(
        'Todos los campos son obligatorios!',
        4000,
        TYPEALERT.DANGER,
      );
    }
    if (user.password!.length < 6) {
      return openF(
        'La contraseña debe ser mayor a 6 caracteres!',
        4000,
        TYPEALERT.DANGER,
      );
    }
    setRegistrando(true);
    const resp = await getDatabyParam(
      Collection.Users,
      'username',
      user.username!,
    );
    if (resp === 1) {
      setRegistrando(false);
      openF('EL usuario ya se encuentra resgitrado!', 4000, TYPEALERT.DANGER);
      return;
    }
    const uid = await registerUser({
      email: user.username!,
      password: user.password!,
    });
    delete user.password;
    user.uid = uid;
    user.type = TypeAdmin.Customer;
    await createCollection(Collection.Users, user);
    let clear: IUserApp = {} as IUserApp;
    setUser(clear);
    setRegistrando(false);
  };

  if (registrando) {
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
            Registrese para continuar
          </Text>
        </SafeAreaView>
        <TextInput
          label="Nombre"
          mode="flat"
          value={user.name}
          theme={DefaultTheme}
          underlineColorAndroid="black"
          activeUnderlineColor="black"
          style={styles.input}
          onChangeText={value => onChange('name', value)}
        />
        <TextInput
          label="Telefono"
          mode="flat"
          value={user.phone}
          theme={DefaultTheme}
          underlineColorAndroid="black"
          activeUnderlineColor="black"
          style={styles.input}
          onChangeText={value => onChange('phone', value)}
        />
        <TextInput
          label="Email"
          mode="flat"
          value={user.username}
          theme={DefaultTheme}
          underlineColorAndroid="black"
          activeUnderlineColor="black"
          style={styles.input}
          onChangeText={value => onChange('username', value)}
        />
        <TextInput
          label="Password"
          mode="flat"
          value={user.password}
          secureTextEntry={true}
          theme={DefaultTheme}
          underlineColorAndroid="black"
          activeUnderlineColor="black"
          style={styles.input}
          onChangeText={value => onChange('password', value)}
        />
        <Button
          icon="login"
          mode="contained"
          color="black"
          onPress={registerUserApp}
          labelStyle={{
            color: 'white',
            fontWeight: '900',
            fontSize: 15,
          }}
          style={{marginBottom: 10, marginTop: 20}}>
          Registrarme
        </Button>

        <SafeAreaView
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 100,
          }}>
          <Text style={{color: 'black', fontSize: 20}}>Ya tengo cuenta, </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              Inicie Sesión
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};
