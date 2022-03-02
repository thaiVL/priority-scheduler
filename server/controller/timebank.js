const db = require("../controller/mysqldb");

async function getTimebank(userID){
    return new Promise((reject, resolve) => {
        errors = [];
        query = `SELECT * FROM usertimebank WHERE userID=${userID}`
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err})
                console.log(err)
                reject(errors);
                return;
            }
            if(result.length === 0){
                errors.push({msg: "User doesn't exist"})
                reject(errors)
                return;
            }
            resolve(result[0])
        })
    })
}

module.exports = {getTimebank};