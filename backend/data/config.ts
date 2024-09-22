export const initialGreeting = `Hi there! I'm here to help you assess your current mental health using the Beck's Depression Inventory. I'll ask you 21 questions to help you gain insights into your current well-being. I will also provide 4 options to choose to. To answer the questions you can type the options A, B, C, D or you can answer in your own suitable words. Are you ready?`;

const initialGreetings:string[] = [
    "Hello! I'm here to assist you in assessing your mental health using the Beck's Depression Inventory. I will guide you through 21 questions designed to help you reflect on your current well-being. For each question, you’ll be given four answer choices. You can either type the corresponding option (A, B, C, or D) or respond in your own words, whichever feels right to you. Shall we begin?",

    "Welcome! I’m here to help you evaluate your mental health with the Beck's Depression Inventory. I'll present you with 21 questions, each aimed at offering insights into how you're feeling at the moment. You’ll have four options to choose from, and you can either select A, B, C, or D, or share a response in your own words if you prefer. Are you ready to start?",

    "Good day! I'm here to guide you through an assessment of your mental health using the Beck's Depression Inventory. You will be asked 21 questions, with four response options for each. You may choose an option by typing A, B, C, or D, or if you wish, you can answer in your own words. Shall we begin?",

    "Hello! I’m here to support you in assessing your mental health with the Beck's Depression Inventory. We’ll go through 21 questions, designed to give you a clearer understanding of your well-being. Each question will have four options, and you can respond by selecting A, B, C, or D, or feel free to share your own words. Are you ready to get started?",

    "Greetings! I’m here to help you evaluate your current mental health using the Beck's Depression Inventory. Together, we’ll go through 21 questions aimed at giving you insights into your well-being. For each, you’ll have four options to choose from, and you can select A, B, C, or D, or provide a response in your own words. Shall we proceed?"

];

export const getInitialGreeting = ():string => {
    return initialGreetings[Math.floor(Math.random() * initialGreetings.length)];
}