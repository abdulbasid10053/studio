"use client";

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Lightbulb, LocateFixed, Send } from "lucide-react";
import { getMenuSuggestions } from '@/app/actions';
import { Section } from "./section";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  message: "",
  suggestions: [] as string[],
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="rounded-r-full" aria-label="Get suggestions">
      {pending ? (
        <span className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
      ) : (
        <Send className="w-5 h-5" />
      )}
    </Button>
  );
}

export function AiMenuSuggest() {
  const [state, formAction] = useFormState(getMenuSuggestions, initialState);
  const [timeOfDay, setTimeOfDay] = useState('');
  const [location, setLocation] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setTimeOfDay(`${hours}:${minutes}`);
  }, []);
  
  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
    if (state.message === 'Success') {
      setLocation('');
    }
  }, [state, toast]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocation('My current location');
          toast({
             title: "Location detected",
             description: "Using your current location for suggestions.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Could not get your location. Please type it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Unsupported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <Section
      id="ai-suggest"
      pill="AI Assistant"
      title="Bingung mau pesan apa?"
    >
      <Card className="bg-gradient-to-br from-card to-card/60 border-primary/20">
        <CardContent className="p-6">
          <p className="mb-4 text-foreground/80">
            Biar AI kami bantu! Beritahu lokasimu, dan kami akan berikan rekomendasi menu yang pas.
          </p>
          <form ref={formRef} action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="timeOfDay" value={timeOfDay} />
            <div className="flex items-center">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  name="location"
                  placeholder="e.g., dekat alun-alun"
                  className="rounded-l-full pr-12 h-12"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full"
                  onClick={handleGetLocation}
                  aria-label="Use my current location"
                >
                  <LocateFixed className="w-5 h-5" />
                </Button>
              </div>
              <SubmitButton />
            </div>
          </form>

          {state.suggestions && state.suggestions.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Rekomendasi untukmu:
              </h4>
              <ul className="list-disc list-inside space-y-2 pl-2">
                {state.suggestions.map((item, index) => (
                  <li key={index} className="text-foreground/90">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </Section>
  );
}
