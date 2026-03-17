import { Provider } from "react-redux";
import { store } from "./redux/store";
import HabitForm from "./components/Form";
import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import { HabitList } from "./components/HabitList";

function App() {
	return (
		<Provider store={store}>
			<Container maxWidth="md" sx={{ mt: 4 }}>
				<Typography variant="h2" gutterBottom>
					Controle de Hábitos Diarios
				</Typography>
				<HabitForm />
        <HabitList />
			</Container>
		</Provider>
	);
}

export default App;
