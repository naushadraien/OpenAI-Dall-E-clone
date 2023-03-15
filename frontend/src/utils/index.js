import { surpriseMePrompts } from '../constants';

export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random() *
    surpriseMePrompts.length );
    const randomPrompt = surpriseMePrompts[randomIndex];

    //for checking if we obtain randomPrompt more than one time
    if( randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}