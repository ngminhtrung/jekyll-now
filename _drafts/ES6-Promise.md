`Promise` đơn thuần là 1 object giúp ghi nhận một "công việc bất đồng bộ" nào đó (an asynchronous operation) đã hoàn thành hay thất bại.

Về cơ bản, mỗi `promise` là một object được trả về 

```js
function successCallback(result) {
    console.log("it succeeded with " + result);    
}

function failureCallback(erro) {
    console.log("It failed with " + error);
}

doSomething(successCallback, failureCallback);
```

viết kiểu mới thành:
```js 
const promise = doSomething();
promise.then(successCallback, failureCallback);
```

hoặc đơn giản là:
```js 
doSomething().then(successCallback, failureCallback);
```

Không giống như kiểu viết cũ, việc dùng `Promise` có vài điểm lợi là:
- Callback sẽ không bao giờ được gọi trước khi chu trình thực thi hiện tại của event loop của JavaScript kết thúc.
- Callback được thêm `.then` ngay cả sau khi công việc bất đồng bộ trên thành công/ thất bài thì vẫn được gọi. 
- Nhiều callback có thể được thêm vào với `.then`, để giúp nó được thực thi độc lập nhau. 

Tuy vậy, điểm lợi lớn nhất của việc dùng `Promise` là "chaining".

