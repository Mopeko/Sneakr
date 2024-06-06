const fs = require('fs');

async function fetchData() {
    const fetch = (await import('node-fetch')).default;

    let data = [];
    let pageSize = 100;
    let choosePage = 0;
    let totalPages = 493;

    while (choosePage <= totalPages) {
        const response = await fetch(`http://54.37.12.181:1337/api/sneakers?pagination%5Bpage%5D=${choosePage}&pagination%5BpageSize%5D=${pageSize}`);
        const json = await response.json();

        console.log(json); // Log the json object to the console

        data = data.concat(json.data); // assuming the data is in the 'data' property
        choosePage++;
    }

    try {
        fs.writeFileSync('./sneakr/database/sneakr.json', JSON.stringify(data));
        console.log('Successfully wrote to file');
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

fetchData();