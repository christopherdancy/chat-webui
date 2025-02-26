import { parseIntent } from '../utils/parseIntent';

// For a POC, we'll use a simple rule-based system to parse intents
// In a real implementation, this would connect to an LLM API
export async function processMessage(message, currentConfig) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Parse the user's intent
  const intent = parseIntent(message);
  
  // Make a copy of the current config
  const updatedConfig = JSON.parse(JSON.stringify(currentConfig));
  
  // Process based on the intent
  let responseMessage = "";
  
  switch (intent.type) {
    case 'changeHeaderTitle':
      updatedConfig.header.title = intent.value;
      responseMessage = `I've updated the header title to "${intent.value}". How does it look?`;
      break;
      
    case 'changeHeaderColor':
      updatedConfig.header.backgroundColor = intent.value;
      responseMessage = `I've changed the header background color to ${intent.value}. What do you think?`;
      break;
      
    case 'changeHeroHeading':
      updatedConfig.hero.heading = intent.value;
      responseMessage = `The hero heading is now "${intent.value}". Anything else you'd like to change?`;
      break;
      
    case 'changeHeroSubheading':
      updatedConfig.hero.subheading = intent.value;
      responseMessage = `I've updated the subheading to "${intent.value}". How does it look?`;
      break;
      
    case 'changeButtonText':
      updatedConfig.hero.buttonText = intent.value;
      responseMessage = `The button text now says "${intent.value}". What else would you like to modify?`;
      break;
      
    case 'changeButtonColor':
      updatedConfig.hero.buttonColor = intent.value;
      responseMessage = `I've changed the button color to ${intent.value}. Does that work for you?`;
      break;
      
    case 'changeFooterText':
      updatedConfig.footer.text = intent.value;
      responseMessage = `The footer text now reads "${intent.value}". Anything else you want to change?`;
      break;
      
    case 'unknown':
    default:
      // No changes to the config
      responseMessage = "I'm not sure how to make that change. You can modify the header, hero section (heading, subheading, button), or footer. For example, try saying 'Change the header title to My Website'.";
      return { message: responseMessage, updatedConfig: null };
  }
  
  return {
    message: responseMessage,
    updatedConfig
  };
}