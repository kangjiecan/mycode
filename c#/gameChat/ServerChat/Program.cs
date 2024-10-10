using System;
using System.Threading.Tasks;
using ChatLibrary;

namespace ServerChat
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Chat Server");
            Console.Write("Enter port number: ");
            if (!int.TryParse(Console.ReadLine(), out int port))
            {
                Console.WriteLine("Invalid port number. Using default port 8888.");
                port = 8888;
            }

            var server = new ChatServer();
            await server.StartAsync(port);
        }
    }
}