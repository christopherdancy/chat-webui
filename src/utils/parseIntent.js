// A simple rule-based intent parser for the POC
// In a real application, this would use a more sophisticated NLP approach

export function parseIntent(message) {
  const lowerMessage = message.toLowerCase();
  
  // Global settings
  if (lowerMessage.includes('change primary color') || 
      lowerMessage.includes('change the primary color') ||
      lowerMessage.includes('change theme color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'changePrimaryColor', value: match[0].toLowerCase() };
    }
  }
  
  if (lowerMessage.includes('change secondary color') || 
      lowerMessage.includes('change the secondary color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'changeSecondaryColor', value: match[0].toLowerCase() };
    }
  }
  
  if (lowerMessage.includes('change text color') || 
      lowerMessage.includes('change the text color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'changeTextColor', value: match[0].toLowerCase() };
    }
  }
  
  // Header section
  if (lowerMessage.includes('change header title') || 
      lowerMessage.includes('change the header title') ||
      lowerMessage.includes('update header title')) {
    const regex = /change (?:the )?header title(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeHeaderTitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('change header color') || 
      lowerMessage.includes('change the header color') ||
      lowerMessage.includes('header background')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'changeHeaderColor', value: match[0].toLowerCase() };
    }
  }
  
  if ((lowerMessage.includes('change logo text') || 
      lowerMessage.includes('change the logo text')) && !lowerMessage.includes('color')) {
    const regex = /change (?:the )?logo text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeLogoText', value: match[1].trim() };
    }
  }
  
  // Hero section
  if (lowerMessage.includes('change hero title') || 
      lowerMessage.includes('change the hero title') ||
      lowerMessage.includes('change main title')) {
    const regex = /change (?:the )?(?:hero|main) title(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeHeroTitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('change hero subtitle') || 
      lowerMessage.includes('change the hero subtitle') ||
      lowerMessage.includes('update hero subtitle')) {
    const regex = /change (?:the )?hero subtitle(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeHeroSubtitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('change hero button text') || 
      lowerMessage.includes('change the hero button text') ||
      (lowerMessage.includes('button text') && lowerMessage.includes('hero'))) {
    const regex = /change (?:the )?(?:hero )?button text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeHeroButtonText', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('change hero button color') || 
      lowerMessage.includes('change the hero button color') ||
      (lowerMessage.includes('button color') && lowerMessage.includes('hero'))) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'changeHeroButtonColor', value: match[0].toLowerCase() };
    }
  }
  
  if (lowerMessage.includes('change hero background') || 
      lowerMessage.includes('change the hero background image')) {
    const urlRegex = /https?:\/\/[^\s"']+/i;
    const match = message.match(urlRegex);
    if (match) {
      return { type: 'changeHeroBackgroundImage', value: match[0] };
    }
  }
  
  // Benefits section
  if (lowerMessage.includes('change benefits title') || 
      lowerMessage.includes('change the benefits title')) {
    const regex = /change (?:the )?benefits title(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeBenefitsTitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('change benefits subtitle') || 
      lowerMessage.includes('change the benefits subtitle')) {
    const regex = /change (?:the )?benefits subtitle(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeBenefitsSubtitle', value: match[1].trim() };
    }
  }
  
  // Features section
  if (lowerMessage.includes('change features title') || 
      lowerMessage.includes('change the features title')) {
    const regex = /change (?:the )?features title(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeFeaturesTitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('change features subtitle') || 
      lowerMessage.includes('change the features subtitle')) {
    const regex = /change (?:the )?features subtitle(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeFeaturesSubtitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('change features image') || 
      lowerMessage.includes('change the features image')) {
    const urlRegex = /https?:\/\/[^\s"']+/i;
    const match = message.match(urlRegex);
    if (match) {
      return { type: 'changeFeaturesImage', value: match[0] };
    }
  }
  
  // Call to Action section
  if (lowerMessage.includes('change cta title') || 
      lowerMessage.includes('change the cta title') ||
      lowerMessage.includes('change call to action title')) {
    const regex = /change (?:the )?(?:cta|call to action) title(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeCtaTitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('change cta subtitle') || 
      lowerMessage.includes('change the cta subtitle') ||
      lowerMessage.includes('change call to action subtitle')) {
    const regex = /change (?:the )?(?:cta|call to action) subtitle(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeCtaSubtitle', value: match[1].trim() };
    }
  }
  
  if (lowerMessage.includes('change cta button text') || 
      lowerMessage.includes('change the cta button text') ||
      (lowerMessage.includes('button text') && (lowerMessage.includes('cta') || lowerMessage.includes('call to action')))) {
    const regex = /change (?:the )?(?:cta |call to action )?button text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeCtaButtonText', value: match[1].trim() };
    }
  }
  
  // Footer section
  if (lowerMessage.includes('change footer text') || 
      lowerMessage.includes('change the footer text')) {
    const regex = /change (?:the )?footer text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeFooterText', value: match[1].trim() };
    }
  }
  
  // Generic button text change (if section not specified)
  if (lowerMessage.includes('change button text') || 
      lowerMessage.includes('change the button text')) {
    const regex = /change (?:the )?button text(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeHeroButtonText', value: match[1].trim() }; // Default to hero button
    }
  }
  
  // Generic button color change (if section not specified)
  if (lowerMessage.includes('change button color') || 
      lowerMessage.includes('change the button color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'changeHeroButtonColor', value: match[0].toLowerCase() }; // Default to hero button
    }
  }
  
  // If no intent was matched
  return { type: 'unknown' };
}