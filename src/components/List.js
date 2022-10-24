import React, { useState } from "react";

const List = React.memo(({ id, title, completed, todoData, setTodoData }) => {
  // 편집 중인 상태 체크
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  //  react 에서 css 를 {} 생성하는법
  const btnStyle = {
    color: "#000",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };

  const listStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px dotted #ccc",
      textDecoration: completed ? "line-through" : "none",
    };
  };
  //  할일 상태 변경
  const completeChange = (id) => {
    let changeTodo = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(changeTodo);
    localStorage.setItem("todoData", JSON.stringify(changeTodo));
  };

  //  할일 삭제 메서드
  const deleteTodo = (id) => {
    // 선택된 아이디와 다른 목록만 추출하기가 알고리즘 상 좋다.
    let newTodo = todoData.filter((data) => data.id !== id);
    // 새로운 todo 데이터를 state.todoData 를 교체한다.
    setTodoData(newTodo);
    localStorage.setItem("todoData", JSON.stringify(newTodo));
  };

  // 편집(타이틀을 수정) 중인 상태
  const editChange = (e) => {
    setEditedTitle(e.target.value);
  };
  // 편집 완료 상태
  const changeSubmit = () => {
    let changeTodo = todoData.map((data) => {
      // props 로 이미 id 는 전송을 받았음.
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(changeTodo);
    localStorage.setItem("todoData", JSON.stringify(changeTodo));
    // 편집 상태를 종료한다.
    setIsEditing(false);
  };

  if (isEditing) {
    // 편집 목록 출력 상태
    return (
      <div className="flex items-center justify-between w-full px-4 py-1 my-1 text-gray-600 bg-gray-100 border rounded row">
        <form onSubmit={changeSubmit}>
          <input
            type="text"
            className="w-full px-3 py-2 mr-4 text-gray-500 appearance-none"
            value={editedTitle}
            onChange={editChange}
            autoFocus
          />
        </form>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => {
              setIsEditing(false);
            }}
            type="button"
          >
            X
          </button>
          <button
            className="px-4 py-2 float-right"
            onClick={changeSubmit}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    // 일반적인 목록 출력 상태
    return (
      <div
        style={listStyle(completed)}
        key={id}
        className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded"
      >
        <div className="items-center">
          <input
            type="checkbox"
            defaultChecked={completed}
            onChange={() => completeChange(id)}
          />{" "}
          {title}
        </div>
        <div className="items-center">
          <button
            className="float-right px-4 py-2"
            onClick={() => deleteTodo(id)}
          >
            X
          </button>
          <button
            className="float-right px-4 py-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
});
export default List;
