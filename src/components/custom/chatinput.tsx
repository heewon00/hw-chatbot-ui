import { Textarea } from "../ui/textarea";
import { cx } from 'classix';
import { Button } from "../ui/button";
import { ArrowUpIcon } from "./icons"
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ChatInputProps {
    question: string;
    setQuestion: (question: string) => void;
    onSubmit: (text?: string) => void;
    isLoading: boolean;
}

const suggestedActions = [
    {
        title: 'Application Gateway에 대해 설명해줘',
        label: 'Azure Migration Factory',
        action: 'Application Gateway에 대해 설명해줘',
    },
    {
        title: '마이그레이션 단계 계획에 대해 설명해줘',
        label: 'Azure Migration Factory',
        action: '마이그레이션 단계 계획에 대해 설명해줘',
    },
];

export const ChatInput = ({ question, setQuestion, onSubmit, isLoading }: ChatInputProps) => {
    const [showSuggestions, setShowSuggestions] = useState(true);

    return(
    <div className="relative w-full flex flex-col gap-4">
        {showSuggestions && (
            <div className="hidden md:grid sm:grid-cols-2 gap-2 w-full">
                {suggestedActions.map((suggestedAction, index) => (
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.05 * index }}
                    key={index}
                    className={index > 1 ? 'hidden sm:block' : 'block'}
                    >
                        <Button
                            variant="ghost"
                            onClick={ () => {
                                const text = suggestedAction.action;
                                onSubmit(text);
                                setShowSuggestions(false);
                            }}
                            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
                        >
                            <span className="font-medium">{suggestedAction.title}</span>
                            <span className="text-muted-foreground">
                            {suggestedAction.label}
                            </span>
                        </Button>
                    </motion.div>
                ))}
            </div>
        )}
        <input
        type="file"
        className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
        multiple
        tabIndex={-1}
        />

        <div className="relative">
          <Textarea
          placeholder="여기에 질문할 내용을 입력해주세요..."
          className={cx(
              'min-h-[24px] max-h-[120px] resize-none rounded-xl text-base bg-muted overflow-y-auto',
          )}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();

                  if (isLoading) {
                      toast.error('Please wait for the model to finish its response!');
                  } else {
                      setShowSuggestions(false);
                      onSubmit();
                  }
              }
          }}
          rows={4}
          autoFocus
          />

          <Button 
              className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 border dark:border-zinc-600"
              onClick={() => onSubmit(question)}
              disabled={question.length === 0}
          >
              <ArrowUpIcon size={14} />
          </Button>
        </div>
    </div>
    );
}