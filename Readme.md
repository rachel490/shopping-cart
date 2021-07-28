## 1. 기능

- shopping item 추가
- shopping item 삭제

<img width="400" src="https://user-images.githubusercontent.com/72786354/127321939-eb95c9ac-2ac3-41bd-a6f1-994d2bd2555b.gif" alt="gif file" />


-------------------------------------------------

## 2. UI

- item 추가하는 input box는 하단에 위치 -> 손가락의 위치로 더 편함. (엄지손가락으로 터치해서 추가하기?)
- icon (fontawesome) : 추가버튼, 삭제버튼 
- theme : green, yellow

-------------------------------------------------
## 3. 구현순서

1. 사용자가 input에 입력
2. 입력값을 submit했을 때 event 발생
3. 입력값을 데이터에 저장 -> 배열 형태로 (localstorage에 저장) 
4. 화면에 출력: li태그 - span + (button - i)
5. 새로고침을 했을 때 : localstorage에서 먼저 가져와서 화면에 출력



-------------------------------------------------

## 4. 막혔던 부분

**<< Delete Btn 구현 >>**

- ul li button으로 접근했다가 첫번째 원소만 삭제됨   
    => 해결 : button이 생성될때 event도 같이 넣음

- 삭제 버튼을 클릭했을때 부모노드를 찾아서 li태그를 remove하려고 했으나 구별할 수 없음   
    => 해결 : li태그마다 id부여    
    - id값을 item으로 했을 때: 중복 item 있을 수 있음   
    - id값 배열의 length로 했을 때: 삭제가 이뤄지면 같은 배열의 length가 나올 수 있음      
    - id값 = 배열의 마지막 원소의 id값으로 함 + 배열이 비어있을 경우 1로 부여 (삼항연산자 사용)

    - 배열에 object형태로 저장 -> id: - , item: - 
    - id : item으로 하려고 했으나 실패.

- 삭제한 li태그에 해당하는 원소를 배열에서도 삭제.   
    => 해결 : filter사용 - 버튼의 부모노드의 id값과 li의 id값이 일치할때 제외시킴

- 새로고침했을 때 삭제된 것이 다시 살아남.    
    => localStorage에 업데이트 : 다시 배열 저장..


<br>

**<< LocalStorage >>**

- 새로고침했을 때 item들 날라감 (초기화됨.)    
    => 해결: localStorage에 저장
    - localStorage.setItem("key":배열) 사용   

- localStorage에 저장해서 불러왔을때 오류발생   
    => 해결1 : stringify - parse를 사용
    - stringify = js => json형태로 변환해서 저장 
    - parse = json => js로 변환해서 가져옴

    =>해 결 2: printItems에 넣을때 item, id를 각각 구분해서 넣음
    - forEach로 배열을 돌면서 각각 itemObj의 item,id를 접근해서 printItems에 전달


- localStorage와 배열의 동기화 : 새로고침을 했을때 배열 초기화되는 현상    
    => 해결 : localStorage에 저장된 것이 있는지 확인후 있다면 그것을 배열의 초기값으로 설정    
    - localStorage.getItem 사용해서 가져온 후   
    - null이 아니면 => printItems() + 배열 = localStorage.getItem


<br>

**<< 입력값 받아오기 >>**

-  입력값 없는 경우에도 빈 item 생성    
    => 해결 : 조건문 통해서 null인 경우 alert출력

- 입력후에도 입력값이 계속 남아있는 현상   
    => 해결 : input.value = ""로 초기화시킴



----

## 5. 개선사항 

- 7.28 : refactoring 필요   
    - button안에 i태그로 인해서 i태그를 클릭했을 때와 button을 클릭할때를 나누고 있음   
    - 이유: i태그의 부모노드 = button, button의 부모노드 = li이므로


---
## 6. 추가구현 

- 수정 버튼
- 완료 버튼
- 여러개 선택 -> 삭제
- 한꺼번에 선택
- 한꺼번에 삭제
