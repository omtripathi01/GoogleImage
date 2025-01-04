import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    paddingVertical: 18
  },
  itemView: {
    height: 90,
    width: 150,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2b2d2f',
    backgroundColor: '#1f2125',
    marginRight: 12,
    padding: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 400,
  },
  bottomView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent'
  }
});

export default styles; 