import React, { createContext, useContext, useState, useEffect } from 'react';
import { testUsers, testSessions, testMessages, testCourses, testResults } from './testData';

interface DataContextType {
  // Users
  users: any[];
  updateUser: (user: any) => void;
  
  // Sessions
  sessions: any[];
  addSession: (session: any) => void;
  updateSession: (sessionId: string, updates: any) => void;
  
  // Messages
  messages: any[];
  addMessage: (message: any) => void;
  markMessageAsRead: (messageId: string) => void;
  
  // Courses
  courses: any[];
  enrollInCourse: (courseId: string, userId: string) => void;
  
  // Test Results
  testResultsData: any[];
  addTestResult: (result: any) => void;
  
  // Refresh data
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState(testUsers);
  const [sessions, setSessions] = useState(testSessions);
  const [messages, setMessages] = useState(testMessages);
  const [courses, setCourses] = useState(testCourses);
  const [testResultsData, setTestResultsData] = useState(testResults);

  // Charger les données du localStorage au démarrage
  useEffect(() => {
    const savedUsers = localStorage.getItem('osrati_users');
    const savedSessions = localStorage.getItem('osrati_sessions');
    const savedMessages = localStorage.getItem('osrati_messages');
    const savedCourses = localStorage.getItem('osrati_courses');
    const savedTestResults = localStorage.getItem('osrati_test_results');

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedSessions) setSessions(JSON.parse(savedSessions));
    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedCourses) setCourses(JSON.parse(savedCourses));
    if (savedTestResults) setTestResultsData(JSON.parse(savedTestResults));
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('osrati_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('osrati_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('osrati_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('osrati_test_results', JSON.stringify(testResultsData));
  }, [testResultsData]);

  const addSession = (session: any) => {
    const newSession = {
      ...session,
      id: `session-${Date.now()}`,
      status: 'scheduled'
    };
    setSessions(prev => [...prev, newSession]);
  };

  const updateSession = (sessionId: string, updates: any) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId ? { ...session, ...updates } : session
      )
    );
  };

  const addMessage = (message: any) => {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const enrollInCourse = (courseId: string, userId: string) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === courseId 
          ? { 
              ...course, 
              participants: course.participants.includes(userId) 
                ? course.participants 
                : [...course.participants, userId]
            }
          : course
      )
    );

    // Ajouter une notification au formateur du cours
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const user = users.find(u => u.id === userId);
      addMessage({
        senderId: 'system',
        receiverId: course.instructorId,
        content: `طالب جديد ${user?.name} انضم للدورة: ${course.title}`,
        type: 'notification'
      });
    }
  };

  const updateUser = (updatedUser: any) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? { ...user, ...updatedUser, updatedAt: new Date().toISOString() } : user
    ));
    // Sauvegarder dans localStorage
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? { ...user, ...updatedUser, updatedAt: new Date().toISOString() } : user
    );
    localStorage.setItem('osrati_users', JSON.stringify(updatedUsers));
  };

  const addTestResult = (result: any) => {
    const newResult = {
      ...result,
      id: `test-${Date.now()}`,
      completedAt: new Date().toISOString()
    };
    setTestResultsData(prev => [...prev, newResult]);
  };

  const refreshData = () => {
    // Forcer un rafraîchissement des données
    setSessions([...sessions]);
    setMessages([...messages]);
    setCourses([...courses]);
    setTestResultsData([...testResultsData]);
  };

  const value = {
    users,
    updateUser,
    sessions,
    addSession,
    updateSession,
    messages,
    addMessage,
    markMessageAsRead,
    courses,
    enrollInCourse,
    testResultsData,
    addTestResult,
    refreshData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataProvider;