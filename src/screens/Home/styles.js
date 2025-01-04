import { Dimensions, StyleSheet } from "react-native";
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#1f2125'
  },
  title: {
    color: 'black',
    fontSize: 18
  },
  button: {
    height: 40,
    width: 100,
    borderWidth: 1,
    backgroundColor: '#909090',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18
  },
  screen: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchBarContainer: {
    position: 'absolute',
    top: 140,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#1f2125',
    flex: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#2b2d2f',
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#262829',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2b2d2f',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303133',
    borderRadius: 20,
    marginLeft: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  modalListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2b2d2f',
  },
  modalListItemText: {
    color: 'white',
    fontSize: 16,
  },
})

export default styles;
