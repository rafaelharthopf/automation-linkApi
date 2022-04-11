const cron = require('node-cron');
const axios = require('axios');

/*const mongoDb = require('mongoose');;
await mongoose.connect('mongodb+srv://rafalinkApi:Bavarias@1@cluster0.xeb4s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
)


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    fullName: String,
    email: String,
    address: String,
    addressNumber: String,
    phoneNumber: String
});

const UserModel = mongoose.model('UserModel', userSchema);
*/

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