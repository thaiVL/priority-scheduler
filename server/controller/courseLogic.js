const db = require("./mysqldb");

async function recordExists(tableName, conditions){
    return new Promise((resolve, reject) => {
        errors = []
        query = `SELECT EXISTS(SELECT * FROM ${tableName} WHERE ${conditions});`
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                reject(errors);
                return;
            }
            key = Object.keys(result[0]);
            resolve(result[0][key]);
            return;
        })
    })

}

async function getTasksByCourse(userID, courseID){
    return new Promise((resolve, reject) => {
        errors = [];
        query = `SELECT tasks.taskName, usertask.difficulty, tasks.weightedGrade, tasks.taskDeadline FROM tasks 
        JOIN usertask 
        ON usertask.taskID = tasks.taskID 
        WHERE usertask.userID='${userID}' AND tasks.courseID='${courseID}' AND usertask.finishedDate IS null;`;
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                reject(errors);
                return;
            }
            if(result.length === 0){
                reject({msg: "User has no tasks for this course"});
            }
            resolve(result);
            return;
        })
    })
}

// tasks that are not finished
async function getTasks(userID){
    return new Promise((resolve, reject) => {
        errors = [];
        query = `SELECT * FROM usertask WHERE userID='${userID} AND finishedDate IS null'`;
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                reject(errors);
                return;
            }
            if(result.length === 0){
                reject({msg: "User has no tasks to do"});
            }
            resolve(result);
            return;
        })
    })
}

async function getCourses(userID){
    return new Promise((resolve, reject) => {
        errors = [];
        query = `SELECT courses.courseID, courses.courseName, usercourses.courseImportance FROM courses
        JOIN usercourses
        ON usercourses.courseID = courses.courseID
        WHERE usercourses.userID = '${userID}';`;
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                reject(errors);
                return;
            }
            if(result.length === 0){
                reject({msg: "User has no courses"});
            }
            resolve(result);
            return;
        })
    })
}

async function setImportance(userID, courseID, importance){
    return new Promise((resolve, reject) => {
        errors = [];
        query = `UPDATE usercourses 
        SET courseImportance='${importance}' WHERE userID='${userID}' AND courseID='${courseID}'`;
        db.query(query, (err, result) => {
            if(err){
                errors.push({msg: err});
                reject(errors);
                return;
            }
            resolve("Successfully changed importance");
        })
    })
}

async function addCourse(userID, courseID, importance){
    return new Promise((resolve, reject) => {
        recordExists("usercourses", `userID='${userID}' AND courseID='${courseID}'`)
        .then(suc => {
            if(suc === 1){
                reject({msg: "User already in this course"});
                return;
            }
            else{
                errors = [];
                query = `INSERT INTO usercourses (userID, courseID, courseImportance) VALUES ('${userID}', '${courseID}', '${importance}')`;
                db.query(query, (err, result) => {
                    if(err){
                        errors.push({msg: err});
                        reject(errors);
                        return;
                    }
                    resolve("Successfully added course");
                    return;
                })
            }
        })
        .catch(fail => {
            reject(fail);
            return;
        })

    })
}

module.exports = {getTasksByCourse, getTasks, getCourses, setImportance, addCourse};