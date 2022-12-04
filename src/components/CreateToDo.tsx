import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const ToDoInput = styled.input`
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardBgColor};
  width: 400px;
  padding: 10px;
  margin: 20px;
  border: none;
  color: ${(props) => props.theme.textColor};
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  transition: all 0.2s linear;
`;

const Label = styled.label`
  position: relative;
`;

const ToDoBtn = styled.button`
  background-color: ${(props) => props.theme.cardBgColor};
  position: absolute;
  top: 0;
  right: 30px;
  border: none;
  transition: background-color 0.2s linear;
  img {
    width: 20px;
    height: 20px;
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>(); //setValue()는 값을 설정할 수 있음
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [{ text: toDo, id: Date.now(), category }, ...oldTodos]);
    setValue("toDo", ""); //toDo를 빈 문자열로 변경
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Label>
        <ToDoInput {...register("toDo", { required: "Please write a To do" })} placeholder="일정을 추가하세요" />
        <ToDoBtn>
          <img src={process.env.PUBLIC_URL + "/images/plus.svg"} alt="추가" />
        </ToDoBtn>
      </Label>
    </form>
  );
}

export default CreateToDo;
