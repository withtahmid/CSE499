import { QuestionSchema } from "../../models/Message";

export const newQuestionContext = (question: QuestionSchema, botResponse: string) => {
    const assistantcontext:{ sender: "Patient" | "Assistant"; text: string; } = { sender: "Assistant", text:  `${botResponse}`};
    assistantcontext.text += `\nA. ${question.answers[0]}`;
    assistantcontext.text += `\nB. ${question.answers[1]}`;
    assistantcontext.text += `\nC. ${question.answers[2]}`;
    assistantcontext.text += `\nD. ${question.answers[3]}\n`;
    return assistantcontext;
} 