import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import EmployeeForm from "./EmployeeForm";
import SumDigits from "./SumDigits";
import FindMinNumber from "./FindMinNumber";
import Hailstone from "./Hailstone";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("EmployeeForm");

  const renderScreen = () => {
    switch (currentScreen) {
      case "EmployeeForm":
        return <EmployeeForm onSubmit={(data) => console.log(data)} />;
      case "SumDigits":
        return <SumDigits />;
      case "FindMinNumber":
        return <FindMinNumber />;
      case "Hailstone":
        return <Hailstone />;
      default:
        return <EmployeeForm onSubmit={(data) => console.log(data)} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Employee Form"
          onPress={() => setCurrentScreen("EmployeeForm")}
        />
        <Button
          title="Digit Sum"
          onPress={() => setCurrentScreen("SumDigits")}
        />
        <Button
          title="Min Number"
          onPress={() => setCurrentScreen("FindMinNumber")}
        />
        <Button
          title="Hailstone"
          onPress={() => setCurrentScreen("Hailstone")}
        />
      </View>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
});