'use server';
/**
 * @fileOverview A flow to help teachers respond to student grievances by suggesting potential resolutions or feedback.
 *
 * - respondToGrievance - A function that handles the grievance response process.
 * - RespondToGrievanceInput - The input type for the respondToGrievance function.
 * - RespondToGrievanceOutput - The return type for the respondToGrievance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RespondToGrievanceInputSchema = z.object({
  studentAnswer: z
    .string()
    .describe('The answer provided by the student.'),
  modelAnswer: z.string().describe('The model answer to the question.'),
  rubric: z.string().describe('The grading rubric for the question.'),
  grievance: z.string().describe('The grievance submitted by the student.'),
});
export type RespondToGrievanceInput = z.infer<typeof RespondToGrievanceInputSchema>;

const RespondToGrievanceOutputSchema = z.object({
  suggestedResolution: z
    .string()
    .describe('A suggested resolution or feedback for the teacher to use in response to the student grievance.'),
});
export type RespondToGrievanceOutput = z.infer<typeof RespondToGrievanceOutputSchema>;

export async function respondToGrievance(input: RespondToGrievanceInput): Promise<RespondToGrievanceOutput> {
  return respondToGrievanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'respondToGrievancePrompt',
  input: {schema: RespondToGrievanceInputSchema},
  output: {schema: RespondToGrievanceOutputSchema},
  prompt: `You are an AI assistant helping a teacher respond to a student grievance regarding an exam question.

  Student Answer: {{{studentAnswer}}}
  Model Answer: {{{modelAnswer}}}
  Rubric: {{{rubric}}}
  Student Grievance: {{{grievance}}}

  Based on the student's answer, the model answer, the grading rubric, and the student's grievance, suggest a potential resolution or feedback that the teacher can use to respond to the student.
  Be concise and fair in your suggestion.
  `,
});

const respondToGrievanceFlow = ai.defineFlow(
  {
    name: 'respondToGrievanceFlow',
    inputSchema: RespondToGrievanceInputSchema,
    outputSchema: RespondToGrievanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
