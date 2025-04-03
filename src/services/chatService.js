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
      responseMessage = `I've updated the main text color to ${intent.value}`;
      break;
    
    // Header section
    case 'HeaderTitle':
      updatedConfig.header.title = intent.value;
      responseMessage = `I've updated the header title to "${intent.value}."`;
      break;
    
    // TODO: System wide and prompt a  and not ask a question?
    case 'HeaderColor':
      updatedConfig.header.backgroundColor = intent.value;
      responseMessage = `I've updated the header background color to ${intent.value}.`;
      break;
      
    case 'LogoText':
      updatedConfig.header.logoText = intent.value;
      updatedConfig.header.title = intent.value;
      responseMessage = `I've updated the logo text to "${intent.value}".`;
      break;

    case 'LogoImage':
      updatedConfig.header.logoImage = intent.value;
      responseMessage = `I've updated the logo image to "${intent.value}".`;
      break;
    
    // Hero section
    case 'HeroBackground':
      updatedConfig.hero.backgroundColor = intent.value;
      responseMessage = `I've updated the hero background to ${intent.value}.`;
      break;

    case 'HeroTitle':
      updatedConfig.hero.title = intent.value;
      responseMessage = `The hero title is now "${intent.value}"`;
      break;
      
    case 'HeroSubtitle':
      updatedConfig.hero.subtitle = intent.value;
      responseMessage = `I've updated the hero subtitle to "${intent.value}"`;
      break;
      
    case 'HeroButtonText':
      updatedConfig.hero.buttonText = intent.value;
      responseMessage = `I've updated the hero button text to "${intent.value}"`;
      break;
    
    case 'HeroButtonColor':
      updatedConfig.hero.buttonColor = intent.value;
      responseMessage = `I've updated the hero button color to ${intent.value}`;
      break;
      
    case 'HeroButtonUrl':
      updatedConfig.hero.buttonUrl = intent.value;
      responseMessage = `I've updated the hero button URL to "${intent.value}"`;
      break;
    
    // Benefits section
    case 'BenefitsBackground':
      updatedConfig.benefits.backgroundColor = intent.value;
      responseMessage = `I've updated the benefits background to ${intent.value}`;
      break;

    case 'BenefitsTitle':
      updatedConfig.benefits.title = intent.value;
      responseMessage = `I've updated the benefits section title to "${intent.value}"`;
      break;
      
    case 'BenefitsSubtitle':
      updatedConfig.benefits.subtitle = intent.value;
      responseMessage = `I've updated the benefits subtitle to "${intent.value}"`;
      break;

    case 'BenefitItemTitle':
      // Extract item number from itemName (e.g., "item1" -> 0)
      const benefitItemIndex = parseInt(intent.itemName.replace('item', '')) - 1;
      
      if (updatedConfig.benefits && 
          updatedConfig.benefits.items && 
          benefitItemIndex >= 0 && 
          benefitItemIndex < updatedConfig.benefits.items.length) {
        updatedConfig.benefits.items[benefitItemIndex].title = intent.value;
        responseMessage = `I've updated the title for benefits ${intent.itemName} to "${intent.value}"`;
      } else {
        responseMessage = `Couldn't find benefits ${intent.itemName} to update.`;
        return { message: responseMessage, updatedConfig: null };
      }
      break;
      
    case 'BenefitItemDescription':
      const benefitDescIndex = parseInt(intent.itemName.replace('item', '')) - 1;
      
      if (updatedConfig.benefits && 
          updatedConfig.benefits.items && 
          benefitDescIndex >= 0 && 
          benefitDescIndex < updatedConfig.benefits.items.length) {
        updatedConfig.benefits.items[benefitDescIndex].description = intent.value;
        responseMessage = `I've updated the description for benefits ${intent.itemName} to "${intent.value}"`;
      } else {
        responseMessage = `Couldn't find benefits ${intent.itemName} to update.`;
        return { message: responseMessage, updatedConfig: null };
      }
      break;

    case 'BenefitItemIcon':
      const benefitIconIndex = parseInt(intent.itemName.replace('item', '')) - 1;
      
      if (updatedConfig.benefits && 
          updatedConfig.benefits.items && 
          benefitIconIndex >= 0 && 
          benefitIconIndex < updatedConfig.benefits.items.length) {
        updatedConfig.benefits.items[benefitIconIndex].icon = intent.value;
        responseMessage = `I've updated the icon for benefits ${intent.itemName} to ${intent.value}`;
      } else {
        responseMessage = `Couldn't find benefits ${intent.itemName} to update.`;
        return { message: responseMessage, updatedConfig: null };
      }
      break;

    case 'BenefitItemIconColor':
      const benefitIconColorIndex = parseInt(intent.itemName.replace('item', '')) - 1;
      
      if (updatedConfig.benefits && 
          updatedConfig.benefits.items && 
          benefitIconColorIndex >= 0 && 
          benefitIconColorIndex < updatedConfig.benefits.items.length) {
        updatedConfig.benefits.items[benefitIconColorIndex].iconColor = intent.value;
        responseMessage = `I've updated the icon color for benefits ${intent.itemName} to ${intent.value}`;
      } else {
        responseMessage = `Couldn't find benefits ${intent.itemName} to update.`;
        return { message: responseMessage, updatedConfig: null };
      }
      break;

    case 'BenefitItemBackgroundColor':
      const benefitBackgroundColorIndex = parseInt(intent.itemName.replace('item', '')) - 1;
      
      if (updatedConfig.benefits && 
          updatedConfig.benefits.items && 
          benefitBackgroundColorIndex >= 0 && 
          benefitBackgroundColorIndex < updatedConfig.benefits.items.length) {
        updatedConfig.benefits.items[benefitBackgroundColorIndex].backgroundColor = intent.value;
        responseMessage = `I've updated the background color for benefits ${intent.itemName} to ${intent.value}`;
      } else {
        responseMessage = `Couldn't find benefits ${intent.itemName} to update.`;
        return { message: responseMessage, updatedConfig: null };
      }
      break;

    // Features section
    case 'FeaturesBackground':
      updatedConfig.features.backgroundColor = intent.value;
      responseMessage = `I've updated the features background to ${intent.value}`;
      break;

    case 'FeaturesTitle':
      updatedConfig.features.title = intent.value;
      responseMessage = `I've updated the features section title to "${intent.value}"`;
      break;
      
    case 'FeaturesSubtitle':
      updatedConfig.features.subtitle = intent.value;
      responseMessage = `I've updated the features subtitle to "${intent.value}"`;
      break;
      
    case 'FeaturesImage':
      updatedConfig.features.image = intent.value;
      responseMessage = `I've updated the features section image to "${intent.value}"`;
      break;
    
    case 'FeatureItemTitle':
      const featureItemIndex = parseInt(intent.itemName.replace('item', '')) - 1;
      
      if (updatedConfig.features && 
          updatedConfig.features.items && 
          featureItemIndex >= 0 && 
          featureItemIndex < updatedConfig.features.items.length) {
        updatedConfig.features.items[featureItemIndex].title = intent.value;
        responseMessage = `I've updated the title for features ${intent.itemName} to "${intent.value}"`;
      } else {
        responseMessage = `Couldn't find features ${intent.itemName} to update.`;
        return { message: responseMessage, updatedConfig: null };
      }
      break;
      
    case 'FeatureItemDescription':
      const featureDescIndex = parseInt(intent.itemName.replace('item', '')) - 1;
      
      if (updatedConfig.features && 
          updatedConfig.features.items && 
          featureDescIndex >= 0 && 
          featureDescIndex < updatedConfig.features.items.length) {
        updatedConfig.features.items[featureDescIndex].description = intent.value;
        responseMessage = `I've updated the description for features ${intent.itemName} to "${intent.value}"`;
      } else {
        responseMessage = `Couldn't find features ${intent.itemName} to update.`;
        return { message: responseMessage, updatedConfig: null };
      }
      break;
      
    case 'FeatureItemIcon':
      const featureIconIndex = parseInt(intent.itemName.replace('item', '')) - 1;
      
      if (updatedConfig.features && 
          updatedConfig.features.items && 
          featureIconIndex >= 0 && 
          featureIconIndex < updatedConfig.features.items.length) {
        updatedConfig.features.items[featureIconIndex].icon = intent.value;
        responseMessage = `I've updated the icon for features ${intent.itemName} to ${intent.value}`;
      } else {
        responseMessage = `Couldn't find features ${intent.itemName} to update.`;
        return { message: responseMessage, updatedConfig: null };
      }
      break;
    
    // Call to Action section
    case 'CtaBackground':
      updatedConfig.cta.backgroundColor = intent.value;
      responseMessage = `I've updated the call to action background to ${intent.value}`;
      break;

    case 'CtaTitle':
      updatedConfig.cta.title = intent.value;
      responseMessage = `I've updated the call to action title to "${intent.value}"`;
      break;
      
    case 'CtaSubtitle':
      updatedConfig.cta.subtitle = intent.value;
      responseMessage = `I've updated the call to action subtitle to "${intent.value}"`;
      break;
      
    case 'CtaButtonText':
      updatedConfig.cta.buttonText = intent.value;
      responseMessage = `I've updated the call to action button text to "${intent.value}"`;
      break;

    case 'CtaButtonColor':
      updatedConfig.cta.buttonColor = intent.value;
      responseMessage = `I've updated the call to action button color to ${intent.value}`;
      break;

    case 'CtaButtonUrl':
      updatedConfig.cta.buttonUrl = intent.value;
      responseMessage = `I've updated the call to action button URL to "${intent.value}"`;
      break;
    
    // Footer section
    case 'footerDescriptionText':
      updatedConfig.footer.description = intent.value;
      responseMessage = `I've updated the footer description to "${intent.value}"`;
      break;

    case 'FooterText':
      updatedConfig.footer.text = intent.value;
      responseMessage = `I've updated the footer text to "${intent.value}"`;
      break;

    case 'FooterBackground':
      updatedConfig.footer.backgroundColor = intent.value;
      responseMessage = `I've updated the footer background color to ${intent.value}`;
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
      responseMessage = `I've updated the ${intent.platform} link to ${intent.value}`;
      break;

    case 'FooterLinks':
      updatedConfig.footer.links = intent.value;
      responseMessage = `I've updated the footer links to "${intent.value}"`;
      break;

    case 'FooterAddress':
      updatedConfig.footer.address = intent.value;
      responseMessage = `I've updated the footer address to "${intent.value}"`;
      break;

    case 'FooterEmail':
      updatedConfig.footer.email = intent.value;
      responseMessage = `I've updated the footer email to "${intent.value}"`;
      break;
      
    case 'FooterPhone':
      updatedConfig.footer.phone = intent.value;
      responseMessage = `I've updated the footer phone to "${intent.value}"`;
      break;  

    case 'HideSocialLink':
      updatedConfig.footer.socialLinks[intent.platform].hidden = intent.value;
      responseMessage = intent.value 
        ? `I've updated the ${intent.platform} icon to be hidden.`
        : `I've updated the ${intent.platform} icon to be visible.`;
      break;

    case 'unknown':
    default:
      // No s to the config
      responseMessage = "I'm not sure how to make that change. Customize your website by typing a command like 'header background color green'";
      return { message: responseMessage, updatedConfig: null };
  }
  
  return {
    message: responseMessage,
    updatedConfig
  };
}