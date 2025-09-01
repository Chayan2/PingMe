import axios from 'axios';
let chatService = (message,chatHistory) => {
    
  return axios.post('http://localhost:5000/api/chat', { "messages": message,"chatHistory":chatHistory 

   })
    .then(response => {
      console.log('Message sent:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error sending message:', error);
      return { error: 'Failed to send message' };
    });
}

export default chatService;
