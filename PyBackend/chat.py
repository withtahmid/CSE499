
from LLM import newConversationChain, nextResponse

conversationChain = None

def processUserText(userText:str)->dict:
    try:
        global conversationChain
        
        if conversationChain is None:
            conversationChain = newConversationChain()

        response = nextResponse(conversationChain = conversationChain, userText = userText)
        textResponse = response.text
        
        return {
            "success": True,
            "msg": "Successfully executed",
            "response": textResponse
        }
    
    except Exception as e:
        return {
            "success": False,
            "msg": f"Failed to executeText. Error: {str(e)}"
        }