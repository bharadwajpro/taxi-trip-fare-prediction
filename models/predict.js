const ort = require('onnxruntime-web');

const testSamples = [{
	"index": 0,
	"trip_miles": "2.47",
	"trip_time": 1056,
	"request_hour": 16,
	"pickup_hour": 16,
	"dropoff_hour": 16,
	"PULocation": 50,
	"DOLocation": 158,
	"taxi_company": 0,
	"trip_day": 2,
	"base_passenger_fare": 21.18
}, {
	"index": 1,
	"trip_miles": "3.64",
	"trip_time": 824,
	"request_hour": 22,
	"pickup_hour": 22,
	"dropoff_hour": 22,
	"PULocation": 137,
	"DOLocation": 263,
	"taxi_company": 0,
	"trip_day": 2,
	"base_passenger_fare": 22.92
}, {
	"index": 2,
	"trip_miles": "5.68",
	"trip_time": 1035,
	"request_hour": 23,
	"pickup_hour": 23,
	"dropoff_hour": 0,
	"PULocation": 80,
	"DOLocation": 164,
	"taxi_company": 0,
	"trip_day": 4,
	"base_passenger_fare": 24.92
}, {
	"index": 3,
	"trip_miles": "1.2",
	"trip_time": 385,
	"request_hour": 2,
	"pickup_hour": 2,
	"dropoff_hour": 2,
	"PULocation": 37,
	"DOLocation": 37,
	"taxi_company": 0,
	"trip_day": 4,
	"base_passenger_fare": 8.7
}, {
	"index": 4,
	"trip_miles": "23.11",
	"trip_time": 1982,
	"request_hour": 5,
	"pickup_hour": 5,
	"dropoff_hour": 6,
	"PULocation": 244,
	"DOLocation": 1,
	"taxi_company": 0,
	"trip_day": 1,
	"base_passenger_fare": 68.39
}, {
	"index": 5,
	"trip_miles": "1.0",
	"trip_time": 306,
	"request_hour": 22,
	"pickup_hour": 22,
	"dropoff_hour": 22,
	"PULocation": 211,
	"DOLocation": 148,
	"taxi_company": 0,
	"trip_day": 1,
	"base_passenger_fare": 17.83
}, {
	"index": 6,
	"trip_miles": "1.716",
	"trip_time": 603,
	"request_hour": 12,
	"pickup_hour": 12,
	"dropoff_hour": 12,
	"PULocation": 22,
	"DOLocation": 11,
	"taxi_company": 1,
	"trip_day": 2,
	"base_passenger_fare": 9.83
}, {
	"index": 7,
	"trip_miles": "10.56",
	"trip_time": 2675,
	"request_hour": 17,
	"pickup_hour": 17,
	"dropoff_hour": 17,
	"PULocation": 219,
	"DOLocation": 82,
	"taxi_company": 0,
	"trip_day": 0,
	"base_passenger_fare": 41.23
}, {
	"index": 8,
	"trip_miles": "11.293",
	"trip_time": 1350,
	"request_hour": 21,
	"pickup_hour": 21,
	"dropoff_hour": 21,
	"PULocation": 251,
	"DOLocation": 5,
	"taxi_company": 1,
	"trip_day": 4,
	"base_passenger_fare": 23.95
}, {
	"index": 9,
	"trip_miles": "2.59",
	"trip_time": 966,
	"request_hour": 22,
	"pickup_hour": 22,
	"dropoff_hour": 22,
	"PULocation": 170,
	"DOLocation": 142,
	"taxi_company": 0,
	"trip_day": 1,
	"base_passenger_fare": 17.68
}, {
	"index": 10,
	"trip_miles": "8.7",
	"trip_time": 3210,
	"request_hour": 18,
	"pickup_hour": 19,
	"dropoff_hour": 19,
	"PULocation": 160,
	"DOLocation": 48,
	"taxi_company": 0,
	"trip_day": 3,
	"base_passenger_fare": 30.41
}, {
	"index": 11,
	"trip_miles": "0.97",
	"trip_time": 311,
	"request_hour": 9,
	"pickup_hour": 9,
	"dropoff_hour": 9,
	"PULocation": 112,
	"DOLocation": 145,
	"taxi_company": 0,
	"trip_day": 4,
	"base_passenger_fare": 7.91
}, {
	"index": 12,
	"trip_miles": "3.117",
	"trip_time": 849,
	"request_hour": 0,
	"pickup_hour": 0,
	"dropoff_hour": 0,
	"PULocation": 68,
	"DOLocation": 239,
	"taxi_company": 1,
	"trip_day": 2,
	"base_passenger_fare": 14.49
}, {
	"index": 13,
	"trip_miles": "9.806",
	"trip_time": 1766,
	"request_hour": 11,
	"pickup_hour": 11,
	"dropoff_hour": 11,
	"PULocation": 186,
	"DOLocation": 138,
	"taxi_company": 1,
	"trip_day": 5,
	"base_passenger_fare": 57.16
}, {
	"index": 14,
	"trip_miles": "5.78",
	"trip_time": 911,
	"request_hour": 19,
	"pickup_hour": 19,
	"dropoff_hour": 19,
	"PULocation": 14,
	"DOLocation": 150,
	"taxi_company": 0,
	"trip_day": 4,
	"base_passenger_fare": 19.8
}, {
	"index": 15,
	"trip_miles": "5.11",
	"trip_time": 979,
	"request_hour": 5,
	"pickup_hour": 5,
	"dropoff_hour": 5,
	"PULocation": 42,
	"DOLocation": 126,
	"taxi_company": 0,
	"trip_day": 6,
	"base_passenger_fare": 19.57
}, {
	"index": 16,
	"trip_miles": "1.187",
	"trip_time": 1308,
	"request_hour": 15,
	"pickup_hour": 15,
	"dropoff_hour": 15,
	"PULocation": 106,
	"DOLocation": 181,
	"taxi_company": 1,
	"trip_day": 0,
	"base_passenger_fare": 16.77
}, {
	"index": 17,
	"trip_miles": "1.58",
	"trip_time": 397,
	"request_hour": 18,
	"pickup_hour": 18,
	"dropoff_hour": 18,
	"PULocation": 228,
	"DOLocation": 14,
	"taxi_company": 0,
	"trip_day": 0,
	"base_passenger_fare": 7.51
}, {
	"index": 18,
	"trip_miles": "3.36",
	"trip_time": 1035,
	"request_hour": 20,
	"pickup_hour": 20,
	"dropoff_hour": 20,
	"PULocation": 61,
	"DOLocation": 77,
	"taxi_company": 0,
	"trip_day": 2,
	"base_passenger_fare": 13.11
}, {
	"index": 19,
	"trip_miles": "2.93",
	"trip_time": 981,
	"request_hour": 23,
	"pickup_hour": 23,
	"dropoff_hour": 23,
	"PULocation": 71,
	"DOLocation": 225,
	"taxi_company": 0,
	"trip_day": 5,
	"base_passenger_fare": 17.96
}, {
	"index": 20,
	"trip_miles": "5.5",
	"trip_time": 956,
	"request_hour": 21,
	"pickup_hour": 22,
	"dropoff_hour": 22,
	"PULocation": 235,
	"DOLocation": 116,
	"taxi_company": 0,
	"trip_day": 1,
	"base_passenger_fare": 18.14
}, {
	"index": 21,
	"trip_miles": "4.54",
	"trip_time": 1848,
	"request_hour": 11,
	"pickup_hour": 11,
	"dropoff_hour": 11,
	"PULocation": 7,
	"DOLocation": 230,
	"taxi_company": 0,
	"trip_day": 1,
	"base_passenger_fare": 32.38
}, {
	"index": 22,
	"trip_miles": "8.5",
	"trip_time": 1993,
	"request_hour": 19,
	"pickup_hour": 19,
	"dropoff_hour": 20,
	"PULocation": 125,
	"DOLocation": 82,
	"taxi_company": 0,
	"trip_day": 0,
	"base_passenger_fare": 40.34
}, {
	"index": 23,
	"trip_miles": "1.55",
	"trip_time": 539,
	"request_hour": 4,
	"pickup_hour": 4,
	"dropoff_hour": 4,
	"PULocation": 158,
	"DOLocation": 144,
	"taxi_company": 0,
	"trip_day": 3,
	"base_passenger_fare": 20.98
}, {
	"index": 24,
	"trip_miles": "12.84",
	"trip_time": 3490,
	"request_hour": 15,
	"pickup_hour": 15,
	"dropoff_hour": 16,
	"PULocation": 151,
	"DOLocation": 34,
	"taxi_company": 0,
	"trip_day": 4,
	"base_passenger_fare": 60.91
}];

