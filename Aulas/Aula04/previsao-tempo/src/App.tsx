import SearchCity from "./components/SearchCity";
import ForecastList from "./components/ForecastList";

function App() {
	return (
		<div className="max-w-lg mx-auto">
			<h1
				className="text-2xl font
      -bold text-center my-4"
			>
				Previsão do Tempo(INPE)
			</h1>
			<SearchCity />
			<ForecastList />
		</div>
	);
}

export default App;
