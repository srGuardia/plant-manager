import { StyleSheet } from 'react-native';
import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';

export const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-around' },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    width: '100%',
  },
  emoji: {
    fontSize: 90,
  },
  title: {
    color: colors.heading,
    fontSize: 32,
    fontFamily: fonts.heading,
    marginTop: 50,
  },
  text: {
    color: colors.heading,
    fontSize: 17,
    fontFamily: fonts.text,
    textAlign: 'center',
    paddingVertical: 10,
  },
  footer: { width: '100%', paddingHorizontal: 50, marginTop: 20 },
});
