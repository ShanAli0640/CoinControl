'use server';

import axios from 'axios';

const generateResponse = async (prompt: string) => {
    try {

        const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 150
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error fetching data from OpenAI:', error);
        return 'Sorry, rate limit exceeded. Please try again later!';
    }
};

export default generateResponse;
