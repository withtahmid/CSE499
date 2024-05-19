from dotenv import load_dotenv
load_dotenv()

import os
import google.generativeai as genai

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

model = genai.GenerativeModel("gemini-pro")

prompt = f"From now on you will act as a mental heath support assistant and response as a human. Furthur messages will come from an user. You will try to get answers of 'Beck Depression Inventory' to examine the users depression level. Do not mention you are using 'Beck Depression Inventory'. Your response must be focused on getting the 'Beck Depression Inventory'. You must not change conversation topic."

def newConversationChain():
    conversationChain = model.start_chat(history = [
        {
            'role': 'user',
            'parts': [prompt]
        },
        {
            'role': 'model',
            'parts': ['Hi! I am here to listen you and will try to understand your state of mind.'],
        },
    ])
    return conversationChain

def nextResponse(conversationChain, userText):
    response = conversationChain.send_message(userText)
    return response

