import React, { useState } from "react";
import Lists from "./components/Lists";
import Form from "./components/Form";

// 목록을 localStorage 에서 읽어온다.
const initTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

export default function App() {
  // 할일 목록을 관리할 데이터 구성
  const [todoData, setTodoData] = useState(initTodoData);
  const [value, setValue] = useState("");

  // 할일 저장 관련
  const formSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    // todoData 를 업데이트 한다.
    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    setValue("");
  };

  const allDelete = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  return (
    // JSX 기본적으로 하나의 Root 태그가 필요하다.
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할일 목록</h1>
          <button onClick={allDelete}>Delete All</button>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form formSubmit={formSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
