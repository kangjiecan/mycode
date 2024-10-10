using System;
using System.Collections.Concurrent;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace ChatLibrary
{
    public class ChatClient
    {
        private Socket _clientSocket;
        private const int BufferSize = 1024;

        public event EventHandler<string> MessageReceived;

        public async Task ConnectAsync(string ipAddress, int port)
        {
            _clientSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            await _clientSocket.ConnectAsync(IPAddress.Parse(ipAddress), port);
            Console.WriteLine("Connected to server.");
            _ = ReceiveMessagesAsync();
        }

        public async Task SendMessageAsync(string message)
        {
            byte[] messageBytes = Encoding.UTF8.GetBytes(message);
            await _clientSocket.SendAsync(new ArraySegment<byte>(messageBytes), SocketFlags.None);
        }

        private async Task ReceiveMessagesAsync()
        {
            while (true)
            {
                byte[] buffer = new byte[BufferSize];
                int received = await _clientSocket.ReceiveAsync(new ArraySegment<byte>(buffer), SocketFlags.None);
                if (received == 0) break;
                string message = Encoding.UTF8.GetString(buffer, 0, received);
                MessageReceived?.Invoke(this, message);
            }
        }

        public void Disconnect()
        {
            _clientSocket?.Close();
        }
    }

    public class ChatServer
    {
        private Socket _serverSocket;
        private const int BufferSize = 1024;
        private ConcurrentDictionary<string, Socket> _clients = new ConcurrentDictionary<string, Socket>();

        public async Task StartAsync(int port)
        {
            _serverSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            _serverSocket.Bind(new IPEndPoint(IPAddress.Any, port));
            _serverSocket.Listen(10);
            Console.WriteLine($"Server started on port {port}. Waiting for connections...");

            while (true)
            {
                Socket clientSocket = await _serverSocket.AcceptAsync();
                string clientId = Guid.NewGuid().ToString();
                _clients.TryAdd(clientId, clientSocket);
                _ = HandleClientAsync(clientSocket, clientId);
            }
        }

        private async Task HandleClientAsync(Socket clientSocket, string clientId)
        {
            Console.WriteLine($"Client connected: {clientSocket.RemoteEndPoint} (ID: {clientId})");

            try
            {
                while (true)
                {
                    byte[] buffer = new byte[BufferSize];
                    int received = await clientSocket.ReceiveAsync(new ArraySegment<byte>(buffer), SocketFlags.None);
                    if (received == 0) break;
                    string message = Encoding.UTF8.GetString(buffer, 0, received);
                    Console.WriteLine($"Received from {clientId}: {message}");

                    // Broadcast the message to all other connected clients
                    await BroadcastMessageAsync($"{clientId}: {message}", clientId);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error handling client {clientId}: {ex.Message}");
            }
            finally
            {
                _clients.TryRemove(clientId, out _);
                clientSocket.Close();
                Console.WriteLine($"Client disconnected: {clientId}");
            }
        }

        private async Task BroadcastMessageAsync(string message, string senderId)
        {
            byte[] messageBytes = Encoding.UTF8.GetBytes(message);
            foreach (var client in _clients)
            {
                if (client.Key != senderId)
                {
                    try
                    {
                        await client.Value.SendAsync(new ArraySegment<byte>(messageBytes), SocketFlags.None);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error sending to client {client.Key}: {ex.Message}");
                    }
                }
            }
        }
    }
}