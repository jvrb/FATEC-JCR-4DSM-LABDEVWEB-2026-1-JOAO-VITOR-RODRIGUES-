import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useState} from 'react'
import {InputWrap} from './components/inputWrap'

export default function App() {

  const [peso, setPeso] = useState()
  const [altura, setAltura] = useState()
  const [message, setMessage] = useState()
  const [styleResult, setstyleResult] = useState()
  const [imc, setImc] = useState()

  function calcularImc(){
    const imc = Number(peso / (altura ** 2)).toFixed(2)
    setImc(imc)

    if(imc < 18.5){
      setstyleResult(style.orange)
      setMessage(`Abaixo do Peso`)
    }else if(imc >= 18.5 && imc <= 24.9){
      setstyleResult(style.green)
      setMessage(`Peso Normal (Eutrofia)`)
    }else if(imc >= 25 && imc <= 29.9){
      setstyleResult(style.yellow)
      setMessage(`Sobrepeso`)
    }else if(imc >= 30 && imc <= 34.9){
      setstyleResult(style.redLight)
      setMessage(`Obsidade Grau I`)
    }else if(imc >= 35 && imc <= 39.9){
      setstyleResult(style.red)
      setMessage(`Obsidade Grau II`)
    }else if(imc >= 40){
      setstyleResult(style.redBlack)
      setMessage(`Obsidade Grau III`)
    }
  }

  return (
    <View style={style.container}>
      <View style={style.inputContainer}>
        <InputWrap
          label="Peso - Kg"
          value={peso}
          placeholder="78.90"
          onchangetext={setPeso}
          keyboard="numeric"
        />
        <InputWrap
          label="Altura - M"
          value={altura}
          placeholder="1.77"
          onchangetext={setAltura}
          keyboard="numeric"
        />
        <TouchableOpacity style={style.btnCalcular}>
          <Text style={{color: '#fff', textAlign: 'center'}} onPress={calcularImc}>Calcular IMC</Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontWeight: 'bold'}}>
        { imc ? `IMC: ${imc}` : ""}
      </Text>
      <View style={[style.result, styleResult]}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{message}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#28B078',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  inputContainer:{
    width: '70%',
    backgroundColor: '#17995C',
    padding: 5,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#19784D',
    gap: 8
  },
  btnCalcular: {
    height: 30,
    borderRadius: 6,
    backgroundColor: '#27CF80',
    padding: 5
  },
  orange: {
    backgroundColor: '#FFAE26',
    borderWidth: 2,
    borderColor: '#C98920'
  },
  green: {
    backgroundColor: '#27CF80',
    borderWidth: 2,
    borderColor: '#198552'
  },
  yellow: {
    backgroundColor: '#CCB61F',
    borderWidth: 2,
    borderColor: '#807213'
  },
  redLight: {
    backgroundColor: '#F58D6C',
    borderWidth: 2,
    borderColor: '#A15D47'
  },
  red: {
    backgroundColor: '#F73131',
    borderWidth: 2,
    borderColor: '#A31F1F'
  },
  redBlack: {
    backgroundColor: '#941C1C',
    borderWidth: 2,
    borderColor: '#FC2D2D'
  },
  result: {
    width: '70%',
    height: 'auto',
    borderRadius: 6,
    padding: 3
  }
})
