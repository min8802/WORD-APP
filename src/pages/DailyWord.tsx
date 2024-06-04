import {Accordion, Flex, Text} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WordCard from "../components/WordCard";
  
    //let abc = null;
    //let def = abc ?? "def";
    ///abc에 값이 없으면 뒤의 "def"를 쓰겠다는 의미 ??앞에 값이 없으면 뒤의 값 쓰겠다 !
    ///{wordData} = state 는 구조분해여서 wordData이름 바꿀 수 없어
    ///근데 wordData2222 = state.wordData 라는식으로 코드 쓰게되면 앞에 변수명 수정이 가능

  const DailyWord: FC = () => {
    const navigate = useNavigate();
  
    const { state } = useLocation();
  
    useEffect(() => {
      if (!state) {
        navigate("/");
      }
  
      console.log(state);
    }, []);
  
    if (!state) return <div>Loading...</div>;
  
    return (
      <Flex flexDir="column" maxW={768} mx="auto" minH="100vh">
        <Flex fontSize={24} fontWeight="bold" textAlign="center" mt={8} justify="center">
          <Text fontWeight="bold">
            Day {state.wordData.day}
          </Text>{" "}
          - {state.wordData.title}
        </Flex>
        <Accordion mt={8} allowMultiple>
          {state.wordData.sentences.map((v: ISentence, i:number) => (
            <WordCard sentence={v} key={i}/>
          ))}
        </Accordion>
      </Flex>
    );
  };
  
  export default DailyWord;