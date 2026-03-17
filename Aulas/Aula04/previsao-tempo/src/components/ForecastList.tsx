import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function ForecastList(){
    const { forecasts, status, error } = useSelector(
        (state: RootState) => state.weather
    )

    if(status === "loading") return <p>Carregando...</p>
    if(status === "failed") return <p>Erro: {error}</p>
    if(forecasts.lenght === 0) return <p>Nenhuma previsão encontrada</p>

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Previsão para 4 dias:</h2>
            <ul>
                {forecasts.map((f: any, i: any) => (
                    <li key={i} className="border rounded p-2 mb-2 shadow bg-gray-100">
                        <p><strong>Data:</strong>{f.dia}</p>
                        <p><strong>Clima:</strong>{f.tempo}</p>
                        <p><strong>Máx:</strong>{f.maxima}ºC | <strong>Min: </strong>{f.minima}ºC</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}