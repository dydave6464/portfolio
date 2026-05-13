import { BubbleChat } from 'flowise-embed-react'

const chatflowid = import.meta.env.VITE_FLOWISE_CHATFLOW_ID
const apiHost = import.meta.env.VITE_FLOWISE_API_HOST

export default function ChatBot() {
  if (!chatflowid || !apiHost) return null

  return (
    <BubbleChat
      chatflowid={chatflowid}
      apiHost={apiHost}
      theme={{
        button: {
          backgroundColor: '#3a4a5e',
          right: 24,
          bottom: 24,
          size: 48,
          iconColor: '#f4f6f8',
        },
        chatWindow: {
          showTitle: true,
          title: "Dave's portfolio assistant",
          titleAvatarSrc: '',
          welcomeMessage:
            "Hi — ask me anything about Dave's work, projects, or how to get in touch.",
          errorMessage: 'Something went wrong. Please try again.',
          backgroundColor: '#f4f6f8',
          fontSize: 15,
          poweredByTextColor: '#5e6770',
          botMessage: {
            backgroundColor: '#e9ecf0',
            textColor: '#0f1318',
            showAvatar: false,
          },
          userMessage: {
            backgroundColor: '#3a4a5e',
            textColor: '#f4f6f8',
            showAvatar: false,
          },
          textInput: {
            placeholder: "Ask about Dave's work…",
            backgroundColor: '#ffffff',
            textColor: '#0f1318',
            sendButtonColor: '#3a4a5e',
          },
        },
      }}
    />
  )
}
