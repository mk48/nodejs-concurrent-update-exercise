async function update(id:number, data:string) {
    console.log(`start --> id:${id}, data:${data}`);
    await randomDelay(); //update is happening here 
    console.log(`end --> id:${id}, data:${data}`);
}


//=============================================================================
//================= Don't change anything below ===============================
//=============================================================================

async function sleep(ms: number) {
    return new Promise((resolve:any, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

//---- update() is getting called from many places ----
update(1, "browser 1");
update(1, "browser 2");
