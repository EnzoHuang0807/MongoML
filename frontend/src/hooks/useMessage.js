import { createContext, useContext, useState } from 'react';

const REGULAR_MESSAGE_COLOR = '#3d84b8';
const ERROR_MESSAGE_COLOR = '#fb3640';

const MessageContext = createContext({
  messages: [],

  addCardMessage: () => {},
  removeMessage: () => {},
  addErrorMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addRegularMessage = (message) => {
    setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);
  };

  const removeMessage = () => {
    setMessages([]);
  };

  const addErrorMessage = (message) => {
    setMessages([makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addRegularMessage,
        removeMessage,
        addErrorMessage,
      }}
      {...props}
    />
  );
};

function useMessage() {
  return useContext(MessageContext);
}

export { MessageProvider, useMessage };
