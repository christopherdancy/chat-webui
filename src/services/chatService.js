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
    // Global settings
    case 'changePrimaryColor':
      updatedConfig.global.primaryColor = intent.value;
      responseMessage = `I've updated the primary color to ${intent.value}. This affects multiple elements across the site.`;
      break;
      
    case 'changeSecondaryColor':
      updatedConfig.global.secondaryColor = intent.value;
      responseMessage = `I've updated the secondary color to ${intent.value}. This affects background colors in several sections.`;
      break;
      
    case 'changeTextColor':
      updatedConfig.global.textColor = intent.value;
      responseMessage = `I've changed the main text color to ${intent.value}. How does it look?`;
      break;
    
    // Header section
    case 'changeHeaderTitle':
      updatedConfig.header.title = intent.value;
      responseMessage = `I've updated the header title to "${intent.value}". How does it look?`;
      break;
      
    case 'changeHeaderColor':
      updatedConfig.header.backgroundColor = intent.value;
      responseMessage = `I've changed the header background color to ${intent.value}. What do you think?`;
      break;
      
    case 'changeLogoText':
      updatedConfig.header.logoText = intent.value;
      responseMessage = `The logo text is now "${intent.value}". How does it look?`;
      break;
    
    // Hero section
    case 'changeHeroBackground':
      updatedConfig.hero.backgroundColor = intent.value;
      responseMessage = `I've updated the hero background to ${intent.value}. How does it look?`;
      break;

    case 'changeHeroTitle':
      updatedConfig.hero.title = intent.value;
      responseMessage = `The hero title is now "${intent.value}". Anything else you'd like to change?`;
      break;
      
    case 'changeHeroSubtitle':
      updatedConfig.hero.subtitle = intent.value;
      responseMessage = `I've updated the hero subtitle to "${intent.value}". How does it look?`;
      break;
      
    case 'changeHeroButtonText':
      updatedConfig.hero.buttonText = intent.value;
      responseMessage = `The hero button text now says "${intent.value}". What else would you like to modify?`;
      break;
      
    case 'changeHeroButtonColor':
      updatedConfig.hero.buttonColor = intent.value;
      responseMessage = `I've changed the hero button color to ${intent.value}. Does that work for you?`;
      break;
      
    case 'changeHeroButtonUrl':
      updatedConfig.hero.buttonUrl = intent.value;
      responseMessage = `The hero button URL is now "${intent.value}". How does that look?`;
      break;
    
    // Benefits section
    case 'changeBenefitsBackground':
      updatedConfig.benefits.backgroundColor = intent.value;
      responseMessage = `I've updated the benefits background to ${intent.value}. How does it look?`;
      break;

    case 'changeBenefitsTitle':
      updatedConfig.benefits.title = intent.value;
      responseMessage = `The benefits section title is now "${intent.value}". How does that look?`;
      break;
      
    case 'changeBenefitsSubtitle':
      updatedConfig.benefits.subtitle = intent.value;
      responseMessage = `I've updated the benefits subtitle to "${intent.value}". Anything else you'd like to change?`;
      break;

    case 'changeBenefitItemTitle':
      updatedConfig.benefits.items[intent.itemIndex].title = intent.value;
      responseMessage = `The title for Benefit ${intent.itemIndex + 1} is now "${intent.value}". How does that look?`;
      break;
      
    case 'changeBenefitItemDescription':
      updatedConfig.benefits.items[intent.itemIndex].description = intent.value;
      responseMessage = `The description for Benefit ${intent.itemIndex + 1} is now "${intent.value}". How does that look?`;
      break;
    
    // Features section
    case 'changeFeaturesBackground':
      updatedConfig.features.backgroundColor = intent.value;
      responseMessage = `I've updated the features background to ${intent.value}. How does it look?`;
      break;

    case 'changeFeaturesTitle':
      updatedConfig.features.title = intent.value;
      responseMessage = `The features section title is now "${intent.value}". How does that look?`;
      break;
      
    case 'changeFeaturesSubtitle':
      updatedConfig.features.subtitle = intent.value;
      responseMessage = `I've updated the features subtitle to "${intent.value}". Anything else you'd like to change?`;
      break;
      
    case 'changeFeaturesImage':
      updatedConfig.features.image = intent.value;
      responseMessage = `I've updated the features section image. How does it look?`;
      break;
    
    case 'changeFeatureItemTitle':
      updatedConfig.features.items[intent.itemIndex].title = intent.value;
      responseMessage = `The title for Feature ${intent.itemIndex + 1} is now "${intent.value}". How does that look?`;
      break;
      
    case 'changeFeatureItemDescription':  
      updatedConfig.features.items[intent.itemIndex].description = intent.value;
      responseMessage = `The description for Feature ${intent.itemIndex + 1} is now "${intent.value}". How does that look?`;
      break;
      
    // Call to Action section
    case 'changeCtaBackground':
      updatedConfig.callToAction.backgroundColor = intent.value;
      responseMessage = `I've updated the call to action background to ${intent.value}. How does it look?`;
      break;

    case 'changeCtaTitle':
      updatedConfig.callToAction.title = intent.value;
      responseMessage = `The call to action title is now "${intent.value}". How does that look?`;
      break;
      
    case 'changeCtaSubtitle':
      updatedConfig.callToAction.subtitle = intent.value;
      responseMessage = `I've updated the call to action subtitle to "${intent.value}". Anything else you'd like to change?`;
      break;
      
    case 'changeCtaButtonText':
      updatedConfig.callToAction.buttonText = intent.value;
      responseMessage = `The call to action button text now says "${intent.value}". What else would you like to modify?`;
      break;

    case 'changeCtaButtonColor':
      updatedConfig.callToAction.buttonColor = intent.value;
      responseMessage = `I've changed the call to action button color to ${intent.value}. How does that look?`;
      break;

    case 'changeCtaButtonUrl':
      updatedConfig.callToAction.buttonUrl = intent.value;
      responseMessage = `The call to action button URL is now "${intent.value}". How does that look?`;
      break;
    
    // Footer section
    case 'changeFooterAboutUsText':
      updatedConfig.footer.aboutUsText = intent.value;
      responseMessage = `The footer about us text is now "${intent.value}". How does that look?`;
      break;

    case 'changeFooterText':
      updatedConfig.footer.text = intent.value;
      responseMessage = `The footer text now reads "${intent.value}". Anything else you want to change?`;
      break;

    case 'changeFooterSocialLink':
      // Make sure the socialLinks object and the platform property exist
      if (!updatedConfig.footer.socialLinks) {
        updatedConfig.footer.socialLinks = {};
      }
      
      if (!updatedConfig.footer.socialLinks[intent.platform]) {
        updatedConfig.footer.socialLinks[intent.platform] = {
          url: '',
          icon: `fab fa-${intent.platform}`
        };
      }
      
      // Update the URL
      updatedConfig.footer.socialLinks[intent.platform].url = intent.value;
      responseMessage = `I've updated the ${intent.platform} link to ${intent.value}. How does that look?`;
      break;

    case 'changeFooterLinks':
      updatedConfig.footer.links = intent.value;
      responseMessage = `The footer links are now "${intent.value}". How does that look?`;
      break;

    case 'changeFooterAddress':
      updatedConfig.footer.address = intent.value;
      responseMessage = `The footer address is now "${intent.value}". How does that look?`;
      break;

    case 'changeFooterEmail':
      updatedConfig.footer.email = intent.value;
      responseMessage = `The footer email is now "${intent.value}". How does that look?`;
      break;
      
    case 'changeFooterPhone':
      updatedConfig.footer.phone = intent.value;
      responseMessage = `The footer phone is now "${intent.value}". How does that look?`;
      break;  
      
    case 'unknown':
    default:
      // No changes to the config
      responseMessage = "I'm not sure how to make that change. You can modify various parts of the website including:\n\n" +
        "- Global colors (primary, secondary, text)\n" +
        "- Header (title, color, logo)\n" +
        "- Hero section (title, subtitle, button, background)\n" +
        "- Benefits section (title, subtitle)\n" +
        "- Features section (title, subtitle, image)\n" +
        "- Call to Action section (title, subtitle, button)\n" +
        "- Footer text\n\n" +
        "For example, try saying 'Change the header title to My Website' or 'Change the primary color to blue'.";
      return { message: responseMessage, updatedConfig: null };
  }
  
  return {
    message: responseMessage,
    updatedConfig
  };
}