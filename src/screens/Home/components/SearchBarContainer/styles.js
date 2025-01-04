import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBar: {
    height: 74,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#303133',
    borderRadius: 40,
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  searchTextView: {
    justifyContent: 'center',
    flex: 1,
    marginStart: 10
  },
  serachText: {
    fontSize: 20,
    color: '#7b8082',
  },
  micIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPressed: {
    backgroundColor: '#D6E6FF',
  },

});

export default styles; 