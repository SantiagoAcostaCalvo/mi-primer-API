
  
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let tasks = [
  { id: 1, title: 'Hacer la compra', done: false },
  { id: 2, title: 'Estudiar para el examen', done: true },
];

app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: 'Task not found' });
    return;
  }

  res.json({ task });
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ error: 'The title is required' });
    return;
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false,
  };


  tasks.push(newTask);
  res.status(201).json({ task: newTask });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
  
    if (taskIndex === -1) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
  
    tasks[taskIndex].done = true;
    res.json({ task: tasks[taskIndex] });
  });
  