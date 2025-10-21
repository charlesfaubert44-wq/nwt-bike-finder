'use client';

import { useState, useEffect } from 'react';
import { ref, onValue, push, off, serverTimestamp } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';
import { uploadImage } from '@/lib/storage';
import { ChatMessage } from '@/types';

export function useChat(roomId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const messagesRef = ref(realtimeDb, `chats/${roomId}/messages`);
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.entries(messagesData).map(([id, message]: [string, any]) => ({
          id,
          ...message,
          timestamp: message.timestamp || new Date().toISOString()
        })) as ChatMessage[];
        
        // Sort by timestamp
        messagesList.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
      setLoading(false);
    });

    return () => {
      off(messagesRef, 'value', unsubscribe);
    };
  }, [roomId]);

  const sendMessage = async (message: string, senderId: string, senderName: string) => {
    if (!roomId || !message.trim()) return;

    try {
      const messagesRef = ref(realtimeDb, `chats/${roomId}/messages`);
      await push(messagesRef, {
        message: message.trim(),
        senderId,
        senderName,
        timestamp: serverTimestamp(),
        type: 'text'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    }
  };

  const sendImage = async (image: File, senderId: string, senderName: string) => {
    if (!roomId || !image) return;

    try {
      // Upload image to Firebase Storage
      const imagePath = `chats/${roomId}/${Date.now()}_${image.name}`;
      const imageUrl = await uploadImage(image, imagePath);

      // Send message with image URL
      const messagesRef = ref(realtimeDb, `chats/${roomId}/messages`);
      await push(messagesRef, {
        message: 'Image',
        senderId,
        senderName,
        timestamp: serverTimestamp(),
        type: 'image',
        imageUrl
      });
    } catch (error) {
      console.error('Error sending image:', error);
      setError('Failed to send image');
      throw error;
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    sendImage
  };
}
