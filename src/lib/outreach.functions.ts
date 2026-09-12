import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

const InputSchema = z.object({
  sourceType: z.string(),
  sourceTitle: z.string(),
  sourceDetails: z.string(),
  audience: z.string(),
  tone: z.string(),
});

export type OutreachResult = {
  social: string;
  press: string;
  newsletter: string;
};

function section(text: string, start: string, end?: string): string {
  const startIndex = text.indexOf(start);
  if (startIndex === -1) return "";
  const from = startIndex + start.length;
  const to = end ? text.indexOf(end, from) : -1;
  return text.slice(from, to === -1 ? undefined : to).trim();
}

export const generateOutreach = createServerFn({ method: "POST" })
  .validator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<OutreachResult> => {
    const apiKey = process.env["OPENAI_API_KEY"];
    if (!apiKey)
      throw new Error(
        "AI is not configured. Add OPENAI_API_KEY to your local env file.",
      );
    const openai = createOpenAI({ apiKey });

    const prompt = `You write public communication material for a national polar research institute.

SOURCE TYPE: ${data.sourceType}
TITLE: ${data.sourceTitle}
DETAILS:
${data.sourceDetails}

AUDIENCE: ${data.audience}
TONE: ${data.tone}

Write outreach copy grounded strictly in the details above. Never invent numbers, names, dates or findings that are not given. Use British English.

Return exactly this structure, with these literal headings and nothing before or after:

[SOCIAL]
Three separate social media posts, each on its own line, each under 280 characters, each ending with two or three relevant hashtags.

[PRESS]
A press note of 120 to 160 words with a short headline on the first line.

[NEWSLETTER]
A single newsletter paragraph of 80 to 110 words.`;

    const result = streamText({
      model: openai("gpt-4o-mini"),
      prompt,
    });

    const text = await result.text;

    return {
      social: section(text, "[SOCIAL]", "[PRESS]") || text.trim(),
      press: section(text, "[PRESS]", "[NEWSLETTER]"),
      newsletter: section(text, "[NEWSLETTER]"),
    };
  });
