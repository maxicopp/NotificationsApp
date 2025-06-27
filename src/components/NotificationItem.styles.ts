import { StyleSheet } from 'react-native';

export const notificationItemStyles = StyleSheet.create({
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 8,
  },
  unreadBorder: {
    borderWidth: 0.5,
  },
  newItemBorder: {
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  readOpacity: {
    opacity: 0.7,
  },
  unreadOpacity: {
    opacity: 1.0,
  },
  readDescriptionOpacity: {
    opacity: 0.6,
  },
  unreadDescriptionOpacity: {
    opacity: 0.85,
  },
  readTimestampOpacity: {
    opacity: 0.5,
  },
  unreadTimestampOpacity: {
    opacity: 0.7,
  },
});
