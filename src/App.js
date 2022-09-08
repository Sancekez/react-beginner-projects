import React, {useState, useEffect, useRef} from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  let [currencyFrom, setCurrencyFrom] = useState('KZT')
  let [currencyTo, setCurrencyTo] = useState('RUB')
  let [valueFrom, setValueFrom] = useState(" ")
  let [valueTo, setValueTo] = useState(" ")
  const [data, setData] = useState()

  useEffect(()=>{
    fetch('http://www.floatrates.com/daily/usd.json')
      .then((res)=> res.json())
      .then((json)=> {setData(json)})
      .catch(err => {console.warn(err); alert('Не удалось получить данные!')})
  }, [])

  const onChengeFromValue = (value)=> {
    if(data) {
      const price = value / data[currencyFrom.toLowerCase()].rate
      const result = price * data[currencyTo.toLowerCase()].rate
      setValueFrom(value)
      setValueTo(result.toFixed(2))
    }
  }
  
  const onChengeToValue = (value)=> {
    if(data) {
      const result = (data[currencyFrom.toLowerCase()].rate / data[currencyTo.toLowerCase()].rate) * value 
      setValueFrom(result.toFixed(2))
      setValueTo(value)
    }
    setValueTo(value)
  }
  
  useEffect(()=>{
    onChengeToValue(valueTo)
  }, [currencyTo,valueTo])

  useEffect(()=>{
    onChengeFromValue(valueFrom)
  }, [currencyFrom, valueFrom])

  return (
    <div className="App">
      <Block value={valueFrom} onChangeValue={onChengeFromValue} currency={currencyFrom} onChangeCurrency={(cur) => setCurrencyFrom(cur)} />
      <Block value={valueTo} onChangeValue={onChengeToValue} currency={currencyTo} onChangeCurrency={(cur) => {setCurrencyTo(cur)}} />
    </div>
  );
}

export default App;