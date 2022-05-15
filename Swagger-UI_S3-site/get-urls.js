
let res_urls;
// import { get } from 'https';

// https = require('https');

const options = {
    hostname: 'tliwizhzqg.execute-api.us-east-2.amazonaws.com',
    port: 443,
    path: '/dev/swagger',
    headers: {
        'Content-Type': 'application/json'
    }
};

// get(options, (res) => {
https.get(options, (res) => {
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);
    res.on('data', (d) => {
        res_urls = JSON.parse(d);
    });

}).on('error', (e) => {
    console.error(e);
});

const waitForResponse = async () => {
    if (!res_urls) {
        setTimeout(() => { console.log('Waiting for list of Apis')
        waitForResponse(); }, 300);
    }
    else{
        console.log('else:', res_urls);
        return;
    }
}

waitForResponse().then(console.log('then block'));
//   export {response_urls};
