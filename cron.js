const cron = require('node-cron');
const axios = require('axios');
const {promisify} = require('util');
const sleep = promisify(setTimeout);

cron.schedule ('* */2 * * * ', async () => {


    let haveResults = true
    let page = 1;

    const result = []
    

    while(haveResults) {
        console.log(page);
        const {data} = await axios.get(`http://localhost:3000/users`, {
            params: {
                page
        }});
        page++;
        if(!data.error) {
            for(let user of data){
                const {
                    fullName,
                    email,
                    address,
                    contacts
                } = user

                const formattedUser = {
                    fullName,
                    email,
                    address: address[0].street,
                    addressNumber: address[0].number,
                    phoneNumber: contacts[0].phoneNumber
                }
                result.push(formattedUser);
                await sleep(2300);
            }
        }else{
            haveResults = false
        }
        console.log(result);
    }
})
