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
    // TODO: Fonts
    case 'PrimaryColor':
      updatedConfig.global.primaryColor = intent.value;
      responseMessage = `I've updated the primary color to ${intent.value}. This affects multiple elements across the site.`;
      break;
      
    case 'SecondaryColor':
      updatedConfig.global.secondaryColor = intent.value;
      responseMessage = `I've updated the secondary color to ${intent.value}. This affects background colors in several sections.`;
      break;
      
    case 'TextColor':
      updatedConfig.global.textColor = intent.value;
      responseMessage = `I've d the main text color to ${intent.value}. How does it look?`;
      break;
    
    // Header section
    case 'HeaderTitle':
      updatedConfig.header.title = intent.value;
      responseMessage = `I've updated the header title to "${intent.value}". How does it look?`;
      break;
    
    // TODO: System wide and prompt a  and not ask a question?
    case 'HeaderColor':
      updatedConfig.header.backgroundColor = intent.value;
      responseMessage = `I've d the header background color to ${intent.value}. What else would you like to ?`;
      break;
      
    case 'LogoText':
      updatedConfig.header.logo = intent.value;
      updatedConfig.header.title = intent.value;
      responseMessage = `The logo text is now "${intent.value}". How does it look?`;
      break;
    
    // Hero section
    case 'HeroBackground':
      updatedConfig.hero.backgroundColor = intent.value;
      responseMessage = `I've updated the hero background to ${intent.value}. How does it look?`;
      break;

    case 'HeroTitle':
      updatedConfig.hero.title = intent.value;
      responseMessage = `The hero title is now "${intent.value}". Anything else you'd like to ?`;
      break;
      
    case 'HeroSubtitle':
      updatedConfig.hero.subtitle = intent.value;
      responseMessage = `I've updated the hero subtitle to "${intent.value}". How does it look?`;
      break;
      
    case 'HeroButtonText':
      updatedConfig.hero.buttonText = intent.value;
      responseMessage = `The hero button text now says "${intent.value}". What else would you like to modify?`;
      break;
    
    // TODO: Hover state
    case 'HeroButtonColor':
      updatedConfig.hero.buttonColor = intent.value;
      responseMessage = `I've d the hero button color to ${intent.value}. Does that work for you?`;
      break;
      
    case 'HeroButtonUrl':
      updatedConfig.hero.buttonUrl = intent.value;
      responseMessage = `The hero button URL is now "${intent.value}". How does that look?`;
      break;
    
    // Benefits section
    // TODO: Icon in command  site 
    case 'BenefitsBackground':
      updatedConfig.benefits.backgroundColor = intent.value;
      responseMessage = `I've updated the benefits background to ${intent.value}. How does it look?`;
      break;

    case 'BenefitsTitle':
      updatedConfig.benefits.title = intent.value;
      responseMessage = `The benefits section title is now "${intent.value}". How does that look?`;
      break;
      
    case 'BenefitsSubtitle':
      updatedConfig.benefits.subtitle = intent.value;
      responseMessage = `I've updated the benefits subtitle to "${intent.value}". Anything else you'd like to ?`;
      break;

    case 'BenefitItemTitle':
      // Extract the item number from itemName (e.g., "item1" -> 0)
      const benefitItemNumber = parseInt(intent.itemName.replace('item', '')) - 1;
      if (updatedConfig.benefits && 
          updatedConfig.benefits.items && 
          updatedConfig.benefits.items[benefitItemNumber]) {
        updatedConfig.benefits.items[benefitItemNumber].title = intent.value;
        return {
          message: `Updated benefit ${intent.itemName} title to "${intent.value}"`,
          updatedConfig
        };
      }
      break;
      
    case 'BenefitItemDescription':
      const benefitItemDescNumber = parseInt(intent.itemName.replace('item', '')) - 1;
      if (updatedConfig.benefits && 
          updatedConfig.benefits.items && 
          updatedConfig.benefits.items[benefitItemDescNumber]) {
        updatedConfig.benefits.items[benefitItemDescNumber].description = intent.value;
        return {
          message: `Updated benefit ${intent.itemName} description to "${intent.value}"`,
          updatedConfig
        };
      }
      break;
    
    // Features section
    // TODO: Image should the upload the image?
    // TODO: Image with sizing and alignment
    case 'FeaturesBackground':
      updatedConfig.features.backgroundColor = intent.value;
      responseMessage = `I've updated the features background to ${intent.value}. How does it look?`;
      break;

    case 'FeaturesTitle':
      updatedConfig.features.title = intent.value;
      responseMessage = `The features section title is now "${intent.value}". How does that look?`;
      break;
      
    case 'FeaturesSubtitle':
      updatedConfig.features.subtitle = intent.value;
      responseMessage = `I've updated the features subtitle to "${intent.value}". Anything else you'd like to ?`;
      break;
      
    case 'FeaturesImage':
      updatedConfig.features.image = intent.value;
      responseMessage = `I've updated the features section image. How does it look?`;
      break;
    
    case 'FeatureItemTitle':
      const featureItemNumber = parseInt(intent.itemName.replace('item', '')) - 1;
      if (updatedConfig.features && 
          updatedConfig.features.items && 
          updatedConfig.features.items[featureItemNumber]) {
        updatedConfig.features.items[featureItemNumber].title = intent.value;
        return {
          message: `Updated feature ${intent.itemName} title to "${intent.value}"`,
          updatedConfig
        };
      }
      break;
      
    case 'FeatureItemDescription':
      const featureItemDescNumber = parseInt(intent.itemName.replace('item', '')) - 1;
      if (updatedConfig.features && 
          updatedConfig.features.items && 
          updatedConfig.features.items[featureItemDescNumber]) {
        updatedConfig.features.items[featureItemDescNumber].description = intent.value;
        return {
          message: `Updated feature ${intent.itemName} description to "${intent.value}"`,
          updatedConfig
        };
      }
      break;
      
    // Call to Action section
    case 'CtaBackground':
      updatedConfig.cta.backgroundColor = intent.value;
      responseMessage = `I've updated the call to action background to ${intent.value}. How does it look?`;
      break;

    case 'CtaTitle':
      updatedConfig.cta.title = intent.value;
      responseMessage = `The call to action title is now "${intent.value}". How does that look?`;
      break;
      
    case 'CtaSubtitle':
      updatedConfig.cta.subtitle = intent.value;
      responseMessage = `I've updated the call to action subtitle to "${intent.value}". Anything else you'd like to ?`;
      break;
      
    case 'CtaButtonText':
      updatedConfig.cta.buttonText = intent.value;
      responseMessage = `The call to action button text now says "${intent.value}". What else would you like to modify?`;
      break;

    case 'CtaButtonColor':
      updatedConfig.cta.buttonColor = intent.value;
      responseMessage = `I've d the call to action button color to ${intent.value}. How does that look?`;
      break;

    case 'CtaButtonUrl':
      updatedConfig.cta.buttonUrl = intent.value;
      responseMessage = `The call to action button URL is now "${intent.value}". How does that look?`;
      break;
    
    // Footer section
    case 'footerDescriptionText':
      updatedConfig.footer.description = intent.value;
      responseMessage = `The footer description is now "${intent.value}". How does that look?`;
      break;

    case 'FooterText':
      updatedConfig.footer.text = intent.value;
      responseMessage = `The footer text now reads "${intent.value}". Anything else you want to ?`;
      break;

    case 'FooterBackground':
      updatedConfig.footer.backgroundColor = intent.value;
      responseMessage = `The footer background color is now ${intent.value}. How does that look?`;
      break;

    case 'FooterSocialLink':
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

    case 'FooterLinks':
      updatedConfig.footer.links = intent.value;
      responseMessage = `The footer links are now "${intent.value}". How does that look?`;
      break;

    case 'FooterAddress':
      updatedConfig.footer.address = intent.value;
      responseMessage = `The footer address is now "${intent.value}". How does that look?`;
      break;

    case 'FooterEmail':
      updatedConfig.footer.email = intent.value;
      responseMessage = `The footer email is now "${intent.value}". How does that look?`;
      break;
      
    case 'FooterPhone':
      updatedConfig.footer.phone = intent.value;
      responseMessage = `The footer phone is now "${intent.value}". How does that look?`;
      break;  
      
    case 'unknown':
    default:
      // No s to the config
      responseMessage = "I'm not sure how to make that . You can modify various parts of the website including:\n\n" +
        "- Global colors (primary, secondary, text)\n" +
        "- Header (title, color, logo)\n" +
        "- Hero section (title, subtitle, button, background)\n" +
        "- Benefits section (title, subtitle)\n" +
        "- Features section (title, subtitle, image)\n" +
        "- Call to Action section (title, subtitle, button)\n" +
        "- Footer text\n\n" +
        "For example, try saying ' the header title to My Website' or ' the primary color to blue'.";
      return { message: responseMessage, updatedConfig: null };
  }
  
  return {
    message: responseMessage,
    updatedConfig
  };
}