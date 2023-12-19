import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const CalculatorApp = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState("");
  const [memory, setMemory] = useState(0);

  const handleButtonPress = (buttonValue) => {
    if (buttonValue === "=") {
      try {
        const expression = input.replace(/[^-()\d/*+.]/g, "");
        const evalResult = eval(expression).toString();
        setResult(evalResult);
        setHistory((prevHistory) => `${prevHistory}\n${input} = ${evalResult}`);
      } catch (error) {
        setResult("Error");
      }
    } else if (buttonValue === "C") {
      setInput("");
      setResult("");
    } else if (buttonValue === "M+") {
      setMemory((prevMemory) => prevMemory + parseFloat(result));
    } else if (buttonValue === "M-") {
      setMemory((prevMemory) => prevMemory - parseFloat(result));
    } else if (buttonValue === "MR") {
      setInput((prevInput) => prevInput + memory.toString());
    } else if (buttonValue === "MC") {
      setMemory(0);
    } else if (buttonValue === "sqrt") {
      try {
        setResult(Math.sqrt(parseFloat(result)).toString());
      } catch (error) {
        setResult("Error");
      }
    } else {
      setInput((prevInput) => prevInput + buttonValue);
    }
  };

  const renderButtons = () => {
    const buttons = [
      "7",
      "8",
      "9",
      "3",
      "4",
      "5",
      "6",
      "1",
      "2",
      "0",
      "/",
      "-",
      "*",
      ".",
      "=",
      "+",
      "C",
      "M+",
      "M-",
      "MR",
      "MC",
      "sqrt",
    ];

    return buttons.map((buttonValue) => (
      <TouchableOpacity
        key={buttonValue}
        style={styles.button}
        onPress={() => handleButtonPress(buttonValue)}
      >
        <Text style={styles.buttonText}>{buttonValue}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Calculator Task</Text>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.calculatorContainer}>
          <View style={styles.topContainer}>
            <View style={styles.resultContainer}>
              <Text style={styles.label}>Result:</Text>
              <Text style={styles.resultText}>{result}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Input:</Text>
              <Text style={styles.inputText}>{input}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>{renderButtons()}</View>
          <View style={styles.historyContainer}>
            <Text style={styles.historyLabel}>History:</Text>
            <Text style={styles.historyText}>{history}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282c34", // Dark background color
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#61dafb", // Blue text color
    marginBottom: 10,
  },
  calculatorContainer: {
    width: "60%", // Adjusted width for the calculator container
    backgroundColor: "#444", // Dark background color for the calculator
    borderRadius: 10,
    padding: 10,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  historyContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#61dafb",
    borderRadius: 8,
    maxHeight: 100,
    overflow: "auto",
  },
  label: {
    fontSize: 16,
    color: "#61dafb", // Blue text color
  },
  resultText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#61dafb", // Blue text color
  },
  inputText: {
    fontSize: 32,
    color: "#61dafb", // Blue text color
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  button: {
    width: "25%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#61dafb", // Blue button color
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
  },
  buttonText: {   
    fontSize: 24,
    color: "#fff", // White text color
  },
  historyLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#61dafb", // Blue text color
  },
  historyText: {
    fontSize: 14,
    color: "#61dafb", // Blue text color
  },
});

export default CalculatorApp;
