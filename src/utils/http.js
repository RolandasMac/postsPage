



export const http = {
    get(url) {
        return new Promise((resolve, reject) => {
            try {
                fetch(url,{method:'GET'})
                    .then(res =>{
                        if (res.ok) {
                            return res.json()
                        }else{
                            throw new Error(`HTTP error! Status: ${res.status}`);
                            return res.blob();
                        }
                    })
                    .then(data => {
                        // console.log(data);
                        resolve(data);
                    })
            } catch (Error) {
                reject("error")
            }
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            try {
                fetch(url,{
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify(data), // body data type must match "Content-Type" header
                    // body: data, // body data type must match "Content-Type" header
                })
                    .then(res =>{
                        if (res.ok) {
                            return res.json()
                        }else{
                            throw new Error(`HTTP error! Status: ${res.status}`);
                            return res.blob();
                        }
                    })
                    .then(data => {
                        // console.log(data);
                        resolve(data);
                    })
            } catch (Error) {
                reject("error")
            }
        })
    }
}
// export default http;