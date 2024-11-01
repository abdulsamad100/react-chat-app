import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../JS Files/Firebase";

const ChatWindow = ({ selectedContact }) => {
  const { signin: { userLoggedIn } } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const usersRef = useRef({});
  
  useEffect(() => {
    if (!selectedContact) return;

    const userQuery = query(collection(db, "users+"));
    const messageQuery = query(
      collection(db, "messages", selectedContact, "chat"),
      orderBy("sentAt", "asc")
    );

    const unsubscribeUsers = onSnapshot(userQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        usersRef.current[doc.id] = doc.data();
      });
    });

    const unsubscribeMessages = onSnapshot(messageQuery, (snapshot) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const msgData = change.doc.data();
            newMessages.push({
              id: change.doc.id,
              ...msgData,
              user: usersRef.current[msgData.sentBy],
            });
          }
        });
        return newMessages;
      });
    });

    return () => {
      unsubscribeUsers();
      unsubscribeMessages();
    };
  }, [selectedContact]);

  const handleSend = async () => {
    if (input.trim()) {
      if (!userLoggedIn || !userLoggedIn.uid) {
        console.error("User is not logged in or UID is missing.");
        return;
      }
      
      try {
        await addDoc(collection(db, "messages", selectedContact, "chat"), {
          text: input,
          sentBy: userLoggedIn.uid,
          sentAt: serverTimestamp(),
        });
        setInput("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const handleDelete = async (messageId) => {
    try {
      await deleteDoc(doc(db, "messages", selectedContact, "chat", messageId));
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  const handleEdit = (message) => {
    setEditMode(message.id);
    setEditText(message.text);
  };

  const handleSaveEdit = async (messageId) => {
    try {
      await updateDoc(doc(db, "messages", selectedContact, "chat", messageId), {
        text: editText,
        sentAt: serverTimestamp(),
      });
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, text: editText } : msg
        )
      );
      setEditMode(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating message: ", error);
    }
  };

  if (!selectedContact) {
    return (
      <Box sx={{ height: "85vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6">Select a contact to start chatting</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "85vh" }}>
      <Box sx={{ flexGrow: 1, padding: 2, overflowY: "auto", borderBottom: "1px solid #ddd" }}>
        <Typography variant="h6" gutterBottom>
          Chat with {selectedContact}
        </Typography>
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                display: "flex",
                justifyContent: message.sentBy === userLoggedIn.uid ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  padding: 1.5,
                  borderRadius: 2,
                  backgroundColor: message.sentBy === userLoggedIn.uid ? "#b3e5fc" : "#1976d2",
                  color: message.sentBy === userLoggedIn.uid ? "#000" : "#fff",
                  position: "relative",
                }}
              >
                {message.sentBy === userLoggedIn.uid && (
                  <Box sx={{ position: "absolute", top: -10, right: -30 }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(message)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(message.id)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                <Tooltip title={message.user ? `${message.user.firstName} ${message.user.lastname}` : "Unknown"}>
                  <Typography variant="body2" fontWeight="bold">
                    {message.user ? `${message.user.firstName}` : "Unknown"}
                  </Typography>
                </Tooltip>
                {editMode === message.id ? (
                  <TextField
                    fullWidth
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => handleSaveEdit(message.id)}
                    variant="standard"
                  />
                ) : (
                  <Typography variant="body1">{message.text}</Typography>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: "flex", padding: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Type a message"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} variant="contained" color="primary" sx={{ marginLeft: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
