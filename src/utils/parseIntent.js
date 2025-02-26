// A simple rule-based intent parser for the POC
// In a real application, this would use a more sophisticated NLP approach

export function parseIntent(message) {
  const lowerMessage = message.toLowerCase();
  
  // Change header title
  if (lowerMessage.includes('change header title') || 
      lowerMessage.includes('change the header title') ||
      lowerMessage.includes('update header title')) {
    const regex = /change (?:the )?header title(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeHeaderTitle', value: match[1].trim() };
    }
  }
  
  // Change header color
  if (lowerMessage.includes('change header color') || 
      lowerMessage.includes('change the header color') ||
      lowerMessage.includes('header background')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'changeHeaderColor', value: match[0].toLowerCase() };
    }
  }
  
  // Change hero heading
  if (lowerMessage.includes('change hero heading') || 
      lowerMessage.includes('change the hero heading') ||
      lowerMessage.includes('change main heading')) {
    const regex = /change (?:the )?(?:hero|main) heading(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeHeroHeading', value: match[1].trim() };
    }
  }
  
  // Change hero subheading
  if (lowerMessage.includes('change subheading') || 
      lowerMessage.includes('change the subheading') ||
      lowerMessage.includes('update subheading')) {
    const regex = /change (?:the )?subheading(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeHeroSubheading', value: match[1].trim() };
    }
  }
  
  // Change button text
  if (lowerMessage.includes('change button text') || 
      lowerMessage.includes('change the button text') ||
      lowerMessage.includes('button label')) {
    const regex = /change (?:the )?button (?:text|label)(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeButtonText', value: match[1].trim() };
    }
  }
  
  // Change button color
  if (lowerMessage.includes('change button color') || 
      lowerMessage.includes('change the button color')) {
    const colorRegex = /#[0-9a-f]{3,6}|(?:blue|red|green|yellow|purple|orange|black|white|gray|pink)/i;
    const match = message.match(colorRegex);
    if (match) {
      return { type: 'changeButtonColor', value: match[0].toLowerCase() };
    }
  }
  
  // Change footer text
  if (lowerMessage.includes('change footer text') || 
      lowerMessage.includes('change the footer text') ||
      lowerMessage.includes('update footer')) {
    const regex = /change (?:the )?footer(?: text)?(?: to)? ["']?([^"']+)["']?/i;
    const match = message.match(regex);
    if (match && match[1]) {
      return { type: 'changeFooterText', value: match[1].trim() };
    }
  }
  
  // If no intent was matched
  return { type: 'unknown' };
}