const { SlashCommandBuilder } = require("discord.js");
const{ Configuration, OpenAIApi } = require("openai");
const{ openAiKey } = require("../config.json");


const configuration = new Configuration({
  apiKey: openAiKey,
});
const openai = new OpenAIApi(configuration);
const response = await openai.retrieveModel("text-davinci-003");

module.exports = {
    data: new SlashCommandBuilder().setName("chatgpt")//the name of the slash command
    .setDescription("Chat with GPT-3")
    .addStringOption(option => 
        option.setName("prompt")//this is the prompt that the user will send
    .setDescription("Message to send to GPT-3")
    ),
    async execute(interaction) { //this is the function that will be executed when the slash command is used
        const userPrompt = interaction.options.getString("prompt") || "";
        if(!userPrompt) {
            await interaction.reply("Please provide a prompt");
            return;
        }
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: userPrompt,//this is the prompt that the user will send to the bot
            maxTokens: 60,
            temperature: 0.9,
            n: 2
        });
        const response = completion.data.choices[0].text;
        await interaction.reply(response);
    },
};