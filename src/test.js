import React, { Component } from "react";
export default class App extends Component {
  // state는 내용이 변하면vue의 ref처럼  화면을 re-rendering한다.

  state = {
    todoData: [
      {
        id: "1",
        title: "공부하기",
        completed: false,
      },
      {
        id: "2",
        title: "점심먹기",
        completed: false,
      },
      {
        id: "3",
        title: "리액트 공부하기",
        completed: false,
      },
    ],
  };
  //할일 목록을 관리할 데이터 구성

  //  react 에서 css 를 {} 생성하는법
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  };
  listStyle = () => {
    return {
      padding: "10px",
      borderBottom: "1px dotted #ccc",
      textDecoration: "none",
    };
  };
  //할일 삭제 메서드
  deleteTodo = (id) => {
    //선택된 아이디와 다른 목록만 추출하기가 알고리즘 상 좋다.
    let newTodo = this.state.todoData.filter((data) => data.id !== id);
    // 새로운 todo 데이터를 state.todoDate를 교체한다.
    this.setState({ todoData: newTodo });
  };
  render() {
    return (
      // JSX 기본적으로 하나의 Root 태그가 필요하다.
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할일 목록</h1>
          </div>

          {
            /* 할일목록 데이터를 출력한다. */
            this.state.todoData.map((data) => (
              <div style={this.listStyle()} key={data.id}>
                <input type="checkbox" defaultChecked={data.completed} />
                {data.title}
                <button
                  style={this.btnStyle}
                  onCilck={() => this.deleteTodo(data.id)}
                >
                  x
                </button>
              </div>
            ))
          }

          <form>
            <input type="text" name="value" placeholder="할 일을 입력하세요." />
            <input type="submit" value="입력" />
          </form>
        </div>
      </div>
    );
  }
}
