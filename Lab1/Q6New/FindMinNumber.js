import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

const FindMinNumber = () => {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [num3, setNum3] = useState("");
    const [result, setResult] = useState(null);

    const findMinimum = () => {
        if (!num1 || !num2 || !num3 || isNaN(num1) || isNaN(num2) || isNaN(num3)) {
            setResult("Please enter valid numbers");
            return;
        }
        const min = Math.min(parseFloat(num1), parseFloat(num2), parseFloat(num3));
        setResult(`Minimum of ${num1}, ${num2}, ${num3} is: ${min}`);
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Enter first number:</Text>
            <TextInput
                value={num1}
                onChangeText={setNum1}
                placeholder="Number 1"
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Text>Enter second number:</Text>
            <TextInput
                value={num2}
                onChangeText={setNum2}
                placeholder="Number 2"
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Text>Enter third number:</Text>
            <TextInput
                value={num3}
                onChangeText={setNum3}
                placeholder="Number 3"
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Button title="Find Minimum" onPress={findMinimum} />
            {result && <Text style={{ marginTop: 10 }}>{result}</Text>}
        </View>
    );
};

export default FindMinNumber;