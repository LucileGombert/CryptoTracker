import React, {useContext, useRef, useState, useEffect} from 'react';
import { ThemeContext } from '../context/ThemeContext';

import Chartjs from "chart.js";

import '../style/HistoryChart.css';

const HistoryChart = ({data, currency}) => {
  const {theme} = useContext(ThemeContext);

  const chartRef = useRef();
  const {day, week, month, year, detail} = data;

  const [timeFormat, setTimeFormat] = useState("1 jour");
  
  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "1 jour":
        return day;
      case "1 semaine":
        return week;
      case "1 mois":
        return month;
      case "1 an":
      return year;
      default:
        return day;
    }
    
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `Evolution du prix sur ${timeFormat}`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(255, 255, 255, 0)",
              borderColor: "rgba(72, 1, 255, 1",
              pointRadius: 0,
            },
          ],
        },
        options: {
          lineHeightAnnotation: {
            always: true,
            hover: true,
            lineWeight: 0.5,
            shadow: true
          },
          animation: {
            duration: 2000,
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                type: "time",
              },
            ],
            
          },
        },
      });
      return () => {
        chartInstance.destroy()
      }
    
    }
  });

  return (
    <div className={theme ? 'chartBorder  dark' : 'chartBorder light'}>
      <div className="chart">
        <div>
          <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
        </div>
  
        <div className="chartButtons">
          <button onClick={() => setTimeFormat("1 jour")} className={theme ? 'chartButton  dark' : 'chartButton light'}>1 jour</button>
          <button onClick={() => setTimeFormat("1 semaine")} className={theme ? 'chartButton  dark' : 'chartButton light'}>1 semaine</button>
          <button onClick={() => setTimeFormat("1 mois")} className={theme ? 'chartButton  dark' : 'chartButton light'}>1 mois</button>
          <button onClick={() => setTimeFormat("1 an")} className={theme ? 'chartButton  dark' : 'chartButton light'}>1 an</button>
        </div>
      </div>
    </div>
  )
};

export default HistoryChart;