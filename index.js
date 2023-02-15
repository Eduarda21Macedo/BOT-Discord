
const { Client, Events, GatewayIntentBits , Collection} = require('discord.js') 

//dotenv
const dotenv = require('dotenv')
dotenv.config()
const{TOKEN,CLIENT_ID,GUILD_ID} = process.env

//Importação dos Comandos
const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname,"commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()


for (const file of commandFiles){
	const filePath = path.join(commandsPath,file)
	const command = require(filePath)
	if ("data" in command && "execute" in command){
		client.commands.set(command.data.name, command)
	} else{
		console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes `)
	}
}
console.log(client.commands)

//Função que coloca o Bot Online
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Realizado como ${c.user.tag}`)
})
client.login(TOKEN)

//Listener interações com o bot

client.on(Events.InteractionCreate, interation =>{
	if(!interaction.isChatInputCommand()) return 

})