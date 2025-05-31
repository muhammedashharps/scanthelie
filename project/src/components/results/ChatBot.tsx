import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageCircle } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import { ScanResult } from '../../types/types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  scanResult: ScanResult;
  apiKey: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ scanResult, apiKey }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Add initial welcome message with better formatting
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        text: `👋 Welcome! I'm your AI Product Assistant for ${scanResult.productName}.

I can help you understand:
• Ingredients and their safety
• Nutritional information
• Health claims and verification
• Overall health score
• Any other product-related questions

Feel free to ask me anything!`,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, [scanResult.productName]);

  const generateResponse = async (userMessage: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a concise product analysis assistant focused ONLY on analyzing food and beverage products. Your domain is strictly limited to:
- Ingredients analysis
- Nutritional information
- Health claims verification
- Product safety
- Allergens
- Food regulations
- Product composition

Product Information:
${JSON.stringify(scanResult, null, 2)}

Guidelines:
- Keep responses under 3 sentences when possible
- Use bullet points for lists
- Focus on facts, not opinions
- Include numbers and specifics when available
- No disclaimers unless critical for health/safety
- Be direct and clear

IMPORTANT: If the user asks about anything unrelated to food product analysis (e.g., general chat, personal advice, cooking recipes, other topics), respond ONLY with:
"I can only help with questions about this product's ingredients, nutrition, and health claims. Please ask something specific about the product."

User Question: ${userMessage}

Remember: Be brief, specific, and informative. Stay within the product analysis domain.`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 512,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      let responseText = data.candidates[0].content.parts[0].text;
      
      // Filter out asterisks and clean up the response
      responseText = responseText
        .replace(/\*/g, '•') // Replace asterisks with bullet points
        .replace(/\n\s*\n/g, '\n') // Remove extra blank lines
        .trim(); // Remove extra whitespace

      return responseText;
    } catch (error) {
      console.error('Error generating response:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const botResponse = await generateResponse(userMessage.text);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-200 flex items-center gap-2 ${
          isOpen ? 'hidden' : ''
        }`}
      >
        <MessageCircle size={24} />
        <span className="font-medium">Ask AI Assistant</span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[400px] z-50 transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg shadow-xl h-[600px] relative flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 border-b bg-white rounded-t-lg">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Bot className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Product Assistant</h3>
                  <p className="text-xs text-gray-500">Ask me anything about the product</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div 
            ref={chatContainerRef}
            className="absolute top-[73px] bottom-[76px] left-0 right-0 overflow-y-auto"
          >
            <div className="flex flex-col gap-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`relative max-w-[85%] p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary-500 text-white ml-12'
                        : 'bg-gray-100 text-gray-900 mr-12'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="absolute left-0 top-0 -translate-x-[40px] translate-y-1">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Bot size={16} className="text-primary-500" />
                        </div>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.text}
                    </div>
                    <div
                      className={`text-[10px] mt-1 ${
                        message.sender === 'user' ? 'text-white/75' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="relative bg-gray-100 text-gray-900 p-4 rounded-2xl mr-12">
                    <div className="absolute left-0 top-0 -translate-x-[40px] translate-y-1">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Bot size={16} className="text-primary-500" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 border-t bg-white rounded-b-lg">
            <div className="p-4">
              <div className="flex gap-2">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question here..."
                  className="flex-1 resize-none border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  rows={1}
                  style={{
                    minHeight: '44px',
                    maxHeight: '120px',
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                  className="h-[44px] rounded-xl"
                >
                  <Send size={16} className="mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot; 