import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const ListItem = styled.li`
  border-bottom: 2px dotted ${(props) => props.theme.accentColor};
  padding-top: 20px;
  padding-bottom: 10px;
  list-style: none;
  display: flex;
  flex-direction: column;
  span {
    padding-bottom: 10px;
    color: ${(props) => props.theme.textColor};
    transition: color 0.2s linear;
  }
`;

const BtnItem = styled.div`
  display: flex;
  justify-content: end;
  button {
    font-size: 0.5rem;
    margin: 0 3px;
    background-color: ${(props) => props.theme.btnColor};
    border: none;
    border-radius: 3px;
    color: ${(props) => props.theme.textColor};
    padding: 5px;
    transition: all 0.2s linear;
  }
`;
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((prev) =>
      prev.map((oldToDo) => {
        if (oldToDo.id === id) {
          return { text, id, category: name as any };
        }
        return oldToDo;
      })
    );
  };
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((todo) => todo.id !== id);
      return newToDos;
    });
  };
  return (
    <ListItem>
      <span>{text}</span>
      <BtnItem>
        {/*DOING이 아닐때만 Doing 버튼이 보이게*/}
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            진행하기
          </button>
        )}
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            할 일
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            끝내기
          </button>
        )}
        <button onClick={onDelete}>삭제</button>
      </BtnItem>
    </ListItem>
  );
}

export default ToDo;
