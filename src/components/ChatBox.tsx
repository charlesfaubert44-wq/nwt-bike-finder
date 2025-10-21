'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Send, MessageCircle, User, Image as ImageIcon, X } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import { sanitizeChatMessage } from '@/lib/sanitize';

interface ChatBoxProps {
  roomId: string;
  className?: string;
}

export function ChatBox({ roomId, className }: ChatBoxProps) {
  const { user } = useAuth();
  const { messages, loading, error, sendMessage, sendImage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !selectedImage) || !user || sending) return;

    setSending(true);
    try {
      if (selectedImage) {
        await sendImage(selectedImage, user.uid, user.displayName || 'Anonymous');
        setSelectedImage(null);
        setImagePreview(null);
      } else if (newMessage.trim()) {
        const sanitizedMessage = sanitizeChatMessage(newMessage);
        if (sanitizedMessage) {
          await sendMessage(sanitizedMessage, user.uid, user.displayName || 'Anonymous');
        }
      }
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <MessageCircle className="h-8 w-8 text-primary animate-pulse mx-auto mb-2" />
            <p className="text-slate-gray">Loading chat...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-danger mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-primary" />
          Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-slate-gray/60 py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwn = user && message.senderId === user.uid;
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isOwn
                        ? 'bg-primary text-white'
                        : 'bg-frost-gray text-slate-gray'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="h-3 w-3" />
                      <span className="text-xs font-medium">
                        {isOwn ? 'You' : message.senderName}
                      </span>
                    </div>
                    {message.type === 'image' && message.imageUrl ? (
                      <div className="mt-2">
                        <img
                          src={message.imageUrl}
                          alt="Shared image"
                          className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(message.imageUrl, '_blank')}
                        />
                      </div>
                    ) : (
                      <p className="text-sm">{message.message}</p>
                    )}
                    <p className={`text-xs mt-1 ${
                      isOwn ? 'text-white/70' : 'text-slate-gray/60'
                    }`}>
                      {formatDateTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {user && (
          <div className="border-t border-frost-gray p-4">
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3 relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-xs max-h-32 rounded-lg border border-frost-gray"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-danger text-white rounded-full p-1 hover:bg-danger/80 transition-colors"
                  disabled={sending}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={sending || !!selectedImage}
                title="Attach image"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={selectedImage ? "Add a caption (optional)..." : "Type your message..."}
                className="flex-1 px-3 py-2 border border-frost-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={sending}
              />
              <Button
                type="submit"
                disabled={(!newMessage.trim() && !selectedImage) || sending}
                size="icon"
                title="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {!user && (
          <div className="border-t border-frost-gray p-4 text-center">
            <p className="text-slate-gray/60 text-sm">
              Please sign in to participate in the chat
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
