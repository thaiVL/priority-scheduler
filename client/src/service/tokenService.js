function testToken(token) {
    var status;
    var result;
    return fetch("/login/test", {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        status = res.status
        return res.json();
    })
    .then(data => {
        // INVALID TOKEN
        if (status !== 200) {
            result = false;
        }
        else{
            result = true;
        }
        console.log(result);
        return result;
        /////// TEST TOKEN ////////////
    })
    .catch(error => console.warn(error));
}

export {testToken};