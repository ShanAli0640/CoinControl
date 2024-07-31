'use client';

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import generateResponse from '@/lib/actions/openai.actions';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

interface Message {
    from: 'bot' | 'user';
    text: string;
}
interface MessageProps {
    from: 'bot' | 'user';
}

const FinancialHelp = () => {
    const [loggedIn, setLoggedIn] = useState<any>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [messages, setMessages] = useState<Message[]>([
        { from: 'bot', text: 'Hello! How can I assist you with your financial queries today?' }
    ]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getLoggedInUser();
                setLoggedIn(user);

                if (user) {
                    const accountList = await getAccounts({ userId: user.$id });
                    setAccounts(accountList);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSend = async () => {
        if (inputValue.trim()) {
            const userMessage: Message = { from: 'user', text: inputValue };

            setMessages(prevMessages => [
                ...prevMessages,
                userMessage
            ]);

            setInputValue('');

            try {
                const botResponse = await generateResponse(inputValue);

                setMessages(prevMessages => [
                    ...prevMessages,
                    { from: 'bot', text: botResponse }
                ]);
            } catch (error) {
                console.error('Error generating response:', error);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { from: 'bot', text: 'Sorry, I encountered an error. Please try again later. Rate Limit Exceeded' }
                ]);
            }
        }
    };

    return (
        <ChatContainer>
            <ChatBox>
                <MessageBox>
                    {messages.map((msg, index) => (
                        <Message key={index} from={msg.from}>
                            {msg.text}
                        </Message>
                    ))}
                </MessageBox>
                <InputBox>
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message here..."
                    />
                    <SendButton onClick={handleSend}>Send</SendButton>
                </InputBox>
            </ChatBox>
        </ChatContainer>
    );
};

export default FinancialHelp;

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #f4f4f9;
    box-sizing: border-box;
`;

const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    box-sizing: border-box;
`;

const MessageBox = styled.div`
    flex-grow: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

const Message = styled.div<MessageProps>`
    margin-bottom: 12px;
    padding: 8px 12px;
    border-radius: 20px;
    background-color: ${props => (props.from === 'bot' ? '#e1f3fb' : '#daf8cb')};
    align-self: ${props => (props.from === 'bot' ? 'flex-start' : 'flex-end')};
    max-width: 75%;
    word-wrap: break-word;
    box-sizing: border-box;
`;

const InputBox = styled.div`
    display: flex;
    padding: 16px;
    border-top: 1px solid #ccc;
    background-color: #fff;
    box-sizing: border-box;
`;

const Input = styled.input`
    flex-grow: 1;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-right: 8px;
    box-sizing: border-box;
`;

const SendButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    min-width: 80px; /* Ensure the button has a minimum width */
    box-sizing: border-box;
`;
