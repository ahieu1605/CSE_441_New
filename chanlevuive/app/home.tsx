import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [balance, setBalance] = useState<number>(0); // Số dư ban đầu là 0
  const [depositAmount, setDepositAmount] = useState<string>(''); // Số tiền nạp
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false); // Hiển thị modal nạp tiền

  // Hàm định dạng số tiền
  const formatMoney = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ';
  };

  // Load số dư từ AsyncStorage khi khởi động
  useEffect(() => {
    const loadBalance = async () => {
      const storedBalance = await AsyncStorage.getItem('balance');
      if (storedBalance) setBalance(parseInt(storedBalance));
    };
    loadBalance();
  }, []);

  // Cập nhật số dư và lưu vào AsyncStorage
  const updateBalance = async (newBalance: number) => {
    setBalance(newBalance);
    await AsyncStorage.setItem('balance', newBalance.toString());
  };

  const handleDeposit = () => {
    const amount = parseInt(depositAmount);
    if (!amount || amount <= 0) {
      alert('Số tiền nạp không hợp lệ!');
      return;
    }
    const newBalance = balance + amount;
    updateBalance(newBalance);
    setDepositAmount(''); // Reset ô nhập
    setShowDepositModal(false); // Đóng modal
    alert('Nạp tiền thành công!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Số dư: {formatMoney(balance)}</Text>
      <Button
        title="Chơi"
        onPress={() => router.push({ pathname: '/game', params: { balance: balance.toString() } })}
      />
      <Button title="Nạp tiền" onPress={() => setShowDepositModal(true)} />

      {/* Modal để nhập số tiền nạp */}
      <Modal visible={showDepositModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nhập số tiền nạp</Text>
            <TextInput
              placeholder="Nhập số tiền (VNĐ)"
              value={depositAmount}
              onChangeText={setDepositAmount}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={styles.modalButtonContainer}>
              <Button title="Hủy" onPress={() => setShowDepositModal(false)} color="#FF0000" />
              <Button title="Xác nhận" onPress={handleDeposit} color="#1E90FF" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' },
  balance: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, width: '100%', borderRadius: 5 },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 },
});