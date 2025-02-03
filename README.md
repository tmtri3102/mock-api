# Mock API

## Endpoints

### 1. GET `/user/:userName`

Lấy thông tin user.

- **GET /user/peter** → `200`
  ```json
  { "id": 1, "userName": "peter", "age": "24" }
  ```
- **GET /user/unauthorised** → `403` `{}`
- **GET /user/{USERNAME}** → `200`
  ```json
  { "id": 0, "userName": "{USERNAME}", "age": "20" }
  ```

### 2. POST `/user`

Tạo user mới.

- **Body hợp lệ** → `201`
  ```json
  { "id": 3, "userName": "goodBoy", "age": 35 }
  ```
- **ID đã tồn tại** → `409`
  ```json
  { "errorMessage": "UserId already exists" }
  ```

## Cấu trúc thư mục

Dùng `connect-api-mocker` tạo API từ filesystem.

### **GET /user/peter**

```
/mock-api/user/peter/GET.json
```

```json
{
  "id": 1,
  "userName": "peter",
  "age": "24"
}
```

Truy cập: [localhost:9000/api/user/peter](http://localhost:9000/api/user/peter)

### **GET /user/unauthorised-user**

```
/mock-api/user/unauthorised-user/GET.js
```

```js
module.exports = (req , res) => res.sendStatus ( 403 );
```

Truy cập: [localhost:9000/api/user/unauthorised-user](http://localhost:9000/api/user/unauthorised-user)

### **GET /user/{USERNAME}**

```
/mock-api/user/__userName__/GET.js
```

```js
module.exports = (req , res) =>
    res.status ( 200 ).json ( {id: 0 , userName: req.params.userName , age: 20} );
```

Truy cập: [localhost:9000/api/user/testtest](http://localhost:9000/api/user/testtest)

### **POST /user**

```
/mock-api/user/POST.js
```

```js
module.exports = (req , res) => {
    if (req.body.id === 1) return res.sendStatus ( 409 );
    res.status ( 201 ).send ( req.body );
};
```

Gửi request id=1:

```sh
curl -X POST -H "Content-Type: application/json" -d "{\"id\":1}" http://localhost:9000/api/user
```

```sh
HTTP/1.1 409 Conflict
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 8
ETag: W/"8-OfewgPiFJ3o3XA5wgKRYk2ZHNlU"
Date: Mon, 03 Feb 2025 03:15:46 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Conflict
```

Gửi request id=2:
```sh
curl -X POST -H "Content-Type: application/json" -d "{\"id\":2}" http://localhost:9000/api/user
```

```sh
HTTP/1.1 201 Created
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 8
ETag: W/"8-M1u4Sc28uxk+zyXJvSTJaEkyIGw"
Date: Mon, 03 Feb 2025 03:16:18 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":2}
```
