import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '600',
  },
  searchbar: {
    margin: 8,
    borderRadius: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  card: {
    marginVertical: 4,
    borderRadius: 8,
  },
});
