import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView } from "react-native";

const Hailstone = () => {
    const [number, setNumber] = useState("");
    const [sequence, setSequence] = useState([]);

    const generateHailstone = () => {
        if (!number || isNaN(number) || parseInt(number) <= 0) {
            setSequence(["Please enter a positive number"]);
            return;
        }
        let n = parseInt(number);
        const seq = [n];
        while (n !== 1) {
            if (n % 2 === 0) {
                n = n / 2;
            } else {
                n = n * 3 + 1;
            }
            seq.push(n);
        }
        setSequence(seq);
    };

    return (
        <View style={{ padding: 20, flex: 1 }}>
            <Text>Enter a positive number:</Text>
            <TextInput
                value={number}
                onChangeText={setNumber}
                placeholder="Enter number"
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Button title="Generate Hailstone Sequence" onPress={generateHailstone} />
            <ScrollView style={{ marginTop: 10 }}>
                {sequence.length > 0 && (
                    <Text>Hailstone Sequence: {sequence.join(" -> ")}</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default Hailstone;