<template>
  <div id="app">
    <Header title="ToDo List" />
    <Input @onEnter="addToDo" label="New task" />
    <ToDos :todos.sync="todos" />
    <Softkey :softkeys.sync="softkeys" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Input from "./components/Input";
import ToDos from "./components/Todos";
import Softkey from "./components/Softkey";
import Navigation from "./Navigation";

export default {
  name: "app",
  components: {
    Header,
    Input,
    ToDos,
    Softkey
  },
  data: () => ({
    todos: [],
    softkeys: {
      left: "",
      center: "Insert",
      right: ""
    }
  }),
  mounted() {
    Navigation.init();
    document.addEventListener('keydown', this.onKeyDown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeyDown);
  },
  methods: {
    addToDo(name) {
      this.todos.push({ name, completed: false });
    },
    onKeyDown(event) {
      switch (event.key) {
        case "ArrowDown":
          Navigation.Down();
          this.updateSoftkey();
          break;
        case "ArrowUp":
          Navigation.Up();
          this.updateSoftkey();
          break;
        case "Enter":
          return this.toggleToDo();
        case "SoftRight":
          return this.deleteToDo();
        default:
          break;
      }
    },
    updateSoftkey() {
      const inputSoftKey = { left: "", center: "Insert", right: "" };
      const toDoSoftKey = { left: "", center: "Toggle", right: "Delete" };
      const [isATask] = this.isATask();

      if (isATask && this.softkeys !== toDoSoftKey) {
        this.softkeys = toDoSoftKey;
      } else if (!isATask && this.softkeys !== inputSoftKey) {
        this.softkeys = inputSoftKey;
      }
    },
    isATask() {
      const [currentElement, currentIndex] = Navigation.getCurrentItem();
      const isATask = currentElement.nodeName === "SPAN";
      return [isATask, currentIndex];
    },
    toggleToDo() {
      const [isATask, currentIndex] = this.isATask();
      if (!isATask) return;
      const toDoSelected = this.todos[currentIndex - 1];
      this.todos[currentIndex - 1].completed = !toDoSelected.completed;
    },
    deleteToDo() {
      const [isATask, currentIndex] = this.isATask();
      if (!isATask) return;
      this.todos.splice(currentIndex - 1, 1);
      Navigation.Up();
      this.updateSoftkey();
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#root {
  font-family: "Open Sans", sans-serif;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #E1E2E1 !important;
}
</style>
