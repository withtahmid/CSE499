import express from 'express';
import llm from '../LLM/llm-api.js';
import LangChain  from '../LangChain/langChain.js';

const langChain = new LangChain();

const router = express.Router();
router.post('/', async(req, res) => {
    const { userText } = req.body;
    langChain.add_user_response(userText);
    // const response = await llm.chat(userText);
    // langChain.add_AI_response(response);
    const response = await llm.executePrompt(langChain.getPrompt());

    langChain.add_AI_response(response)

    return res.json({
        success: true,
        msg: response,
    })

});
export default router;
