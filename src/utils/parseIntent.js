// A simple rule-based intent parser for the POC
// In a real application, this would use a more sophisticated NLP approach

export function parseIntent(message) {
  const lowerMessage = message.toLowerCase();
  
  // Global settings
  if (lowerMessage.includes('primary color') || 
      lowerMessage.includes('the primary color') ||
      lowerMessage.includes('theme color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'PrimaryColor', value: match[0].toLowerCase() };
    }
  }
  
  if (lowerMessage.includes('secondary color') || 
      lowerMessage.includes('the secondary color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'SecondaryColor', value: match[0].toLowerCase() };
    }
  }
  
  if (lowerMessage.includes('text color') || 
      lowerMessage.includes('the text color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'TextColor', value: match[0].toLowerCase() };
    }
  }
  
  // Header section
  // TODO: Website name needs to be updated
  // TODO: header title to random for not overwriting & remove name from deployment
  if (lowerMessage.includes('header color') || 
      lowerMessage.includes('header background')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'HeaderColor', value: match[0].toLowerCase() };
    }
  }
  
  if ((lowerMessage.includes('logo text') || 
      lowerMessage.includes('the logo text')) && !lowerMessage.includes('color')) {
    const regex = /(?:the )?logo text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'LogoText', value: match[1].trim() };
    }
  }

  if ((lowerMessage.includes('logo image') || 
      lowerMessage.includes('the logo image')) && !lowerMessage.includes('color')) {
    const regex = /(?:the )?logo image(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'LogoImage', value: match[1].trim() };
    }
  }
  
  // Hero section
  if (lowerMessage.includes('hero background color') || 
      lowerMessage.includes('the hero background color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'HeroBackground', value: match[0] };
    }
  }

  if (lowerMessage.includes('hero title text') || 
      lowerMessage.includes('the hero title text') ||
      lowerMessage.includes('main title text')) {
    const regex = /(?:the )?(?:hero|main) title text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'HeroTitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('hero subtitle text') || 
      lowerMessage.includes('the hero subtitle text') ||
      lowerMessage.includes('update hero subtitle text')) {
    const regex = /(?:the )?hero subtitle text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'HeroSubtitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('hero button text') || 
      lowerMessage.includes('the hero button text') ||
      (lowerMessage.includes('button text') && lowerMessage.includes('hero'))) {
    const regex = /(?:the )?(?:hero )?button text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'HeroButtonText', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('hero button color') || 
      lowerMessage.includes('the hero button color') ||
      (lowerMessage.includes('button color') && lowerMessage.includes('hero'))) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'HeroButtonColor', value: match[0].toLowerCase() };
    }
  }

  if (lowerMessage.includes('hero button url') || 
      lowerMessage.includes('the hero button url') ||
      (lowerMessage.includes('button url') && lowerMessage.includes('hero'))) {
    const urlRegex = /(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?/i;
    const match = message.match(urlRegex);
    if (match) {
      // Add https:// prefix if not present
      let url = match[0];
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      return { type: 'HeroButtonUrl', value: url };
    }
  }
  
  // Benefits section
  if (lowerMessage.includes('benefits background color') || 
      lowerMessage.includes('the benefits background color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'BenefitsBackground', value: match[0].toLowerCase() };
    }
  }

  if (lowerMessage.includes('benefits title text') || 
      lowerMessage.includes('the benefits title text')) {
    const regex = /(?:the )?benefits title text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'BenefitsTitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('benefits subtitle text') || 
      lowerMessage.includes('the benefits subtitle text')) {
    const regex = /(?:the )?benefits subtitle text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'BenefitsSubtitle', value: match[1].trim() };
    }
  }

  // Handle benefits item subsections
  if (lowerMessage.includes('benefits item')) {
    // Match pattern like "benefits item1 title text New Title"
    const itemTitleRegex = /benefits (item\d+) title(?: text)?(?: to)? ["']?([^"']+)["']?/i;
    const itemTitleMatch = message.match(itemTitleRegex);
    if (itemTitleMatch && itemTitleMatch[1] && itemTitleMatch[2]) {
      const itemName = itemTitleMatch[1].toLowerCase(); // e.g., "item1"
      return { 
        type: 'BenefitItemTitle', 
        value: itemTitleMatch[2].trim(),
        itemName: itemName
      };
    }
    
    // Match pattern like "benefits item2 description text New description"
    const itemDescRegex = /benefits (item\d+) description(?: text)?(?: to)? ["']?([^"']+)["']?/i;
    const itemDescMatch = message.match(itemDescRegex);
    if (itemDescMatch && itemDescMatch[1] && itemDescMatch[2]) {
      const itemName = itemDescMatch[1].toLowerCase(); // e.g., "item2"
      return { 
        type: 'BenefitItemDescription', 
        value: itemDescMatch[2].trim(),
        itemName: itemName
      };
    }

    // Match pattern like "benefits item1 icon image fas fa-home"
    const iconRegex = /benefits (item\d+) icon image (fas? fa-[a-z-]+)/i;
    const iconMatch = message.match(iconRegex);
    
    if (iconMatch && iconMatch[1] && iconMatch[2]) {
      const itemName = iconMatch[1].toLowerCase(); // e.g., "item1"
      return {
        type: 'BenefitItemIcon', 
        value: iconMatch[2].trim(),
        itemName: itemName
      };
    }

    // Match pattern like "benefits item1 icon color"
    const iconColorRegex = /benefits (item\d+) icon color(?: to)? ["']?([^"']+)["']?/i;
    const iconColorMatch = message.match(iconColorRegex);
    if (iconColorMatch && iconColorMatch[1] && iconColorMatch[2]) {
      const itemName = iconColorMatch[1].toLowerCase(); // e.g., "item1"
      return {
        type: 'BenefitItemIconColor',
        value: iconColorMatch[2].trim(),
        itemName: itemName
      };
    }
  }
  
  // Features section
  if (lowerMessage.includes('features background color') || 
      lowerMessage.includes('the features background color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'FeaturesBackground', value: match[0].toLowerCase() };
    }
  }

  if (lowerMessage.includes('features title text') || 
      lowerMessage.includes('the features title')) {
    const regex = /(?:the )?features title text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'FeaturesTitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('features subtitle text') || 
      lowerMessage.includes('the features subtitle')) {
    const regex = /(?:the )?features subtitle text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'FeaturesSubtitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('features image') || 
      lowerMessage.includes('the features image')) {
    const urlRegex = /https?:\/\/[^\s"']+/i;
    const match = message.match(urlRegex);
    if (match) {
      return { type: 'FeaturesImage', value: match[0] };
    }
  }

  // Handle features item subsections
  if (lowerMessage.includes('features item')) {
    // Match pattern like "features item1 title text New Title"
    const itemTitleRegex = /features (item\d+) title(?: text)?(?: to)? ["']?([^"']+)["']?/i;
    const itemTitleMatch = message.match(itemTitleRegex);
    if (itemTitleMatch && itemTitleMatch[1] && itemTitleMatch[2]) {
      const itemName = itemTitleMatch[1].toLowerCase(); // e.g., "item1"
      return { 
        type: 'FeatureItemTitle', 
        value: itemTitleMatch[2].trim(),
        itemName: itemName
      };
    }
    
    // Match pattern like "features item2 description text New description"
    const itemDescRegex = /features (item\d+) description(?: text)?(?: to)? ["']?([^"']+)["']?/i;
    const itemDescMatch = message.match(itemDescRegex);
    if (itemDescMatch && itemDescMatch[1] && itemDescMatch[2]) {
      const itemName = itemDescMatch[1].toLowerCase(); // e.g., "item2"
      return { 
        type: 'FeatureItemDescription', 
        value: itemDescMatch[2].trim(),
        itemName: itemName
      };
    }
    
    // Match pattern like "features item1 icon image fas fa-code"
    const iconRegex = /features (item\d+) icon image (fas? fa-[a-z-]+)/i;
    const iconMatch = message.match(iconRegex);
    
    if (iconMatch && iconMatch[1] && iconMatch[2]) {
      const itemName = iconMatch[1].toLowerCase(); // e.g., "item1"
      return {
        type: 'FeatureItemIcon', 
        value: iconMatch[2].trim(),
        itemName: itemName
      };
    }
  }
  
  // Call to Action section
  if (lowerMessage.includes('cta background color') || 
      lowerMessage.includes('the cta background color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'CtaBackground', value: match[0].toLowerCase() };
    }
  }

  if (lowerMessage.includes('cta title text') || 
      lowerMessage.includes('the cta title text') ||
      lowerMessage.includes('call to action title text')) {
    const regex = /(?:the )?(?:cta|call to action) title text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'CtaTitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('cta subtitle text') || 
      lowerMessage.includes('the cta subtitle text') ||
      lowerMessage.includes('call to action subtitle text')) {
    const regex = /(?:the )?(?:cta|call to action) subtitle text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'CtaSubtitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('cta button text') || 
      lowerMessage.includes('the cta button text') ||
      (lowerMessage.includes('button text') && (lowerMessage.includes('cta') || lowerMessage.includes('call to action')))) {
    const regex = /(?:the )?(?:cta |call to action )?button text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'CtaButtonText', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('cta button color') || 
      lowerMessage.includes('the cta button color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'CtaButtonColor', value: match[0].toLowerCase() };
    }
  }
  
  if (lowerMessage.includes('cta button url') || 
      lowerMessage.includes('the cta button url')) {
    const urlRegex = /(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?/i;
    const match = message.match(urlRegex);
    if (match) {
      // Add https:// prefix if not present
      let url = match[0];
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      return { type: 'CtaButtonUrl', value: url };
    }
  }
  
  // Footer section
  if (lowerMessage.includes('footer')) {
    // Handle footer background color
    if (lowerMessage.includes('background color')) {
      const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
      const match = message.match(colorRegex);
      if (match) {
        return { type: 'FooterBackground', value: match[0].toLowerCase() };
      }
    }
    
    // Handle footer text content
    if (lowerMessage.includes('description text') || 
        lowerMessage.includes('footer description text')) {
      const regex = /footer (?:description text)(?: to)? ["']?([^"']+)["']?/i;
      const match = message.match(regex);
      if (match && match[1]) {
        return { type: 'footerDescriptionText', value: match[1].trim() };
      }
    }
    
    // Handle footer address
    if (lowerMessage.includes('address')) {
      const regex = /footer address text(?: to)? ["']?([^"']+)["']?/i;
      const match = message.match(regex);
      if (match && match[1]) {
        return { type: 'FooterAddress', value: match[1].trim() };
      }
    }
    
    // Handle footer phone
    if (lowerMessage.includes('phone')) {
      const regex = /footer phone text(?: to)? ["']?([^"']+)["']?/i;
      const match = message.match(regex);
      if (match && match[1]) {
        return { type: 'FooterPhone', value: match[1].trim() };
      }
    }
    
    // Handle footer email
    if (lowerMessage.includes('email')) {
      const regex = /footer email text(?: to)? ["']?([^"']+)["']?/i;
      const match = message.match(regex);
      if (match && match[1]) {
        return { type: 'FooterEmail', value: match[1].trim() };
      }
    }
    
    // Handle social links using the subsection structure
    if (lowerMessage.includes('social')) {
      // Match pattern like "footer socials facebook url https://facebook.com"
      // Or "footer social facebook url https://facebook.com" (singular form)
      // Updated regex to handle both singular and plural forms
      const socialUrlRegex = /footer social(?:s)? (facebook|twitter|instagram|linkedin) (?:url|link)(?: to)? ((?:https?:\/\/)?(?:www\.)?[^\s"']+\.[a-z]{2,}[^\s"']*)/i;
      const socialUrlMatch = message.match(socialUrlRegex);
      
      if (socialUrlMatch && socialUrlMatch[1] && socialUrlMatch[2]) {
        const platform = socialUrlMatch[1].toLowerCase();
        let url = socialUrlMatch[2];
        
        // Add https:// if no protocol is specified
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url;
        }
        
        return { 
          type: 'FooterSocialLink', 
          platform: platform,
          value: url
        };
      }
    }
  }

  // For backward compatibility, keep the old social link patterns
  if (lowerMessage.includes('footer facebook link') || 
      lowerMessage.includes('the facebook link')) {
    const urlRegex = /(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?/i;
    const match = message.match(urlRegex);
    if (match) {
      // Add https:// prefix if not present
      let url = match[0];
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      return { type: 'FooterSocialLink', platform: 'facebook', value: url };
    }
  }

  if (lowerMessage.includes('footer twitter link') || 
      lowerMessage.includes('the twitter link')) {
    const urlRegex = /(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?/i;
    const match = message.match(urlRegex);
    if (match) {
      // Add https:// prefix if not present
      let url = match[0];
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      return { type: 'FooterSocialLink', platform: 'twitter', value: url };
    }
  }

  if (lowerMessage.includes('footer instagram link') || 
      lowerMessage.includes('the instagram link')) {
    const urlRegex = /(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?/i;
    const match = message.match(urlRegex);
    if (match) {
      // Add https:// prefix if not present
      let url = match[0];
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      return { type: 'FooterSocialLink', platform: 'instagram', value: url };
    }
  }

  if (lowerMessage.includes('footer linkedin link') || 
      lowerMessage.includes('the linkedin link')) {
    const urlRegex = /(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?/i;
    const match = message.match(urlRegex);
    if (match) {
      // Add https:// prefix if not present
      let url = match[0];
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      return { type: 'FooterSocialLink', platform: 'linkedin', value: url };
    }
  }
  
  // If no intent was matched
  return { type: 'unknown' };
}