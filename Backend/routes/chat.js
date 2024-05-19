import express from 'express';
import LLM from '../LLM/llm-api.js';
import LangChain  from '../LangChain/langChain.js';

const langChain = new LangChain();

const router = express.Router();
router.post('/', async(req, res) => {
    const { userText } = req.body;
    

    const response = await LLM.executePrompt(langChain.getPrompt());
    
    return res.json({
        success: true,
        msg: response,
    })

});
export default router;
