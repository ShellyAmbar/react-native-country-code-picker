import { GlobalColors } from '@equalbill/styles/global-colors';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  searchbar: {
    borderRadius: 16,
    borderColor: GlobalColors.Border,
    borderWidth: 1,
    width: '100%',
    paddingVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  input: {
    alignItems: 'center',
    width: '100%',
    paddingStart: 35,
    zIndex: 0,
    color: '#FFF',
  },
  search_icon: {
    position: 'absolute',
    start: 5,
    zIndex: 1,
  },
  delete_icon: {
    position: 'absolute',
    end: 15,
    zIndex: 1,
  },
});

export default style;
