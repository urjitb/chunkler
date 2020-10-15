const fs = require('fs');

const accounts = fs.readFileSync('accounts.txt').toString().split("\n")
const ips = fs.readFileSync('ips.txt').toString().split('\n')
const totalIps = ips.length;
const accountsPerIp = 4;

let i,j,tempArray,chunk = totalIps*accountsPerIp;
let iter = 0

for (i=0,j=accounts.length; i<j; i+=chunk) {

    tempArray = accounts.slice(i,i+chunk);


    let ipPos = 0, ipSlicer = accountsPerIp, cur = 0;
    tempArray.forEach((account)=>{
        if(ipSlicer === 0){
            ipSlicer=4
            ipPos++
        }
        let user = account.split('|')[0]
        let userName = user.split(':')[0]
        let password = user.split(':')[1]
        tempArray[cur] =  userName + "," + userName + "," + password + "," + ips[ipPos].replace('\r','') + ",,,,,,,,,,,"

        cur++;
        ipSlicer--;
    })
    fs.writeFile('./chunks/chunk-'+ iter,tempArray.join('\n'),function (err){
        if(err){
            console.log(err)
        }
    })
    console.log("-")
    iter++;

}