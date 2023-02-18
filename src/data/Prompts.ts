export const prompts = [
    "What's the best/worst idea you ever had?",
    "What's the best concept that never got made?",
    "Have you ever been really proud of your own work?",
    "Can you remember a time you felt like you had a breakthrough?",
    "What have you found touching or impactful lately?",
    "What season is it now? Does it raise memories for you?",
    "How has the weather affected your mood lately?",
    "How did you get around town as a child? Does anything evoke these memories for you?",
    "Tell me about something that you often eat/see/do and how it has changed over the years",
    "Tell me something you learned lately",
    "What's interesting you lately?",
    "Who has inspired you in your chosen fields of work or play?",
    "What's changed in your life in the last year?",
    "What's a dependable constant in your life?",
    "Do you feel in control or out of control? How do you feel about that?",
    "Choose a colour palette and tell me what it reminds you of. ",
    "Can you think of a time someone acted sacrificially toward you? Perhaps they took a risk or helped you in secret. ",
    "What's one habit or practice in your life that's a waste of time, that you should replace?",
    "Do you ever see people out in public and silently wish them well? Do you think anyone does that for you?",
    "What is the balance in your life of independence and codependency? Is independence all its cracked up to be?",
    "How does your family of origin affect the way you hold lasting relationships?",
    "How similar or different has your life been to that of your parents/guardians?",
    "What do you want to get out of your life?",
    "Is there a food that you used to dislike but you changed your mind?",
    "Tell me about some topic where you have changed your mind, or haven't made up your mind yet. ",
    "Tell me about something (a food, movie, music) that you've changed your mind about. ",
    "Do you have any collections? If not, what would you want to collect?",
    "What part of your life do you struggle to share with others or be open about?",
    "What's one thing you really like that's difficult to explain?",
    "What's one thing that other people seem to really like that's difficult to understand?",
    "Tell me about the people who you most love to hang out with. ",
    "Tell me about the times and situations that infuse you with energy. ",
    "What's the best environment you've ever been in for clear thinking?",
    "Are there people you aspire to be more like, and why?",
    "Tell me about something that you think has gotten better in your lifetime. ",
    "Tell me about a memorable journey ",
    "Tell me about a near miss",
    "Tell me about a memorable place you've spent the night",
    "Tell me about some wise advice that was shared with you",
    "If your life is a story, how did this current chapter start?",
    "Tell me something you've realised about yourself lately. ",
    "What have you overcome lately? Or what might you overcome soon?",
    "Try to explain an in-joke that you're fond of. ",
    "What is your vision for yourself for the future? What would your mission statement be?",
    "What's something that people (could) say to you that would make you feel the best?",
];

export const randomPrompt = (): string => {
    return randomFrom(prompts);
}

const randomFrom = (terms: string[]): string => {
    if (terms.length === 0)
        return "";

    try {
        const num: number = nextRandomInt(terms.length);
        return terms[num];
    }
    catch (ex) {
        throw new Error(`Failed to pick random prompt`);
    }
}

const nextRandomInt = (exclusiveMax: number): number => {
    return Math.floor(Math.random() * exclusiveMax);
}