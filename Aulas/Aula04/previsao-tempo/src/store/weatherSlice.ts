import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Forecast } from "../types";
import { XMLParser } from "fast-xml-parser";

// ------------------------------
// Função para remover acentos
// ------------------------------
function sanitizeCityName(city: string): string {
  return city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .trim();
}

// ------------------------------
interface WeatherState {
  forecasts: Forecast[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WeatherState = {
  forecasts: [],
  status: "idle",
  error: null,
};

// ------------------------------
// Thunk para buscar previsão
// ------------------------------
export const fetchWeather = createAsyncThunk<
  Forecast[],
  string,
  { rejectValue: string }
>("weather/fetchWeather", async (city, { rejectWithValue }) => {
  try {
    const parser = new XMLParser();

    const sanitizedCity = encodeURIComponent(
      sanitizeCityName(city)
    );

    // ------------------------------
    // 1️⃣ Buscar cidade
    // ------------------------------
    const cityResponse = await fetch(
      `/cptec/XML/listaCidades?city=${sanitizedCity}`
    );

    if (!cityResponse.ok) {
      throw new Error("Erro ao buscar cidade.");
    }

    const cityText = await cityResponse.text();
    const cityData: any = parser.parse(cityText);

    if (!cityData.cidades?.cidade) {
      return rejectWithValue("Cidade não encontrada.");
    }

    const cityCode = Array.isArray(cityData.cidades.cidade)
      ? cityData.cidades.cidade[0].id
      : cityData.cidades.cidade.id;

    // ------------------------------
    // 2️⃣ Buscar previsão
    // ------------------------------
    const forecastResponse = await fetch(
      `/cptec/XML/cidade/7dias/${cityCode}/previsao.xml`
    );

    if (!forecastResponse.ok) {
      throw new Error("Erro ao buscar previsão.");
    }

    const forecastText = await forecastResponse.text();
    const forecastData: any = parser.parse(forecastText);

    if (!forecastData?.cidade?.previsao) {
      return rejectWithValue("Previsão indisponível.");
    }

    const forecasts: Forecast[] = forecastData.cidade.previsao
      .slice(0, 4)
      .map((item: any) => ({
        dia: item.dia,
        tempo: item.tempo,
        maxima: Number(item.maxima),
        minima: Number(item.minima),
      }));

    return forecasts;

  } catch (error) {
    return rejectWithValue("Erro ao buscar dados do clima.");
  }
});

// ------------------------------
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forecasts = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Erro ao buscar previsão.";
      });
  },
});

export default weatherSlice.reducer;