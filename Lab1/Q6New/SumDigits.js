import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

const SumDigits = () => {
    const [number, setNumber] = useState("");
    const [result, setResult] = useState(null);

    const calculateSum = () => {
        if (!number || isNaN(number)) {
            setResult("Please enter a valid number");
            return;
        }
        const numStr = number.toString();
        const firstDigit = parseInt(numStr[0]);
        const lastDigit = parseInt(numStr[numStr.length - 1]);
        setResult(`First digit (${firstDigit}) + last digit (${lastDigit}) = ${firstDigit + lastDigit}`);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Enter a number:</Text>
            <TextInput
                value={number}
                onChangeText={setNumber}
                placeholder="Enter number"
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Button title="Calculate Sum" onPress={calculateSum} />
            {result && <Text style={{ marginTop: 10 }}>{result}</Text>}
        </View>
    );
};

export default SumDigits;