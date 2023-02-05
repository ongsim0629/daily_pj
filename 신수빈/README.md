<h1>🍄 flask로 서비스 구현하기 🍄</h3>

# <h3>🍄 현재 진행 상황 🍄</h3>
- 플라스크로 웹 서버 구현
- 이미지 전처리 기능
- 로그 기능
  - db와 연결 수정 필요
# <h3>🍄 구현 목표 목록 🍄</h3>
- 이미지 전처리 후 경로 수정
- yolo를 이용한 기능 추가
  - 구체적으로 어떤 기능 추가할 지는 더 생각해봐야겠다
- 주석 추가 및 코드 수정
- css 추가

<h1>📖 팀프로젝트 개인 공부 ~ 23.02.06📖</h3>

# <h3>📖 node.js를 이용한 api 설계 📖</h3>
- js의 특징 : 브라우저에서 실행된다 -> 컴퓨터에서 실행되는 것이 아니다.
  - 즉, 인터프리터가 브라우저에 존재한다.

- js를 내 컴퓨터, 서버에서 실행 시키는 것이 목표 -> node.js 설치 필요
  - 다르게 말하면, node.js가 설치된다면 브라우저가 없어도 js 실행이 가능하다.

- 어떻게 실행하느냐
  - 터미널 -> node (파일명).js

- npm (node package manager)
  - 자바스크립트로 구현된 다양한 모듈들
  - 설치 : npm install (모듈명)

- package.json : 터미널에 npm init을 통해 생성 가능
  - 설치된 모듈 버전 등 정리 (관리)
  - 대략적인 모듈 정보 확인 가능
- package-lock.json : 조금 더 상세한 모듈 정보 확인 가능
- node_modules (폴더) : 설치한 모듈 설치된 폴더

----------------------------------------------------
    var (변수명) = require('모듈명');
  
-> 모듈을 가져와서 변수명에 넣어줌
<br>
<br>
    ```변수명(~)```
<br>
-> 모듈을 사용할 수 있게 하는 변수 -> 모듈 수행

- express (모듈) : node.js를 통해서 웹 프레임워크 생성하도록 도와주는 모듈

express 예제 코드 :
```
const express = require('express')
const app = express()
const port = 3000

// get -> HTTP 메소드
// HTTP 메소드 : 요청의 목적이나 종류를 알려주려는 수단 (get, post 등)
// '/' -> 라우팅
// 라우팅 : 라우팅에 따라서 보여지는 HTML이 달라진다. (/about, /board, /board/write 등)
// ()=>{} -> 콜백 함수
// 콜백 함수 : 함수(끝나고 실행할 함수)

app.get('/', (req, res) => {
    res.send('Hello World!')
    #응답에 Hello World라는 문자를 담아서 보내겠다
})
# 즉, 익스프레스 앱에 라우팅이 root로 (기본주소 '/') 들어오면 (주소창을 이용한 정보전달은 get 방식)헬로우월드 어쩌구 함수 실행하겠다

app.listen(port, () => { #port번의 포트에 대해서 listen하고 있다 -> 사용 가능하다
    console.log(`Example app listening on port ${port}`)
})
```
-> 3000번 포트에 대해서 listen 하고 있다가, 브라우저 주소창을 이용해서 사용자가 3000번 포트에 접속을 함
이때 사용자는 get 방식을 통해서 (app의 get 방식으로 기본주소로 들어가서 콜백 함수가 실행되었다.)
이 콜백함수는 응답에 Hello World라는 글자를 보내는 함수였음.

-----------------------------
api 예제 
```
GET /dog => {'sound': '멍멍'}
GET /cat => {'sound': '야옹'}
```

해당 코드
```
app.get('/dog', (req, res) => {
    res.send({sound: '멍멍'})
})
#send 안의 내용에는 html, href, json 등 다양하게 들어갈 수 있음
app.get('/cat', (req, res) => {
    res.json({sound: '야옹'})
})
#json은 send에 비해서 조금 더 명시적인 방법 큰 차이는 없다
```

- axios랑 차이 : axios는 요청을 쏘고 받아옴
   - axios로 요청해서 express로 응답해줌

- GET 방식으로 정보를 전달하는 방식 -> params, query 2가지 존재

  - parameter 방식 : youtube.com/user/{유저id}
  <br>
  
  >유저 아이디마다 코드를 다 만드는 것 -> 비효율적
  >
  >따라서 변수를 통해서 연결하는 방식
  >
  >해당 코드
  >
  ```
  app.get('/user/:id', (req, res) => {
    #변수를 받을 떄는 콜론을 사용해줌
    const q = req.params
    console.log(q.id)

    res.json({'userid': q.id})
  })
  ```

  - query 방식 : google.com/search?q={검색내용}
  <br>
  
  >키 밸류 구조임 (json, 딕셔너리 구조)
  >
  >&로 연결 가능
  >
  >해당 코드
  >
  ```
  app.get('/user/:id', (req, res) => {
     const q = req.query
      console.log(q)

    res.json({'userid': q.name})
  })
  ```

  
  >주소창 입력
  >
  >http://localhost:3000/user/hi?q=subin&name=shin&age=24
  >
  >콘솔 결과
  >
  >{ q: 'subin', name: 'shin', age: '24' }
  >
  >브라우저창 출력 결과
  >
  >{"userid":"shin"}

- POST 방식 : body에 값을 담아서 전달
  -req.body 기반으로 데이터 처리
----------------------------------------
- CORS: html로 요청할 때 보안 문제로 인해서 CORS 설정을 안해주면 차단되는 경우가 발생한다.
  - 모듈 설치 필요 : npm install cors
  -사용방법
  ```
  var cors = require('cors')
  app.use(cors())
  # cors() : 비워두면 모든 요청에 대해서 허용
  ```
  
- API란 : 프로그램들이 서로 소통할 수 있도록 도와준다
  - 또, 서버, 데이터를 갖고 있는 사람들이 원하는대로 디자인이 가능하다.
