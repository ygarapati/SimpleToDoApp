import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from "react-native";

const App = () => {
  // Initial tasks state
  const [tasks, setTasks] = useState([
    { id: "1", title: "Buy groceries", isCompleted: true },
    { id: "2", title: "Finish homework", isCompleted: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const RenderTask = ({ item }) => (
    <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <CheckBox
          value={item.isCompleted}
          // onValueChange={setIsChecked}
          style={styles.checkbox}
        />
        <Text
          style={{
            textDecorationLine: item.completed ? "line-through" : "none",
            color: item.completed ? "gray" : "black",
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: String(tasks.length + 1), title: newTask, isCompleted: false },
      ]);
      setNewTask("");
    }
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Add new task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderTask item={item} />}
        numColumns={1}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    marginTop: 50,
  },
  taskItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  taskText: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
export default App;
