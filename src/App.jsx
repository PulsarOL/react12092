import { useState, useEffect, useRef } from 'react'
import { db } from './firebase'
import {
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy
} from 'firebase/firestore'

import './App.css'

function App() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [sender, setSender] = useState('Ольга')
    const messagesEndRef = useRef(null)
    useEffect(() => {
        const q = query(
            collection(db, 'messages'),
            orderBy('createdAt', 'asc')
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setMessages(messagesData)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [messages])

  const sendMessage = async () => {
    const text = message.trim()
    if (!text) return


      await addDoc(collection(db, 'messages'), {
          text: text,
          sender: sender,
          createdAt: serverTimestamp()
      })

      setMessage('')
  }

  return (
      <main className="chat">
        <h1>Olga's little chat</h1>

        <form
            onSubmit={(event) => {
              event.preventDefault()
              sendMessage()
            }}
        >

            <select
                value={sender}
                onChange={(event) => setSender(event.target.value)}
            >
                <option value="Ольга">Ольга</option>
                <option value="Друг">Друг</option>
            </select>

            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Введи повідомлення..."
          />

          <button type="submit">Надіслати</button>
        </form>

          <section className="messages">
              {messages.map((item) => (

                  <div
                      key={item.id}
                      className={`message ${item.sender === 'Ольга' ? 'my-message' : 'other-message'}`}
                  >
                      <strong className="message-sender">
                          {item.sender || 'Невідомий автор'}
                      </strong>

                      <div>{item.text}</div>

                      <small>
                          {item.createdAt?.toDate
                              ? item.createdAt.toDate().toLocaleTimeString('uk-UA', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                              })
                              : '...'}
                      </small>
                  </div>
              ))}
              <div ref={messagesEndRef} />
          </section>
      </main>
  )
}

export default App
