import React, {Component, useEffect, useState} from 'react'
import Select from 'react-select'
import getValues from '../commons/rpc/rpc-client';
import App from './App';
import CanvasJSReact from "./canvasjs.react";
import Button from "@mui/material/Button";
const CanvasJS = CanvasJSReact.CanvasJS;

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function historyConsumptionContainer () {

    const [state,setState] = useState({
        days:7,
        data:[]
    })


    useEffect(()=>{
         fetchData(state.days);
    },[])

    const fetchData =  ()=>{


        let array = []
        getValues(sessionStorage.getItem("id"),state.days)
            .then(result=>{
                // setState({
                //     ...state,
                //     data: []
                // })

                //console.log("DATA: ",array);
                let date = new Date();
                date.setHours(0);
                date.setMinutes(0);
                date.setMilliseconds(0);
                date.setSeconds(0);
                date.setDate(date.getDate()-state.days+1);

                for(let j=1;j<=state.days;j++){
                    //console.log("NEW DATA: ",array)
                    let dataHours = [
                        { label: "0", y: 0, x:0 },
                        { label: "1", y: 0, x:1 },
                        { label: "2", y: 0, x:2 },
                        { label: "3", y: 0, x:3 },
                        { label: "4", y: 0, x:4 },
                        { label: "5", y: 0, x:5 },
                        { label: "6", y: 0, x:6 },
                        { label: "7", y: 0, x:7 },
                        { label: "8", y: 0, x:8 },
                        { label: "9", y: 0, x:9 },
                        { label: "10", y: 0, x:10 },
                        { label: "11", y: 0, x:11 },
                        { label: "12", y: 0, x:12 },
                        { label: "13", y: 0, x:13 },
                        { label: "14", y: 0, x:14 },
                        { label: "15", y: 0, x:15 },
                        { label: "16", y: 0, x:16 },
                        { label: "17", y: 0, x:17 },
                        { label: "18", y: 0, x:18 },
                        { label: "19", y: 0, x:19 },
                        { label: "20", y: 0, x:20 },
                        { label: "21", y: 0, x:21 },
                        { label: "22", y: 0, x:22 },
                        { label: "23", y: 0, x:23}
                    ]
                    for(let i=0;i<result.length;i++){
                        //console.log(result[i]);
                        console.log("NOW DATE: ",date);
                        console.log("Result Date " +i+": "+new Date(result[i].timestamp))
                        if(date.getTime()<result[i].timestamp && result[i].timestamp< date.getTime()+86400000)
                        {
                            console.log("Result: ",result[i]);
                            let resultDate = new Date(result[i].timestamp)
                            console.log("DAY"+j+": "+result[i].value);
                            console.log("TIME: ",resultDate);
                            dataHours[resultDate.getHours()] = {
                                label: dataHours[resultDate.getHours()].label,
                                y: dataHours[resultDate.getHours()].y+result[i].value,
                                x: dataHours[resultDate.getHours()].x
                            }
                            console.log("Data Hours: ",dataHours)
                            //7-date.getDay()-elementDate.getDay()
                        }
                        //let elementDate = new Date(result[i].timestamp)
                    }

                    let dataElement = {
                        type: "stackedColumn",
                        name: "Day"+j,
                        showInLegend: true,
                        yValueFormatString: "#,###",
                        dataPoints: dataHours
                    }
                    let auxElements = array;
                    auxElements.push(dataElement);
                    // setState({
                    //     ...state,
                    //     data: auxElements
                    // });
                    array=auxElements;
                    //console.log("aux elements: ",array);
                    date.setDate(date.getDate()+1);

                    setState({
                            ...state,
                            data: array
                        });
                }
            },)
    }

    const handleChangeDays = (e) =>{
        setState({
            ...state,
            days: parseInt(e.target.value , 10 )
        });
    }

    const handleChangeChart = ()=>{
        setState({
            ...state,
            data: []
        })

        fetchData();

    };

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        title: {
            text: "Historical consumption",
            fontFamily: "verdana"
        },
        axisX: {
            interval: 1,
        },
        axisY: {
            title: "",
            includeZero: true,
            prefix: "",
            suffix: ""
        },
        toolTip: {
            shared: true,
            reversed: true
        },
        legend: {
            verticalAlign: "center",
            horizontalAlign: "right",
            reversed: true,
            cursor: "pointer",
            //itemclick: toggleDataSeries
        },
        data: state.data
    }

    return(
        <div>
            <input  value={state.days} onChange={handleChangeDays}/>
            <button  onClick={handleChangeChart}>Select</button>
            <CanvasJSChart options = {options}
                           // onRef={ref => this.chart = ref}
            />

            <Button className="backButton" href ="/#/client" variant="outlined"  >
                Back
            </Button>
        </div>
    )
}

export default historyConsumptionContainer;