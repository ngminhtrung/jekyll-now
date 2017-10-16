// Hàm kiểm tra số nguyên tố
function kiem_tra_snt(n)
{
    // Biến cờ hiệu
    var flag = true;
  
    // Nếu n bé hơn 2 tức là không phải số nguyên tố
    if (n < 2){
        flag = false;
    }
    else if (n == 2){
        flag = true;
    }
    else if (n % 2 == 0){
      flag = false;
    }
    else{
        // lặp từ 3 tới n-1 với bước nhảy là 2 (i+=2)
        for (var i = 3; i < n-1; i+=2)
        {
            if (n % i == 0){
                flag = false;
                break;
            }
        }
    }
  
    return flag;
}
 
 
// Main Code
var yargs = require('yargs');
 
var argv = yargs.argv;
 
if (typeof argv.n == "undefined"){
    console.log('Ban chua nhap n');
}
else{
    if (kiem_tra_snt(argv.n)){
        console.log('La so nguyen to');
    }
    else{
        console.log('Khong phai so nguyen to');
    }
}