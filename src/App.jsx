import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import { useState } from "react";

function App() {
    const [operations, setOperations] = useState([]);
    const [type, setType] = useState("доход");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");

    function addOperation(e) {
        e.preventDefault();
        if (category.trim() === "" || amount === "") return;
        setOperations([...operations, {
            id: Date.now(),
            type: type,
            category: category,
            amount: Number(amount)
        }]);
        setCategory("");
        setAmount("");
    }

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
            <h1>Учёт личных финансов</h1>

            <form onSubmit={addOperation} style={{ marginBottom: "20px" }}>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="доход">Доход</option>
                    <option value="расход">Расход</option>
                </select>{" "}
                <input placeholder="Категория" value={category}
                    onChange={(e) => setCategory(e.target.value)} />{" "}
                <input placeholder="Сумма" type="number" value={amount}
                    onChange={(e) => setAmount(e.target.value)} />{" "}
                <button type="submit">Добавить</button>
            </form>

            <h2>История операций</h2>
            {operations.length === 0 && <p>Операций пока нет.</p>}
            <ul>
                {operations.map((op) => (
                    <li key={op.id}>
                        {op.type} — {op.category} — {op.amount} руб.
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;