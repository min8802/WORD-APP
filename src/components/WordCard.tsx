import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button } from "@chakra-ui/react";
import axios from "axios";
import { FC } from "react";
import { FiVolume2 } from "react-icons/fi";

interface WordCardProps {
    sentence: ISentence;
}

const WordCard:FC<WordCardProps> = ({sentence}) => {

    const onClickAudio = async () => {
        try {
          const response = await axios.post(
            `https://texttospeech.googleapis.com/v1/text:synthesize?key=${import.meta.env.VITE_API_KEY}`,
            {
              input: {
                text: sentence.english,
              },
              voice: {
                languageCode: "en-US",
                ssmlGender: "NEUTRAL",
              },
              audioConfig: {
                audioEncoding: "MP3",
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          
          const binaryData = atob(response.data.audioContent);
          const byteArray = new Uint8Array(binaryData.length);
          //바로 위 코드는 new니까 binaryData 아까 외계어 나온거 그 길이만큼 새로운 배열을 하나 만들어 주는 코드임
          
          for (let i = 0; i < byteArray.length; i++){
            byteArray[i] = binaryData.charCodeAt(i);
          }
          //데이터 하나하나를 array크기에 맞게 array에 값을 넣어준다

          const blob = new Blob([byteArray.buffer], { type: "audio/mp3" });
          const newAudio = new Audio(URL.createObjectURL(blob));

          document.body.appendChild(newAudio);
          newAudio.play()
          console.log(newAudio);
          
          console.log(blob);

          console.log(response);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {sentence.english}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <Button
                  variant="ghost"
                  colorScheme="green"
                  size="sm"
                  mb={2}
                  ml={2}
                  onClick={onClickAudio}
                >
                  <FiVolume2 />
                </Button>
              </h2>
              <AccordionPanel pb={4}>{sentence.korean}</AccordionPanel>
            </AccordionItem>
    );
};

export default WordCard;