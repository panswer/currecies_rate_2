const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const colors = require('colors');
const axios = require('axios').default;

const pathEnv = path.resolve(__dirname, './.env');

if (!fs.existsSync(pathEnv)) {
    console.log(colors.red('#'.repeat(50)));
    console.log(colors.red('ERROR:'));
    console.log(new Error("The .env file is required with API access key"));
    console.log(colors.red('#'.repeat(50)));
}

dotenv.config({
    path: pathEnv
});

const { CURRENCYLAYER_API_KEY } = process.env;

if(!CURRENCYLAYER_API_KEY){
    console.log(colors.red('#'.repeat(50)));
    console.log(colors.red('ERROR:'));
    console.log(new Error("The CURRENCYLAYER_API_KEY is required in .env, please get your api key from https://currencylayer.com/"));
    console.log(colors.red('#'.repeat(50)));
}

const API = 'http://api.currencylayer.com/';

const main = async () => {
    try {
        const parameters = [{
            key: 'access_key',
            value: CURRENCYLAYER_API_KEY
        }, {
            key: 'source',
            value: 'USD'
        }];

        const response = await axios.get(`${API}live?${parameters.map(parameter => `${parameter.key}=${parameter.value}`).join('&')}`);

        console.log(colors.green('#'.repeat(50)));
        console.log(response.data);
        console.log(colors.green('#'.repeat(50)));
    } catch (error) {
        console.log(colors.red('#'.repeat(50)));
        console.log(colors.red('ERROR:'));
        console.log(error);
        console.log(colors.red('#'.repeat(50)));
    }
}

main();