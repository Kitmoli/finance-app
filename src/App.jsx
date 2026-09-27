import { useState, useEffect } from "react";
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
function App() {
    const [operations, setOperations] = useState(function () {
        const saved = localStorage.getItem("operations");
        return saved ? JSON.parse(saved) : [];
    });
    
    const [type, setType] = useState("доход");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(function () {
        localStorage.setItem("operations", JSON.stringify(operations));
    }, [operations]);

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

    let income = 0;
    let expense = 0;
    for (let i = 0; i < operations.length; i++) {
        if (operations[i].type === "доход") income += operations[i].amount;
        else expense += operations[i].amount;
    }
    const balance = income - expense;

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
            <h1>Учёт личных финансов</h1>

            <div style={{ marginBottom: "20px" }}>
                <p>Доход: {income} руб.</p>
                <p>Расход: {expense} руб.</p>
                <p><strong>Баланс: {balance} руб.</strong></p>
            </div>

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