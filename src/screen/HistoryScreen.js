import React from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Header from '../components/Header';
import Button from '../components/Button';
import Container from '../components/Container';
import { useQuery, useMutation } from '@tanstack/react-query';
import { configHistory, sentToEngine } from '../../API/Home2';

const HistoryScreen = ({ navigation }) => {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ['configHistory'],
    queryFn: configHistory,
  });

  const { mutate: sentToEngineMutate, isPending: enginePending } = useMutation({
    mutationFn: sentToEngine,
    onSuccess: data => Alert.alert('Success', data.message),
    onError: error => Alert.alert('Error', error.message),
  });

  return (
    <ScrollViewContainer>
      <View style={styles.serverHeaderRow}>
        <Header title="History" fontSize={35} />
        <Button
          title={enginePending ? 'Sending...' : 'Send to Engine'}
          onPress={() => sentToEngineMutate()}
          disabled={enginePending}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        history.map((item, index) => (
          <Container
            key={index}
            name={item.operation}
            count={item.count}
            onPress={() => navigation.navigate('')}
          />
        ))
      )}
    </ScrollViewContainer>
  );
};

const styles = StyleSheet.create({
  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default HistoryScreen;
