import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
  const prompt = req.body;
  
  if (!prompt) {
    return new Error('There was an error with you text, try again!')
  }

  const chatResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 2048,
    temperature: 0.8,
  })

  const response =
    chatResponse.data.choices[0].text?.trim() || "I'm offline, try again later"
  res.status(200).json({ text: response })
}