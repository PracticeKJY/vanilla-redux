import { createStore } from "redux"

const ul = document.querySelector("ul")
const input = document.querySelector("input")
const button = document.querySelector("button")

//action : {type: string} 이니까 string은 변수로 뺄거얌
const add_todo = "add_todo"
const delete_todo = "delete_todo"

const addToDo = (text) => {
  return { type: add_todo, text }
}

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text))
}

// 삭제기능은 id에 접근해서 슥삭슥삭할거임
const deleteToDo = (id) => {
  return { type: delete_todo, id }
}

//e.target이 삭제버튼(=btn) 이니까 부모노드에 접근해서 id따냄
const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id)
  store.dispatch(deleteToDo(id))
}

//button에 걸어줄 handler 선언
const onSubmit = (e) => {
  e.preventDefault()
  //input의 value에 접근.
  const inputValue = input.value
  //initialize
  input.value = ""
  //dispatch에 걸어주기
  dispatchAddToDo(inputValue)
}

button.addEventListener("click", onSubmit)

//subscribe callback function
const paintToDo = () => {
  const toDoState = store.getState()
  ul.innerText = ""
  toDoState.forEach((item) => {
    const li = document.createElement("li")
    //삭제버튼도 하나 만들어주자.
    const btn = document.createElement("button")
    //텍스트도 정해주자
    btn.innerText = "삭제"
    //이벤트핸들러도 걸어주자
    btn.addEventListener("click", dispatchDeleteToDo)
    li.innerText = item.text
    li.id = item.id
    //자식으로 소-환
    li.appendChild(btn)
    ul.appendChild(li)
  })
}

//reducer의 파라미터에는 state와 action이 들어온다구
// default parameter로 state에 [] 빈배열주장
const reducer = (state = [], action) => {
  //switch가 국룰쓰지.
  //그리구 key엔 action의 key, value엔 구현할 기능이름 ㄱㄱ
  //추가 기능과 삭제기능 넣을꺼니까 대충 이렇게 이름짓자
  switch (action.type) {
    case add_todo:
      //spread operator로 멋지게 새거만들어서 mutate를 피해보자
      return [...state, { text: action.text, id: Date.now() }]
    case delete_todo:
      //filter을 이용해서 조건에 맞지 않은 새로운 []들을 뽑아내보자
      return state.filter((item) => item.id !== action.id)

    default:
      return state
  }
}

const store = createStore(reducer)
//subscribe -> store의 상태가 변경될 때마다 호출!!
store.subscribe(paintToDo)

/* ------------------------------- vanilla js ------------------------------- */

// const form = document.querySelector("form")
// const input = document.querySelector("input")
// const ul = document.querySelector("ul")

// const createToDo = (toDo) => {
//   const li = document.createElement("li")
//   li.innerText = toDo
//   ul.appendChild(li)
// }

// const onSubmit = (e) => {
//   e.preventDefault()
//   const toDo = input.value
//   input.value = ""
//   createToDo(toDo)
// }

// form.addEventListener("submit", onSubmit)
