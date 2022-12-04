import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, isDarkAtom, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  overflow: hidden;
  margin: 60px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

const Selected = styled.select`
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.cardBgColor};
  width: 400px;
  padding: 10px;
  color: ${(props) => props.theme.textColor};
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  transition: background-color 0.2s linear;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 40px;
`;

const List = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 30px;
  width: 400px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  transition: background-color 0.2s linear;
`;

const ThemeBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid white;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  background-color: ${(props) => props.theme.cardBgColor};
  position: absolute;
  right: 30px;
  top: 40px;
  transition: background-color 0.2s linear;
`;

function ToDoList() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(category);
  return (
    <Container>
      <Content>
        <Title>To Do</Title>
        <ThemeBtn onClick={toggleDarkAtom}>
          {isDark ? (
            <img src={process.env.PUBLIC_URL + "/images/sun.svg"} alt="Light mode" />
          ) : (
            <img src={process.env.PUBLIC_URL + "/images/moon.svg"} alt="Dark mode" />
          )}
        </ThemeBtn>
        <Selected value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>할 일</option>
          <option value={Categories.DOING}>진행 중</option>
          <option value={Categories.DONE}>끝난 일</option>
        </Selected>
        <CreateToDo />
        <List>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </List>
      </Content>
    </Container>
  );
}

export default ToDoList;
