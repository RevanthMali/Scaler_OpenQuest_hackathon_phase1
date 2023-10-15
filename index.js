// import fetch from "node-fetch"; // Used for making HTTP requests
const { token } = import('./config.json');
const { MongoClient } = import('mongodb'); // Import the MongoDB driver
const { Client, Intents, GatewayIntentBits } = import('discord.js');

const client = new Client({ intents: [Intents.Guilds , Intents.GuildMessages , Intents.MessageContent] });

// MongoDB connection URL
const mongoURI = 'mongodb://0.0.0.0/Users'; // Replace with your MongoDB connection URL

// Event handler for when the bot is ready
client.once('ready', () => {
  console.log(` Logged in as ${client.user.tag} `);
});

client.on('messageCreate', async (message) => {
  //client sending message hi
  if(message.content.toLowerCase() === '!hi'){
    if(message.author.bot) return;
    message.reply({
      content:"HELLO ! WELCOME TO OPENQUEST CHALLENGE"
    }); 
  }
  else
    message.reply({
      content:"Please enter a valid command(use commands:hi , !register , !verify postlink)"
    })
  if (message.content.toLowerCase() === '!register') {
    // Connect to the MongoDB database
    const client = new MongoClient(mongoURI);

    try {
      await client.connect(); // Connect to the database
      const db = client.db(); // Get a reference to the database

      // Store the user's registration in the database
      const registration = {
        userId: message.author.id,
        username: message.author.username,
        event_name: 'OpenQuest_Hackathon', // Replace with the event name or ID
        timestamp: new Date(),
      };

      // Check if the user is already registered for this event
      const existingRegistration = await db.collection('Registeredusers').findOne({
        userId: message.author.id,
        event_name: 'OpenQuest_Hackathon', // Replace with the event name or ID
      });

      if (existingRegistration) {
        message.reply('You are already registered for this event.');
      } else {
        await db.collection('Registeredusers').insertOne(registration);
        console.log(` Registereduser : ${message.author.tag}`);
        message.reply('You have been registered for the event!');
      } 

      // Handle post verification with links
      if (message.content.toLowerCase().startsWith('!verify')) {
        const content = message.content.slice(8).trim();
        message.reply({
          content:"Your postlink is being verified please wait"
        })
        //Process for verification of the postlink - we require  API'S to verify particular link 
        
        // // Regular expression to match URLs in the message
        // const urlRegex = /(https?:\/\/[^\s]+)/g;
        // const urls = content.match(urlRegex);

        // if (urls && urls.length > 0) {
        //   const verifiedUrls = [];
        
        //   for (const url of urls) {
        //      if (url.includes('linkedin.com')) {
        //           // Verify LinkedIn post using the LinkedIn API
        //           const isLinkedInPostValid = await verifyLinkedInPost(url);
        //           if (isLinkedInPostValid) {
        //             verifiedUrls.push(url);
        //           }
        //         } else if (url.includes('twitter.com')) {
        //           // Verify Twitter tweet using the Twitter API
        //           const isTwitterTweetValid = await verifyTwitterTweet(url);
        //           if (isTwitterTweetValid) {
        //             verifiedUrls.push(url);
        //           }
        //         }
        //       }
        
        //       if (verifiedUrls.length > 0) {
        //         // Mark the post as verified or update a verification status in your database
        //         // Provide feedback to the user
        //         message.reply(The following URLs in your post have been verified: ${verifiedUrls.join(', ')});
        //       } else {
        //         // Notify the user that none of the URLs are valid
        //         message.reply('None of the URLs in your post could be verified.');
        //       }
        //     } else {
        //       // No URLs found in the message
        //       message.reply('Your post does not contain any URLs to verify.');
        //     }
      }
   
    
    } catch (error) {
      console.error('Error registering user:', error);
      message.reply('An error occurred while registering for the event.');
    } finally {
      client.close(); // Close the MongoDB connection
    }
  }
});





// // Register a command
// client.on('messageCreate', async (message) => {

//   if (message.content.toLowerCase() === '!register') {
//     // Connect to the MongoDB database
//     const client = new MongoClient(mongoURI);
//     try {
//       await client.connect(); // Connect to the database
//       const db = client.db(); // Get a reference to the database
//       // Store the user's registration in the database
//       const registration = {
//         userId: message.author.id,
//         username: message.author.username,
//         event_name: 'OpenQuest_Hackathon', // Replace with the event name or ID
//         timestamp: new Date(),
//       };

//       const result = await db.collection('Registeredusers').insertOne(registration);
//       console.log(Registered user: ${message.author.tag});

//       // Respond to the user
//       message.reply('You have been registered for the event!');

//       const existingRegistration = await db.collection('Registeredusers').findOne({
//         userId: message.author.id,
//         event_name: 'OpenQuest_Hackathon'
//       });
//     if (existingRegistration) {
//       message.reply('You are already registered for this event.');
//     }
//     // else {
//     //     console.error('Error registering user:', error);
//     //     message.reply('An error occurred while registering for the event.');
//     //   }
//     // }catch(error){
//     // if (error.code === 11000) {
//     //   // Duplicate key error (userId is not unique)
//     //   message.reply('You are already registered for the event!');
//     // } else {
//     //   console.error('Error registering user:', error);
//     //   message.reply('An error occurred while registering for the event.');
//     // }
//   }
//      finally {
//       client.close(); // Close the MongoDB connection
//     }
//   } 

// });

// Log in to Discord with your app's token
client.login(token);