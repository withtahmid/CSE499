import { QuestionSchema } from "../../models/Message";

export const getPromtToAnalyzeUserRespnse = (history: string) => {
const prompt =`
        Prompt:
        You are a mental health assistant conducting a conversation with a patient, asking them questions from the Beck Depression Inventory (BDI).
        Below is a conversation between you as 'Assistant' and the patient as 'Patient'. At first you have asked the patiest a question and given 4 possible answers and they are 'A', 'B', 'C', 'D'. 

        Conversation History: 
        ${history}\n\n

        Follow these conditions:

        The match does not have to be word-for-word, but patient's responses should reflect the to meaning to the provided answers 'A', 'B', 'C', 'D'.

        Condition 1: If none of the answers from first message of 'Assistant' is answered by the patient, respond by a character 'X'.
        Condition 1: If multiple answers from first message of 'Assistant' is answered by the patient, respond by a character 'X'.
        Condition 2: If only one confident match is found, reply with the corresponding character of the answer ('A', 'B', 'C', 'D').

        Make sure your response will either be one of the character 'A', 'B', 'C', or 'D', or 'X' in case none of the answer is matched.

        Your response will be evaluated by the following JavaScript Code: "
            if(response === "A" || response === "B" || response === "C" || response === "D"){
                answerFound(response);
            }else if(response === "X"){
                answerNotFound(response);
            }else{
                //unexpected response
                throw new Error();
            }
        "
        The match does not have to be word-for-word. but patient's responses meaning should be closer to the provided answers 'A', 'B', 'C', 'D'.
        
        examples_1 : A // confident about option 'A'
        examples_2 : B // confident about option 'B'
        examples_3 : C // confident about option 'C'
        examples_4 : D // confident about option 'D'
        examples_5 : X // confused between option 'A' and 'B'
        examples_6 : X // confused between option 'B' and 'D'
        examples_7 : X // not relevent with any of the options

        Output:
        Response must be just one character 'A', 'B', 'C', or 'D', or 'X' without any special character or quotation.

        `
    return prompt;
}