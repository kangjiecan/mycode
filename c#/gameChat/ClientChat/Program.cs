using System;
using System.Threading.Tasks;
using ChatLibrary;

namespace ClientChat
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Chat Client");
            Console.Write("Enter server IP address: ");
            string ipAddress = Console.ReadLine() ?? "127.0.0.1";

            Console.Write("Enter server port: ");
            if (!int.TryParse(Console.ReadLine(), out int port))
            {
                Console.WriteLine("Invalid port number. Using default port 8888.");
                port = 8888;
            }

            var client = new ChatClient();
            client.MessageReceived += (sender, message) =>
            {
                Console.WriteLine(message);
            };

            try
            {
                await client.ConnectAsync(ipAddress, port);

                Console.WriteLine("Connected to server. Type your messages (or 'exit' to quit):");

                while (true)
                {
                    string message = Console.ReadLine() ?? "";
                    if (message.ToLower() == "exit") break;

                    await client.SendMessageAsync(message);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
            finally
            {
                client.Disconnect();
            }
        }
    }
}