import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle === '') {
      return
    }

    let newId = Math.random()

    /* Checo se o novo ID já não existe no array de Tasks, 
    caso exista crio outro e outro até chegarmos a um único*/
    while (!checkNewIdViability(newId)) {
      newId = Math.random()
    }

    setTasks(prevState => [...prevState, {
      id: newId,
      title: newTaskTitle,
      isComplete: false
    }])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let newTasks = [...tasks]
    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id === id) {
        newTasks[i].isComplete = !newTasks[i].isComplete
        break;
      }
    }
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let newTasks = [...tasks]
    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id === id) {
        newTasks.splice(i, 1)
        break;
      }
    }
    setTasks(newTasks)
  }

  function checkNewIdViability(id: number) {
    let isValid = true
    for (let i = 0; i < tasks.length; i) {
      if (tasks[i].id === id) {
        isValid = false
        break
      }
    }
    return isValid
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}