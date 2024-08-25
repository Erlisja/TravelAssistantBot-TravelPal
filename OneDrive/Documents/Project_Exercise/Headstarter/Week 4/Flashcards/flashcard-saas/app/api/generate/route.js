import { NextResponse } from 'next/server';
import g4f from 'g4f';

export async function POST(req) {
  try {
    const { text } = await req.json(); // Ensure you are parsing the request body
    const response = await g4f.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a flashcard creator...' },
        { role: 'user', content: text },
      ],
    });

    const flashcards = JSON.parse(response.choices[0].message.content);
    return NextResponse.json(flashcards);
  } catch (error) {
    return NextResponse.json({ error: { message: error.message } }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import g4f from 'g4f';

// const systemPrompt = `
// You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
// Both front and back should be one sentence long.
// You should return in the following JSON format:
// {
//   "flashcards":[
//     {
//       "front": "Front of the card",
//       "back": "Back of the card"
//     }
//   ]
// }
// `;

// export async function POST(req) {
//   try {
//     const data = await req.text();

//     // Using g4f client for the request
//     const client = new g4f.Client();
//     const response = await client.chat.completions.create({
//       model: "gpt-4o",  // or another model you prefer
//       messages: [
//         { role: 'system', content: systemPrompt },
//         { role: 'user', content: data },
//       ],
//     });

//     // Parse the JSON response from g4f
//     const flashcards = JSON.parse(response.choices[0].message.content);

//     // Return the flashcards as a JSON response
//     return NextResponse.json(flashcards.flashcards);
//   } catch (error) {
//     console.error('Error generating flashcards:', error);
//     return NextResponse.json({ error: { message: error.message } }, { status: 500 });
//   }
// }
