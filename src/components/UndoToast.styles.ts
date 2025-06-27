import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const undoToastStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: '#323232',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    zIndex: 1000,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
    marginRight: 16,
  },
  undoButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  undoText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#4CAF50',
    borderRadius: 1,
  },
});

export { width };
