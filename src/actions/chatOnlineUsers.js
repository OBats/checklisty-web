export default function chatOnlineUsers(onlineUsers) {
  return {
    type: 'GET_CHAT_ONLINE_USERS',
    payload: onlineUsers,
  };
}
