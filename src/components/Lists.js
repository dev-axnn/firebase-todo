import React from "react";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData }) => {
  
  return (
    <div>
      {
        /* 할일 목록 데이터를 출력한다. */
        todoData.map((data) => (
          <List
            key={data.id}
            id={data.id}
            title={data.title}
            completed={data.completed}
            todoData={todoData}
            setTodoData={setTodoData}
          />
        ))
      }
    </div>
  );
});
export default Lists;
