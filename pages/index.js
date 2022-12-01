import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { getPrediction, getRandomSample } from '../models/predict'
import Select from 'react-select'
import { zoneData, dayNumber, setTripMilesSeconds } from '../zones/zone'
import { generateAllX } from '../zones/allX';
import Chart from 'chart.js/auto';

export default function Home() {
  const [x, setX] = useState({
    "trip_miles": 0.0,
    "trip_time": 0,
    "request_hour": 0,
    "pickup_hour": 0,
    "dropoff_hour": 0,
    "PULocation": 0,
    "DOLocation": 0,
    "taxi_company": 0,
    "trip_day": 0,
  });
  const [y, setY] = useState(0.0);
  const [lgbm, setLgbm] = useState(0.0);
  const [dl, setDl] = useState(0.0);

  let options = [];
  for(let i = 0; i < zoneData.length; i++) {
    options.push({
      value: i + 1,
      label: zoneData[i]
    })
  }
  const taxiOptions = [
    {value: 0, label: 'Uber'},
    {value: 1, label: 'Lyft'}
  ];

  async function handleRandomSample() {
    const sample = await getRandomSample();
    setX(sample.X);
    setY(sample.y_actual);
  }

  useEffect(() => {
    const timesChart = new Chart(
      document.getElementById('visualizations-1'),
      {
        type: 'line',
        options: {
          plugins: {
            title: {
              text: 'Taxi Prices at different hours of the day (for the chosen trip)',
              display: true
            }
          }
        },
        data: {
          labels: [...Array(24).keys()],
          datasets: [
            {
              label: 'Uber price (LGBM model)',
              data: []
            },
            {
              label: 'Uber price(Deep Learning model)',
              data: []
            },
            {
              label: 'Lyft price(LGBM model)',
              data: []
            },
            {
              label: 'Lyft price(Deep Learning model)',
              data: []
            }
          ]
        }
      }
    );
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysChart = new Chart(
      document.getElementById('visualizations-2'),
      {
        type: 'line',
        options: {
          plugins: {
            title: {
              text: 'Taxi Prices at different days of the week (for the chosen trip)',
              display: true
            }
          }
        },
        data: {
          labels: dayNames,
          datasets: [
            {
              label: 'Uber price (LGBM model)',
              data: []
            },
            {
              label: 'Uber price(Deep Learning model)',
              data: []
            },
            {
              label: 'Lyft price(LGBM model)',
              data: []
            },
            {
              label: 'Lyft price(Deep Learning model)',
              data: []
            }
          ]
        }
      }
    );
    return () => {
      timesChart.destroy();
      daysChart.destroy();
    }
  }, []);

  useEffect(() => {
    if (!y)
      setTripMilesSeconds(x, setX)
  }, [x.PULocation, x.DOLocation]);

  useEffect(() => {
    (async () => {
      const results = await getPrediction(x, y);

      setLgbm(results.lgbm);
      setDl(results.dl);

      await doPredictionsAndsetData();
    })();
  }, [x])

  async function doPredictionsAndsetData() {
    const allX = generateAllX(x); // order of generated x/ Uber by hour: 24, Lyft by hour: 24, Uber by day: 7, Lyft by day: 7
    // total allX = 24 + 24 + 7 + 7 = 62
    if (allX.length == 62) {
      const allPredictions = await getPrediction(allX, 0, 62);
      // total allPredictions = 24*2 + 24*2 + 7*2 + 7*2 = 124 (each one predicts 2 models)
      const timesChart = Chart.getChart('visualizations-1');
      const daysChart = Chart.getChart('visualizations-2');

      let t1 = [];
      let t2 = [];
      let t3 = [];
      let t4 = [];
      for(let i = 0; i < 24; i++) {
        // t1, t2
        t1.push(allPredictions['lgbm'][i]);
        t2.push(allPredictions['dl'][i]);
      }
      for(let i = 24; i < 48; i++) {
        // t3, t4
        t3.push(allPredictions['lgbm'][i]);
        t4.push(allPredictions['dl'][i]);
      }

      let d1 = [];
      let d2 = [];
      let d3 = [];
      let d4 = [];

      for(let i = 48; i < 55; i++) {
        // d1, d2
        d1.push(allPredictions['lgbm'][i]);
        d2.push(allPredictions['dl'][i]);
      }
      for(let i = 55; i < 62; i++) {
        // d3, d4
        d3.push(allPredictions['lgbm'][i]);
        d4.push(allPredictions['dl'][i]);
      }
      
      timesChart.data.datasets[0].data = t1;
      timesChart.data.datasets[1].data = t2;
      timesChart.data.datasets[2].data = t3;
      timesChart.data.datasets[3].data = t4;

      daysChart.data.datasets[0].data = d1;
      daysChart.data.datasets[1].data = d2;
      daysChart.data.datasets[2].data = d3;
      daysChart.data.datasets[3].data = d4;

      timesChart.update();
      daysChart.update();
    }
  }

  function pickupOptionSelected(pickupObj) {
    const hr = new Date().getHours();
    const day = new Date().getDay();
    const pickupId = pickupObj.value;
    setX({
      ...x,
      PULocation: pickupId,
      request_hour: hr,
      pickup_hour: hr,
      dropoff_hour: hr,
      trip_day: dayNumber[day]
    });
    setY(0.0);
  }

  function dropoffOptionSelected(dropoffObj) {
    const hr = new Date().getHours();
    const day = new Date().getDay();
    const dropoffId = dropoffObj.value;
    setX({
      ...x,
      DOLocation: dropoffId,
      request_hour: hr,
      pickup_hour: hr,
      dropoff_hour: hr,
      trip_day: dayNumber[day]
    });
    setY(0.0);
  }
  
  function taxiOptionSelected(taxiId) {
    const hr = new Date().getHours();
    const day = new Date().getDay();
    setX({
      ...x,
      taxi_company: taxiId.value,
      request_hour: hr,
      pickup_hour: hr,
      dropoff_hour: hr,
      trip_day: dayNumber[day]
    });
    setY(0.0);
  }

  return (
    <div>
      <Head>
        <title>New York City Taxi Trip Price Prediction</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className='text-center text-3xl font-black my-3'>
          New York City Taxi Trip Price Prediction
        </h1>

        <div className='p-3'>
          <div className='text-center text-xl my-3'>
            <div className='inline-block m-3 text-sky-600'>
              Choose Pickup and Dropoff locations
            </div>
            OR
            <button type="button" onClick={handleRandomSample} className='text-white bg-green-700 p-2 rounded-lg m-3'>
              Draw random sample &rarr;
            </button>
            <button type="button" onClick={() => {
              document.getElementById('visualizations').scrollIntoView()
            }} className='text-white bg-blue-700 p-2 rounded-lg m-3'>
              Show visualizations &rarr;
            </button>
          </div>
        </div>

        <div className='grid grid-cols-[repeat(auto-fit,_minmax(600px,_1fr))]'>
          <div className='col-span-1'>
            <div className='text-lg m-3 w-full'>
              Select Pickup location
              <Select className='mx-6 my-2 px-4' options={options} value={x.PULocation > 0 ? options[x.PULocation - 1] : null} onChange={pickupOptionSelected} instanceId="pickup"/>
              Select Dropoff location
              <Select className='mx-6 my-2 px-4' options={options} value={x.DOLocation > 0 ? options[x.DOLocation - 1] : null} onChange={dropoffOptionSelected} instanceId="dropoff"/>
              Select Taxi Company
              <Select className='mx-6 my-2 px-4' value={taxiOptions[x.taxi_company]} options={taxiOptions} onChange={taxiOptionSelected} instanceId="taxi"/>
            </div>

            <div className='grid grid-cols-2 font-bold text-2xl text-center'>
              <table className='table-fixed mx-auto my-5'>
                <tbody>
                  {
                    Object.entries(x).map((elem) => {
                      return <tr key={elem[0]}>
                        <td>{elem[0]}</td>
                        <td>{elem[1]}</td>
                      </tr>
                    })
                  }
                  <tr key="y_actual">
                    <td>Actual Price</td>
                    <td>${y}</td>
                  </tr>
                </tbody>
              </table>

              <div className='grid grid-rows-2 text-emerald-700'>
                <div>
                  <p>LightGBM model prediction</p>
                  <p>${lgbm}</p>
                </div>

                <div>
                  <p>Deep Learning model prediction</p>
                  <p>${dl}</p>
                </div>
              </div>
            </div>
          </div>

          <div id='visualizations' className='col-span-1 px-16'>
            <canvas id="visualizations-1"/>
            <canvas id="visualizations-2"/>
          </div>
        </div>
      </main>
    </div>
  )
}
