import { Button, Container, Switch } from "@mui/material";
import { useState } from "react";
import type { Habit } from "../../redux/habits/habit-types";
import { useAppDispatch } from "../../redux/hooks";
import { removeHabit , editHabit} from "../../redux/habits/slice";

export default function HabitItem({ id, name, category, completed }: Habit) {
	const [idHabit, setId] = useState(id);
	const [checked, setChecked] = useState(completed);
	const [editing, setEditing] = useState(false);
	const [nameHabit, setNameHabit] = useState<string>(name);
	const [categoryHabit, setCategoryeHabit] = useState<string>(category);
	const dispatch = useAppDispatch();

	const handleChecked = () => {
		setChecked(!checked);
	};

	const handleEditing = () => {
		setEditing(!editing);
		dispatch(editHabit({
			id: idHabit,
			name: nameHabit,
			category: categoryHabit
		}))
	};

	const handleCategoryHabit = (e: any) => {
		e.target.value === "saude" ? setCategoryeHabit("Saúde") : setCategoryeHabit(e.target.value);
	};

	const handleExcludeHabit = (id: string) => {
		dispatch(removeHabit({ id }));
	};

	console.log(editing);
	return (
		<>
			{!editing ? (
				<Container>
					<div style={{ display: "flex", gap: 5, alignItems: "center", textAlign: "left", width: "100%", border: "1px solid", padding: 10, borderRadius: 10 }}>
						<Switch value={checked} onChange={handleChecked} />
						<div style={{ flex: 1 }}>
							<span style={{ display: "none" }}>{idHabit}</span>
							<strong>{nameHabit}</strong>
							<p>
								<span>Categoria:</span> {categoryHabit}
							</p>
						</div>
						{!checked ? (
							<div style={{ display: checked ? "none" : "flex", gap: 10 }}>
								<Button variant="contained" onClick={handleEditing}>
									Editar
								</Button>
								<Button variant="contained" color="error" onClick={() => handleExcludeHabit(idHabit)}>
									Excluir
								</Button>
							</div>
						) : (
							<div>Concluido</div>
						)}
					</div>
				</Container>
			) : (
				<Container>
					<div style={{ display: "flex", gap: 5, alignItems: "center", textAlign: "left", width: "100%", border: "1px solid", padding: 10, borderRadius: 10 }}>
						<Switch value={checked} disabled onChange={handleChecked} />
						<div style={{ flex: 1 }}>
							<input value={nameHabit} onChange={(e) => setNameHabit(e.target.value)} />
							<p>
								<span>Categoria:</span>
								<select name="selectCategory" id="selectCategory" value={categoryHabit} onChange={(e) => handleCategoryHabit(e)}>
									<option value="saude" selected>
										Saúde
									</option>
									<option value="esporte">Esporte</option>
									<option value="lazer">Lazer</option>
								</select>
							</p>
						</div>
						<div style={{ display: "flex", gap: 10 }}>
							<Button variant="contained" color="success" onClick={handleEditing}>
								Salvar
							</Button>
							<Button variant="contained" color="error" onClick={() => handleExcludeHabit(idHabit)}>
								Excluir
							</Button>
						</div>
					</div>
				</Container>
			)}
		</>
	);
}
