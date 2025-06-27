import { StyleSheet } from 'react-native';

export const notificationDetailStyles = StyleSheet.create({
  notFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundIcon: {
    fontSize: 32,
  },
  backIconText: {
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  notFoundButton: {
    borderRadius: 22,
  },
  notFoundButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  animatedContainer: {
    flex: 1,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 10,
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  emojiContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 18,
  },
  metadataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  metadataDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  metadataText: {
    flex: 1,
  },
  spacer: {
    height: 32,
  },
  scrollContainer: {
    flex: 1,
  },
  animatedWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  flexContainer: {
    flex: 1,
  },
  headerDynamic: {
    height: 'auto',
  },
  headerFixed: {
    height: 88,
  },
});
