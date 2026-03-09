import React, { useState } from 'react';
import { Plus, Mic, ArrowRight, Paperclip, FileIcon, X } from 'lucide-react';

export const AIPortal: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Title / Heading */}
            <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight text-center">
                Olá, Ervino. Como posso ajudar o Jurídico hoje?
            </h1>
            <p className="text-muted-foreground mb-12 text-center max-w-xl">
                Solicite revisões de contrato, denuncie irregularidades ou peça análise de documentos SP Regula.
            </p>

            {/* Main AI Interaction Portal */}
            <div className="w-full max-w-3xl bg-[#0F0F0F]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transition-all hover:bg-[#0F0F0F]/70">

                {/* File Preview Area */}
                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 animate-in zoom-in-95 duration-300">
                        {files.map((file, i) => (
                            <div key={i} className="group relative flex items-center gap-2 bg-muted/50 border border-white/10 px-3 py-2 rounded-xl">
                                <FileIcon className="w-4 h-4 text-primary" />
                                <span className="text-xs font-medium truncate max-w-[120px]">{file.name}</span>
                                <button
                                    onClick={() => removeFile(i)}
                                    className="p-1 rounded-full hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Prompt Input Box */}
                <div className="flex flex-col gap-4">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Pergunte qualquer coisa, mencione processos com @ ou acesse /workflows..."
                        className="w-full bg-transparent border-none focus:ring-0 text-lg resize-none min-h-[120px] placeholder:text-muted-foreground/50 selection:bg-primary/30"
                    />

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                            {/* Attachment Picker */}
                            <label
                                htmlFor="file-upload"
                                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground transition-all cursor-pointer border border-white/5 hover:border-white/10 transform active:scale-95"
                            >
                                <Plus className="w-5 h-5" />
                                <input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .jpg, .jpeg, .png, .mov, .mp4, .mp3, .wav"
                                />
                            </label>

                            {/* Model Selectors (Simulated UI) */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-[11px] font-bold text-muted-foreground border border-white/5">
                                <span className="text-primary">Fast</span>
                                <div className="w-px h-3 bg-white/10" />
                                <span className="text-white/80">Gemini 3.1 Pro High</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground transition-all border border-white/5">
                                <Mic className="w-5 h-5" />
                            </button>
                            <button
                                className={`p-2.5 rounded-full transition-all transform active:scale-95 ${prompt.length > 0 || files.length > 0
                                        ? 'bg-[#39FF14] text-black shadow-[0_0_20px_rgba(57,255,20,0.4)]'
                                        : 'bg-white/5 text-muted-foreground/30'
                                    }`}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggestion Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                {['Analisar Edital SP Regula', 'Prorrogação de Contrato #322', 'Denúncia de Compliance', 'Revisar Cláusula de Rescisão'].map(suggestion => (
                    <button
                        key={suggestion}
                        className="px-4 py-2 rounded-full bg-muted/30 border border-white/5 text-sm text-muted-foreground hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all active:scale-95"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        </div>
    );
};
