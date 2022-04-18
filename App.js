import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Keyboard } from "react-native-web";
import SingleTask from "./components/SingleTask";

export default function App() {
  const [taskItems, setTaskItems] = useState([]);
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task !== "") {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask("");
    }
  };

  const DeleteTask = (item) => {
    const tempItemsArray = taskItems.filter((x) => x !== item);
    setTaskItems(tempItemsArray);
  };
  return (
    <View style={styles.container}>
      {/* Today's Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>

        <View style={styles.items}>
          {/* All Tasks */}

          {taskItems.length !== 0 ? (
            taskItems.map((item, i) => (
              <TouchableOpacity onPress={() => DeleteTask(item)} key={i}>
                {/* Single Task */}
                <SingleTask text={item} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noTasks}>No Tasks</Text>
          )}
        </View>
      </View>
      {/* Write a Task */}
      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a Task"
          placeholderTextColor="#898989"
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  noTasks: {
    textAlign: "center",
    color: "#898989",
    fontSize: 18,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    textAlign: "center",
    width: 250,
    color: "#2a2a2a",
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  addText: {
    color: "#898989",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "200",
    fontFamily: "Arial",
    textAlign: "center",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
});
