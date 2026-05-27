import { useState } from 'react'

export default function App() {
  const [habits, setHabits] = useState([
    { name: 'Tomar agua', done: false },
    { name: 'Hacer ejercicio', done: true }
  ])

  const [newHabit, setNewHabit] = useState('')

  const addHabit = () => {
    if (!newHabit.trim()) return
    setHabits([...habits, { name: newHabit, done: false }])
    setNewHabit('')
  }

  const toggleHabit = (index) => {
    const updated = [...habits]
    updated[index].done = !updated[index].done
    setHabits(updated)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>GEJUSA</h1>
        <p>Micro Habit Tracker</p>
      </aside>

      <main className="content">
        <div className="hero">
          <h2>Construye hábitos diarios</h2>
          <p>Organiza tus metas y mejora cada día.</p>
        </div>

        <div className="add-box">
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Nuevo hábito"
          />
          <button onClick={addHabit}>Añadir</button>
        </div>

        <div className="habit-list">
          {habits.map((habit, index) => (
            <div className="habit-card" key={index}>
              <div>
                <h3>{habit.name}</h3>
                <p>{habit.done ? 'Completado' : 'Pendiente'}</p>
              </div>

              <button onClick={() => toggleHabit(index)}>
                {habit.done ? 'Desmarcar' : 'Completar'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
