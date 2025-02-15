const incrementBoth = data => {
  data.inner++;
  data.outer++;
};

const colourData = () => {
  return {
    colours: [
      { name: 'blue', primary: true },
      { name: 'green', primary: false },
      { name: 'orange', primary: false },
      { name: 'purple', primary: false },
      { name: 'red', primary: true },
      { name: 'yellow', primary: true },
    ],
  };
};

const getScores = () => ({
  team1: { name: 'Chiefs', score: 25 },
  team2: { name: 'Raiders', score: 22 },
  colour(like) {
    return like ? 'red' : 'white';
  },
  heart(like) {
    return like ? '❤️' : '🤍';
  },
  report() {
    const s1 = Number(this.team1.score);
    const s2 = Number(this.team2.score);
    return s1 > s2
      ? `${this.team1.name} are winning by ${s1 - s2} points`
      : s2 > s1
        ? `${this.team2.name} are winning by ${s2 - s1} points`
        : 'The game is tied';
  },
});

const addTodo = (data, text) => {
  ++data.lastId;
  data.todos.push({ id: data.lastId, text: text.trim(), done: false });
};

const archiveCompleted = data => {
  data.todos = data.todos.filter(todo => !todo.done);
};

const deleteTodo = (data, todoId) => {
  data.todos = data.todos.filter(todo => todo.id !== todoId);
};

const filterTodos = (data, filter) => {
  const { todos } = data;
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.done);
    case 'uncompleted':
      return todos.filter(todo => !todo.done);
    default:
      return todos;
  }
};

const updateStatus = data => {
  const { todos } = data;
  const uncompletedCount = todos.filter(todo => !todo.done).length;
  data.status = `${uncompletedCount} of ${todos.length} remaining`;
};
