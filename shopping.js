const form = document.querySelector('.add-items');
const input = form.querySelector('input');
let shoppingArr = [];

// submit했을때 : event 발생 -> 새로운 item 배열에 추가. 화면에 출력. locallStorage에 저장
form.addEventListener('submit', event => {

    // 새로고침 막기
    event.preventDefault();

    // 입력값 가져오기 + 배열에 저장 + input창 초기화
    const newItem = input.value;

    if (newItem === "") {
        alert('Please Enter Valid Shopping Item');   //입력값 없을 때 예외처리 (alert)

    } else {
        const len = shoppingArr.length !== 0  ? shoppingArr[shoppingArr.length-1].id + 1 : 1;
        shoppingArr.push({ 
            id: len,
            item: newItem
        })
        input.value = "";

        // 화면에 출력 (방금 생성된 item)
        printItems(newItem, len);

        // 입력값을 localStorage 배열에 저장
        saveLS();
    }
})

const itemList = document.querySelector('.list-items');

function printItems(item,id) {

    //li element 생성 -> span+button 넣기 -> id값 부여(삭제할때 구별을 위해) -> ul에 넣기
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${item}</span>
        <button><i class="fas fa-times"></i></button>
    `;
    li.id = id;
    itemList.appendChild(li);

    
    // 삭제구현 : x버튼이 눌린 것이 해당 span과 연결됨을 알수있는 방법 : 부모 찾기 -> 부모를 삭제

    const delBtn = li.querySelector('button');
    delBtn.addEventListener('click', event => {

        if (event.target.tagName === 'I') {
            const btn = event.target.parentNode;
            itemList.removeChild(btn.parentNode);
            shoppingArr = shoppingArr.filter(item => {
                return item["id"] != btn.parentNode.id
            })
        } else {
            itemList.removeChild(event.target.parentNode);
            shoppingArr = shoppingArr.filter(item => {
                return item["id"] != event.target.parentNode.id
            })
        }   
        // 삭제한것 localstorgae에도 저장
        saveLS();
    })
}

// localStorage에 저장된 쇼핑리스트 있는 경우 먼저 출력 + 초기화
const savedShoppingList = JSON.parse(localStorage.getItem('shopping-list'));
if (savedShoppingList) {
    savedShoppingList.forEach(itemObj => printItems(itemObj["item"],itemObj["id"]));
    shoppingArr= savedShoppingList;
};

//local storage에 저장하는 함수
function saveLS(){
    localStorage.setItem("shopping-list", JSON.stringify(shoppingArr));
}
    

