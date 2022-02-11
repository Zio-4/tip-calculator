import React, {useState, useEffect} from 'react'
 
function Calculator() {
   const [billValue, setBillValue] = useState('')
   const [tipButtonState, setTipButtonState] = useState('')
   const [tipValue, setTipValue] = useState('')
   const [customTipValue, setCustomTipValue] = useState('')
   const [numberOfPeople, setNumberOfPeople] = useState('')
   const [tipPerPerson, setTipPerPerson] = useState("0.00")
   const [total, setTotal] = useState("0.00")
  
   useEffect(() => {
       if (!!billValue && (tipValue !== 0 || !!customTipValue) && !!numberOfPeople) {
           const billInNumber = parseFloat(billValue)
           const tipValueInNumber = parseFloat(tipValue)
           const customTipInNumber = parseFloat(customTipValue)
           const peopleInNumber = parseInt(numberOfPeople)
 
           let tip
           if (!!customTipValue) {
               tip = billInNumber * (customTipInNumber / 100)
           } else {
               tip = billInNumber * tipValueInNumber
           }
           // toFixed caps the number to two decimal places and converts it to a string. + converts it back to a number
           const tipDivided = +((tip / peopleInNumber).toFixed(2))
           const totalFoEachPerson = +(((billInNumber + tip) / peopleInNumber).toFixed(2))
 
           setTipPerPerson(tipDivided)
           setTotal(totalFoEachPerson)
       }
   }, [billValue, tipValue, customTipValue, numberOfPeople])
 
 
   const changeBill = (e) => setBillValue(e.target.value)
 
   const changeTip = (e) => {
       // !!tipButtonState will return true for all non empty strings (even "0" and " ")
       if (tipButtonState === '' || !!tipButtonState) {
           setTipButtonState(e.target.value)
           setTipValue(e.target.value)
       }
   }
 
   const changeCustomTip = (e) => {
       setCustomTipValue(e.target.value)
       if (tipButtonState !== '') {
           setTipButtonState('')
       }
 
   }
 
   console.log("custom tip value:", customTipValue)
   console.log("is NaN:", isNaN(customTipValue))
 
   const changeNumberOfPeople = (e) => setNumberOfPeople(e.target.value)
 
   const resetTotal = () => {
       setBillValue('')
       setTipButtonState('')
       setTipValue('')
       setCustomTipValue('')
       setTotal("0.00")
       setNumberOfPeople('')
       setTipPerPerson("0.00")
 
   }
 
   return (
       <section className='calculator'>
           <div className='container'>
               <div className='big-col-1'>
                   <label>Bill</label>
                   <input onChange={changeBill} value={billValue} className='bill-input' type='number' placeholder='0'></input>
 
                   <p>Select Tip %</p>
 
                   <div className='tip-percentage-section'>
                       <button onClick={changeTip} value={.05} className={`tip-percentage ${tipButtonState === "0.05" ? 'selected' : ''}`}>5%</button>
                       <button onClick={changeTip} value={.10} className={`tip-percentage ${tipButtonState === "0.1" ? 'selected' : ''}`}>10%</button>
                       <button onClick={changeTip} value={.15} className={`tip-percentage ${tipButtonState === "0.15" ? 'selected' : ''}`}>15%</button>
                       <button onClick={changeTip} value={.20} className={`tip-percentage ${tipButtonState === "0.2" ? 'selected' : ''}`}>20%</button>
                       <button onClick={changeTip} value={.25} className={`tip-percentage ${tipButtonState === "0.25" ? 'selected' : ''}`}>25%</button>
                       <input onChange={changeCustomTip} value={customTipValue} className='custom-amount' type='number' placeholder='Custom'></input>
                   </div>
 
                   <label>Number of People</label>
                   <input onChange={changeNumberOfPeople} value={numberOfPeople} className='number-of-people-input' type='number' placeholder='0'></input>
               </div>
 
               <div className='big-col-2'>
                   <div className='result-section'>
                           <div className='row'>
                               <div className='col'>
                                   <p>Tip Amount </p>
                                   <p className='person'>/ person </p>
                                   <p>Total </p>
                                   <p className='person'>/ person </p>
                               </div>
                               <div className='col'>
                                   <p className='results'><span>$</span>{tipPerPerson}</p>
                                   <p className='results'><span>$</span>{total}</p>
                               </div>
                           </div>
                       <button onClick={resetTotal} className='reset-btn'>RESET</button>
                   </div>
               </div>
           </div>
       </section>
   )
}
 
export default Calculator
