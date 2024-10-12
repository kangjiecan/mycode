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
          

            var server = new ChatServer();
            await server.StartAsync(8888);
        }
    }
}