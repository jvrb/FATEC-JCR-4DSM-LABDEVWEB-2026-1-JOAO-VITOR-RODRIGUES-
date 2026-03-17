import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Container, List, ListItem, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import HabitItem from "../HabitItem";
import { useEffect, useState } from "react";
import type { Habit } from "../../redux/habits/habit-types";

export function HabitList() {
	const habits = useAppSelector((state) => state.habits);
	const [categoryHabit, setCategoryHabit] = useState("all");
	const [habitAfterSearch, setHabitAfterSearch] = useState<Habit[]>([]);

	useEffect(() => {
		if (categoryHabit === "all") {
			setHabitAfterSearch(habits);
		} else {
			setHabitAfterSearch(habits.filter((h) => h.category === categoryHabit));
		}
	}, [habits, categoryHabit]);

	return (
		<Container>
			<FormControl sx={{ minWidth: 150 }}>
				<InputLabel id="category-habit">Categoria</InputLabel>
				<Select labelId="category-habit" value={categoryHabit} onChange={(e) => setCategoryHabit(e.target.value)}>
					<MenuItem value="all">Todos</MenuItem>
					<MenuItem value="saude">Saúde</MenuItem>
					<MenuItem value="esporte">Esporte</MenuItem>
					<MenuItem value="lazer">Lazer</MenuItem>
				</Select>
			</FormControl>
			<List>
				{habitAfterSearch.length === 0 ? (
					<div>Nenhum habito.</div>
				) : (
					habitAfterSearch.map((habit) => (
						<ListItem>
							<HabitItem id={habit.id} name={habit.name} category={habit.category} completed={habit.completed} />
						</ListItem>
					))
				)}
			</List>
		</Container>
	);
}
