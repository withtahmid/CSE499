import express from 'express';
import llm from '../LLM/llm-api.js';

const router = express.Router();
router.post('/', async(req, res) => {
    const { userText } = req.body;
    if(!userText){
        return res.json({
            success:false,
            msg: `'userText' is required in the request body.`
        })
    }
    const response = await llm.chat(userText);
    return res.json({
        success: true,
        msg: response,
    })

});
export default router;
