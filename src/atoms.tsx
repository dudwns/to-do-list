import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

//enum: 계속해서 써야하는 값을 저장할 수 있음(하나하나 손으로 쓰다보면 실수할 수 있어서 위험)
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

const { persistAtom } = recoilPersist({
  key: "todoLocal", // 이 키는 로컬 스토리지에 데이터를 저장하는 데 사용됩니다.
  storage: localStorage, // 데이터를 저장하는 데 사용할 스토리지 구성
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom], //로컬 스토리지에 저장하기 위해 추가
});

//selector: 기존 state를 가져와서 새로운 state를 만들어서 반환할 수 있다.
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    //get function을 이용하면 selector의 내부로 atom을 가지고 올 수 있음
    const toDos = get(toDoState); //atom을 가져옴
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const isDarkAtom = atom({
  //atom은 고유한 key와 default 값을 요구
  key: "isDark",
  default: false,
});
