import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || ""
);

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const tone =
      typeof body.tone === "string"
        ? body.tone
        : "Professional";

    const length =
      typeof body.length === "string"
        ? body.length
        : "Medium";

    const instruction =
      typeof body.instruction === "string"
        ? body.instruction.trim()
        : "";

    if (!email) {
      return NextResponse.json(
        {
          error:
            "Please provide an email to reply to.",
        },
        { status: 400 }
      );
    }

    if (email.length > 20000) {
      return NextResponse.json(
        {
          error:
            "Email is too long. Please keep it under 20,000 characters.",
        },
        { status: 400 }
      );
    }

    console.log(
      "Generating email reply:",
      {
        tone,
        length,
        emailLength: email.length,
      }
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
You are an expert professional email assistant.

Your job is to write a natural, useful and ready-to-send reply to the email below.

IMPORTANT RULES:
- Do not mention that you are an AI.
- Do not explain your reasoning.
- Do not add unnecessary commentary.
- Do not invent facts, dates, promises or information.
- Understand the context of the received email before replying.
- Keep the reply natural and human.
- Match the requested tone.
- Make the response grammatically correct.
- Return ONLY the email reply.
- Do not wrap the response in quotation marks.
- Do not use markdown code blocks.

TONE:
${tone}

REPLY LENGTH:
${length}

ADDITIONAL USER INSTRUCTION:
${instruction || "No additional instruction provided."}

RECEIVED EMAIL:
${email}

Now write the best possible reply.
`;

    const result =
      await model.generateContent(prompt);

    const response =
      result.response;

    const text =
      response.text()?.trim();

    if (!text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    console.log(
      "Email reply generated successfully."
    );

    return NextResponse.json({
      success: true,
      reply: text,
    });
  } catch (error) {
    console.error(
      "EMAIL REPLY GENERATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate email reply.",
      },
      { status: 500 }
    );
  }
}