export async function getPrediction(X, y_actual, batch = 1) {
    let x = null;
    if (batch == 1)
        x = Object.values(X);
    else
        x = X.flat();

    const x_tensor = new ort.Tensor('float32', Float32Array.from(x), [batch, 9]);
    const lgbm_session = await ort.InferenceSession.create('./_next/static/chunks/pages/lgbm.onnx');
    const dl_session = await ort.InferenceSession.create('./_next/static/chunks/pages/dl.onnx');

    const lgbm_results = await lgbm_session.run({"float_input": x_tensor});
    const dl_results = await dl_session.run({"input_1": x_tensor});

    if (batch == 1) {
        let {
            variable: {
                data: [lgbm_value = 0.0] = []
            } = {}
        } = lgbm_results
    
        let {
            output: {
                data: [dl_value = 0.0] = []
            } = {}
        } = dl_results
    
        return {
            y_actual,
            "lgbm": Number(lgbm_value.toFixed(2)),
            "dl": Number(dl_value.toFixed(2))
        };
    }
    
    let {
        variable: {
            data: lgbm_values = []
        } = {}
    } = lgbm_results

    let {
        output: {
            data: dl_values = []
        } = {}
    } = dl_results

    lgbm_values = lgbm_values.map(v => Number(v.toFixed(2)))
    dl_values = dl_values.map(v => Number(v.toFixed(2)))
    return {
        y_actual,
        "lgbm": lgbm_values,
        "dl": dl_values
    };
}

export async function getRandomSample() {
    const sample = testSamples[Math.floor(Math.random() * testSamples.length)];
    sample['trip_miles'] = parseFloat(sample['trip_miles']);
    const y_actual = sample['base_passenger_fare'];
    const X = Object.assign({}, sample);
    delete X['base_passenger_fare'];
    delete X['index'];

    return {
        X, y_actual
    }
}
