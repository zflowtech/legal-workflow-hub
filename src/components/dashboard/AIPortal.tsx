import React, { useState, useEffect, useRef } from 'react';
import { Plus, Mic, ArrowRight, Paperclip, FileIcon, X, Bot, User } from 'lucide-react';

interface Message {
    role: 'assistant' | 'user';
    content: string;
    suggestions?: string[];
}

export const AIPortal: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Bem-vindo ao Chat do Jurídico. Como posso ajudar com sua demanda hoje?',
            suggestions: ['Analisar Edital SP Regula', 'Denúncia de Compliance', 'Revisar Contrato']
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (content: string) => {
        if (!content.trim() && files.length === 0) return;

        const newUserMessage: Message = { role: 'user', content: content || "Arquivo(s) enviado(s)" };
        setMessages(prev => [...prev, newUserMessage]);
        setPrompt('');
        setFiles([]);

        // Simulating context-aware hybrid response
        setTimeout(() => {
            let response: Message = {
                role: 'assistant',
                content: 'Entendido. Estou processando sua solicitação. Gostaria de detalhar algum ponto específico ou prefere que eu gere um relatório preliminar?',
                suggestions: ['Gerar Relatório', 'Adicionar Detalhes', 'Falar com Advogado']
            };

            if (content.toLowerCase().includes('regula')) {
                response = {
                    role: 'assistant',
                    content: 'Identifiquei que se trata de um tema SP Regula. Localizei 3 obrigações contratuais relacionadas. Qual o próximo passo?',
                    suggestions: ['Ver Obrigações', 'Rascunhar Defesa', 'Anexar Aditivo']
                };
            }

            setMessages(prev => [...prev, response]);
        }, 1000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto px-4 py-8">
            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto space-y-6 mb-6 scrollbar-hide pr-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>
                        )}
                        <div className={`max-w-[80%] space-y-3`}>
                            <div className={`p-4 rounded-2xl border ${msg.role === 'assistant'
                                ? 'bg-muted/30 border-white/5 text-foreground'
                                : 'bg-primary text-black font-medium border-primary/20'
                                }`}>
                                {msg.content}
                            </div>

                            {/* Contextual Suggestions */}
                            {msg.role === 'assistant' && msg.suggestions && (
                                <div className="flex flex-wrap gap-2">
                                    {msg.suggestions.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => handleSendMessage(s)}
                                            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all active:scale-95"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                                <User className="w-5 h-5 text-black" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input UI */}
            <div className="w-full bg-[#0F0F0F]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl">
                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {files.map((file, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                                <FileIcon className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[10px] truncate max-w-[100px]">{file.name}</span>
                                <button onClick={() => removeFile(i)} className="p-0.5 hover:text-destructive"><X className="w-3 h-3" /></button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage(prompt);
                            }
                        }}
                        placeholder="Digite sua dúvida jurídica ou anexe arquivos..."
                        className="w-full bg-transparent border-none focus:ring-0 text-md resize-none min-h-[60px] max-h-[200px] placeholder:text-muted-foreground/30"
                    />

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                        <div className="flex items-center gap-2">
                            <label htmlFor="file-upload" className="p-2 rounded-full hover:bg-white/5 text-muted-foreground transition-all cursor-pointer border border-transparent hover:border-white/5">
                                <Plus className="w-5 h-5" />
                                <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                            </label>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-muted-foreground border border-white/5">
                                <span className="text-primary text-[8px] uppercase tracking-widest">Active</span>
                                <div className="w-px h-2 bg-white/10" />
                                <span>Gemini 3.1 Pro High</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full hover:bg-white/5 text-muted-foreground transition-all">
                                <Mic className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleSendMessage(prompt)}
                                className={`p-2.5 rounded-full transition-all transform active:scale-95 ${prompt.length > 0 || files.length > 0
                                    ? 'bg-primary text-black'
                                    : 'bg-white/5 text-muted-foreground/20'
                                    }`}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
