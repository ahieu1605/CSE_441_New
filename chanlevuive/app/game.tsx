import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GameScreen() {
  const { balance: balanceParam } = useLocalSearchParams();
  const initialBalance = parseInt(balanceParam as string) || 0; // Số dư ban đầu từ params
  const [balance, setBalance] = useState<number>(initialBalance);
  const [bet, setBet] = useState<string>('');
  const [choice, setChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Hàm định dạng số tiền
  const formatMoney = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ';
  };

  const rollDice = () => {
    const dice = Array(3).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    const total = dice.reduce((a, b) => a + b, 0);
    const isTriple = dice.every(val => val === dice[0]);
    return { dice, total, isTriple };
  };

  const updateBalance = async (newBalance: number) => {
    setBalance(newBalance);
    await AsyncStorage.setItem('balance', newBalance.toString());
  };

  const handlePlay = async () => {
    const betAmount = parseInt(bet);
    if (!betAmount || betAmount > balance) {
      setMessage('Số tiền cược không hợp lệ!');
      return;
    }

    const { dice, total, isTriple } = rollDice();
    const isWin = (choice === 'Tài' && total > 9) || (choice === 'Xỉu' && total <= 9);

    setResult(`Kết quả: ${dice.join(' - ')} (Tổng: ${total})`);

    if (isTriple) {
      const winnings = betAmount * 10;
      await updateBalance(balance + winnings);
      setMessage(`NỔ HỦ! Bạn cược ${choice} và thắng ${formatMoney(winnings)}!`);
    } else if (isWin) {
      await updateBalance(balance + betAmount);
      setMessage(`Bạn cược ${(choice)} và thắng ${formatMoney(betAmount)}!`);
    } else {
      await updateBalance(balance - betAmount);
      setMessage(`Bạn cược ${(choice)} và thua!`);
    }
  };

  return (
    <View style={styles.container}>
      {message && <Text style={styles.message}>{message}</Text>}
      <Text style={styles.balance}>Số dư: {formatMoney(balance)}</Text>
      <TextInput
        placeholder="Nhập số tiền cược"
        value={bet}
        onChangeText={setBet}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="TÀI"
          onPress={() => {
            setChoice('Tài');
            setMessage(`Bạn chọn: Tài`);
          }}
          color="#1E90FF"
        />
        <Button
          title="XỈU"
          onPress={() => {
            setChoice('Xỉu');
            setMessage(`Bạn chọn: Xỉu`);
          }}
          color="#1E90FF"
        />
      </View>
      <View style={styles.rollButton}>
        <Button
          title="ĐỔ XÚC XẮC"
          onPress={handlePlay}
          disabled={!choice || !bet}
          color="#87CEEB"
        />
      </View>
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  message: {
    fontSize: 50,
    color: '#32CD32',
    marginBottom: 10,
    textAlign: 'center',
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginVertical: 10,
  },
  rollButton: {
    width: '60%',
    marginVertical: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});