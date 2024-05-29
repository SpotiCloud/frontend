const defaults = {
    API_URL: 'http://localhost:5176',
  }
  
  const env = { ...defaults, ...process.env }
  
  export default env;
  