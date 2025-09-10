import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, CheckCircle } from "lucide-react";
import { useState } from "react";
const ChatInterface = () => {
  const [inputValue, setInputValue] = useState("What's the best way to visualise the results?");
  const messages = [{
    type: "assistant" as const,
    content: "It seems you are comparing two independent groups (patients taking Drug A vs. Drug B) on a continuous variable (blood pressure).\n\nDo your data meet the assumptions of normality?"
  }, {
    type: "user" as const,
    content: "I'm not sure. How can I check that?"
  }, {
    type: "assistant" as const,
    content: <div className="space-y-3">
          <p>I can run a normality test for you. I'll run <strong>Shapiro-Wilk test</strong> in this case</p>
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-start space-x-2 mb-2">
              <span>Running the Shapiro-Wilk test...</span>
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Results:</strong> p = 0.08 (Drug A), p = 0.02 (Drug B). Since the p-value for Drug B is below 0.05, its distribution is not normal.
            </p>
          </div>
          <p>Since normality is violated in one group, I recommend using the <strong>Mann-Whitney U test</strong> instead of an independent t-test.</p>
          <p>Would you like me to proceed?</p>
        </div>
  }, {
    type: "user" as const,
    content: "Yes, please"
  }];
  return <div className="flex-1 flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((message, index) => <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-2xl p-4 ${message.type === 'user' ? 'bg-dataminder-accent/10 border-dataminder-accent/20' : 'bg-card border-border'}`}>
              <div className="text-sm leading-relaxed">
                {typeof message.content === 'string' ? <div className="whitespace-pre-wrap">{message.content}</div> : message.content}
              </div>
            </Card>
          </div>)}
      </div>

      {/* Input Area */}
      
    </div>;
};
export default ChatInterface;