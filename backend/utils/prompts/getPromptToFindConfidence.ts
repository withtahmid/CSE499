export const getPromptToFindConfidence = (history: string) => {
    const prompt =
    `
    Prompt:
    You are a mental health assistant conducting a conversation with a patient, asking them questions from the Beck Depression Inventory (BDI).
    Below is a conversation between you as 'Assistant' and the patient as 'Patient'. At first you have asked the patiest a question and given 4 possible answers and they are 'A', 'B', 'C', 'D'. 

    Conversation History: 
    ${history}\n\n

    Your task is to score the all four answers 'A', 'B', 'C', 'D' between 0 an 1 according to how much the answer matches with patient's responses in the conversation.

    The output should be plain JSON string contaning JavaScript Array of number of size four containig values between 0 and 1 reflecting match score of the patient's response with ['A', 'B', 'C', 'D'].

    Instruction: 
    for index 0:  give score between 0 and 1 for reflecting match score of the patient's response with Option 'A'.
    for index 1:  give score between 0 and 1 for reflecting match score of the patient's response with Option 'B'.
    for index 2:  give score between 0 and 1 for reflecting match score of the patient's response with Option 'C'.
    for index 3:  give score between 0 and 1 for reflecting match score of the patient's response with Option 'D'.

    give every index '0' if you think the patient's response does not reflect any of the options 'A', 'B', 'C', 'D'.

    examples_1 : { "scores": [ 1, 0, 0, 0] } // confident about option 'A'
    examples_2 : { "scores": [ 0, 1, 0, 0] } // confident about option 'B'
    examples_3 : { "scores": [ 0, 0, 1, 0] } // confident about option 'C'
    examples_4 : { "scores": [ 0, 0, 0, 1] } // confident about option 'D'
    examples_7 : { "scores": [ 0, 0, 0, 0] } // not relevent with any of the options
    
    The array should be a probability distribution. Summation of four indexes should be 1.hateful

    Output a plain JSON string without any quotes or any extra characters. Your response will be evaluated by the following JavaScript Code: "
        const json = JSON.parse(response);
        const scores: number[] = json["scores"];
    `
    return prompt;
}