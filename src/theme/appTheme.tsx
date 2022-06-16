import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  globalMargin: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
  },
  buttonXL: {
    width: 100,
    height: 100,
    backgroundColor: '#5856D6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonXLText: {
    color: 'white',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  menuContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: 'flex-start',
  },
  menuText: {
    fontSize: 20,
    color: 'black',
  },
  menuButton: {
    marginVertical: 1,
    padding: 5,
    backgroundColor: 'rgba(244,171,37,1)',
    borderRadius: 5,
    width: 250,
  },
  login: {
    height: '100%',
  },
  loginImage: {
    marginTop: 50,
    width: 180,
    height: 180,
  },
  titleLogin: {
    fontSize: 40,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 45,
    color: 'black',
    marginBottom: 10,
  },
  titleH1: {
    fontSize: 30,
    marginVertical: 5,
    fontWeight: 'bold',
  },
});
