"use client";
import { SignUpEmail } from "@/components/main/SignUpEmail";
import { SignUpPassword } from "@/components/main/SignUpPassword";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";


const Page = () => {
    const [step, setStep]= useState(0)

    const handleStep =() => {
        setStep((prev) => prev + 1)
    };
  return (
    <div>
      <div className="flex h-screen w-full">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-sm space-y-6">
            <Button
              variant="outline"
              size="icon"
              className="rounded-md w-9 h-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
              <p className="text-sm text-muted-foreground">
                Sign up to enjoy your favorite dishes.
              </p>
            </div> 

            {step===1 ? (<SignUpPassword/>) :( <SignUpEmail handleStep={handleStep}/>)}

            
          </div>
        </div>    
      </div>
    </div>
  );
};

export default Page; // <-- Зассан: Эхний үсгийг том болгов