import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";

const EmployeeForm = ({ onSubmit }) => {
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");

    const handleSubmit = () => {
        if (fullName && age && occupation) {
            onSubmit({ fullName, age, occupation });
            Alert.alert("Success", "Employee information updated!");
            setFullName("");
            setAge("");
            setOccupation("");
        } else {
            Alert.alert("Error", "Please fill in all fields.");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Full Name:</Text>
            <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter full name"
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Text>Age:</Text>
            <TextInput
                value={age}
                onChangeText={setAge}
                placeholder="Enter age"
                keyboardType="numeric"
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Text>Occupation:</Text>
            <TextInput
                value={occupation}
                onChangeText={setOccupation}
                placeholder="Enter occupation"
                style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Button title="Update" onPress={handleSubmit} />
        </View>
    );
};

export default EmployeeForm;