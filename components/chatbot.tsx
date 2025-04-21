"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendHorizonal, Bot, User } from 'lucide-react';
import { useCurrentUser } from '@/hooks/use-current-user';
import Image from 'next/image';

export const ChatBot = () => {
  const user = useCurrentUser();
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([
    { text: "Hello! How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');
    
    // Simulate bot thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: getBotResponse(input), 
        sender: 'bot' 
      }]);
    }, 800);
  };

  const getBotResponse = (userInput: string) => {
    const inputLower = userInput.toLowerCase();
    
    if (inputLower.includes('hello') || inputLower.includes('hi')) {
      return "Hello there! How can I assist you today?";
    } else if (inputLower.includes('help')) {
      return "I'm here to help! What do you need assistance with?";
    } else if (inputLower.includes('thanks') || inputLower.includes('thank you')) {
      return "You're welcome! Is there anything else I can help with?";
    } else if (inputLower.includes('bye') || inputLower.includes('goodbye')) {
      return "Goodbye! Feel free to come back if you have more questions.";
    } else {
      return "I understand. How can I help you with that?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Improved scrolling behavior
  useEffect(() => {
    if (messagesEndRef.current && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div ref={chatRef} className="w-full max-w-[280px] xs:max-w-xs sm:max-w-md">
          <Card className="w-full h-[70vh] xs:h-[80vh] max-h-[500px] sm:max-h-[600px] flex flex-col shadow-xl  border-blue-200 rounded-b-lg">
            <CardHeader className="border-b text-black p-2 xs:p-2 sm:p-3 rounded-t-lg flex flex-row items-center">
            <div className="flex items-center space-x-5 flex-grow">
                <Image
                  height={50}
                  width={50}
                  src={"/Chatbot-Icon.png"}
                  className="h-9 w-9 sm:h-12 sm:w-12 "
                  alt={'chat'}
                />
                <h3 className="font-inter text-xs xs:text-sm sm:text-base">AI Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-6 w-6 xs:h-8 xs:w-8"
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea 
                ref={scrollAreaRef}
                className="h-full w-full p-1 xs:p-2 sm:p-4"
              >
                <div className="flex flex-col gap-2 xs:gap-3">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[90%] gap-1 xs:gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 mt-0.5">
                          {msg.sender === 'user' && user?.image ? (
                            <AvatarImage src={user.image} />
                          ) : null}
                     
                            {msg.sender === 'bot' ? (
                                <Image 
                                height={16}
                                width={30}
                                alt='chat'
                                src={"/Chatbot-Icon.png"} className="" />
                            ) : (
                              <AvatarFallback className={"bg-blue-600 text-white"}>
                              <User className="h-2 w-2 xs:h-3 xs:w-3 sm:h-4 sm:w-4" />
                              </AvatarFallback>

                            )}
                        </Avatar>
                        <div 
                          className={`p-1.5 xs:p-2 sm:p-3 rounded-lg text-xs xs:text-sm sm:text-base ${msg.sender === 'user' 
                            ? 'bg-gradient-to-r from-[#B8C9E5] to-[#B5D2FF] text-black rounded-br-none' 
                            : 'bg-gradient-to-r from-[#CCD7E9] to-[#DDDBE8] text-black rounded-bl-none'}`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            
            <CardFooter className="p-1 xs:p-2 sm:p-3 border-t border-blue-100 bg-white rounded-b-lg">
              <div className="flex w-full items-center gap-1 xs:gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyUp={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 foucs:border-none focus:ring-0 focus-visible:ring-0 border-none text-xs xs:text-sm shadow-none  bg-white sm:text-base h-8 xs:h-10 outline-none"
                />
                <Button
                  onClick={handleSend}
                  disabled={input.trim() === ''}
                  size="icon"
                  className="bg-white shadow-none hover:bg-white h-8 w-8 xs:h-10 xs:w-10"
                >
              <Image 
                    height={24}
                    width={50}
                    src={"/Icon.png"}
                     className="h-6 w-6 xs:h-8 xs:w-8 "
                      alt={'chat'} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-10 w-10 xs:h-12 xs:w-12 p-0 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <Bot className="text-white h-4 w-4 xs:h-6 xs:w-6" />
        </Button>
      )}
    </div>
  );
};