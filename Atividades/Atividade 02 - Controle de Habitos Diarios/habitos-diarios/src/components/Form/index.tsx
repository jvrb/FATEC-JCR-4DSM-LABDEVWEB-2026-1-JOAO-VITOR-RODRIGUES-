import { FormControl, InputLabel, Input, Select, MenuItem, Container, Button } from "@mui/material";
import { useState } from "react";
import { addHabit } from "../../redux/habits/slice"
import { useAppDispatch } from "../../redux/hooks";

export default function HabitForm() {
	const [nameHabit, setNameHabit] = useState<string>("");
	const [categoryHabit, setCategoryeHabit] = useState<string>("");
    const dispatch = useAppDispatch()

    const handleClickForm = () => {
        dispatch(addHabit({
            name: nameHabit,
            category: categoryHabit,
	    }))
        setNameHabit("")
        setCategoryeHabit("")
    }   

	return (
		<form>
			<Container sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
				<FormControl focused sx={{ flex: 1 }}>
					<InputLabel htmlFor="habit-name">Nome do hábito</InputLabel>
					<Input id="habit-name" placeholder="Digite o hábito que deseja adicionar" value={nameHabit} onChange={(e) => setNameHabit(e.target.value)} />
				</FormControl>
				<FormControl sx={{ minWidth: 150 }}>
					<InputLabel id="category-habit">Categoria</InputLabel>
					<Select labelId="category-habit" value={categoryHabit} onChange={(e) => setCategoryeHabit(e.target.value)}>
						<MenuItem value={"saude"}>Saúde</MenuItem>
						<MenuItem value={"esporte"}>Esporte</MenuItem>
						<MenuItem value={"lazer"}>Lazer</MenuItem>
					</Select>
				</FormControl>
				<Button variant="contained" onClick={handleClickForm}>Adicionar</Button>
			</Container>
		</form>
	);
}
