import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    Text,
  } from "@chakra-ui/react";
  import { FC, useEffect } from "react";
import { FiVolume2 } from "react-icons/fi";
  import { useParams, useLocation, useNavigate } from "react-router-dom";
  
  const DailyWord: FC = () => {
    const navigate = useNavigate();
  
    const { day } = useParams();
  
    const { state } = useLocation();
    const { wordData }: { wordData: IWords } = state;
  
    useEffect(() => {
      if (!state) {
        navigate("/");
      }
  
      console.log(state);
    }, []);
  
    return (
      <Flex flexDir="column" maxW={768} mx="auto" minH="100vh">
        <Text fontSize={24} fontWeight="bold" textAlign="center" mt={8}>
          <Text display="inline-block" fontWeight="bold">
            Day {wordData.day}
          </Text>{" "}
          - {wordData.title}
        </Text>
        <Accordion mt={8} allowMultiple>
        {wordData.sentences.map((v, i) => (
          <AccordionItem key={i}>
            <h2>
              <AccordionButton>
              <Button
                variant="ghost"
                colorScheme="green"
                size="xs"
                mt={2}
                ml={2}
              >
                <FiVolume2 />
              </Button>
                <Box as="span" flex="1" textAlign="left">
                  {v.english}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{v.korean}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      </Flex>
    );
  };
  
  export default DailyWord;