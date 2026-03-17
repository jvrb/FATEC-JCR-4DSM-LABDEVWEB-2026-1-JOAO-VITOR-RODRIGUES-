import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { fetchWeather } from "../store/weatherSlice";

export default function SearchCity() {
	const [city, setCity] = useState("");
	const dispatch = useDispatch<AppDispatch>();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (city.trim() !== "") {
			dispatch(fetchWeather(city));
		}
	};

	return (
		<form onSubmit={handleSubmit} className="p-4">
			<input type="text" placeholder="Digite o nome da cidade" value={city} onChange={(e) => setCity(e.target.value)} className="border p-2 rounded" />
			<button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
				Buscar
			</button>
		</form>
	);
}
