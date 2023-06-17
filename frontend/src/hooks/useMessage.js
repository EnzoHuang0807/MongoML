import { createContext, useContext, useState } from 'react';

const REGULAR_MESSAGE_COLOR = '#3d84b8';
const ERROR_MESSAGE_COLOR = '#fb3640';

const MessageContext = createContext({
  messages: [],
  db_options: [],

  addCardMessage: () => {},
  removeMessage: () => {},
  addErrorMessage: () => {},
  setDBOptions: () => {}
});

const makeMessage = (message, color) => {
  return { message, color };
};

const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [db_options, setDBOptions] = useState([]);

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
        db_options,
        addRegularMessage,
        removeMessage,
        addErrorMessage,
        setDBOptions,
      }}
      {...props}
    />
  );
};

function useMessage() {
  return useContext(MessageContext);
}

export { MessageProvider, useMessage };
