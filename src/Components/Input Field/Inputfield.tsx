import "./Inputfield.css"

interface InputProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const Inputfield: React.FC<InputProps> = ({todo, setTodo, handleAdd}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value)
    }


  return (
    <div className="input-field">
        <input value={todo} className="to-do-input" placeholder="To Do" onChange={handleChange} />
        <button className="add-btn" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Inputfield