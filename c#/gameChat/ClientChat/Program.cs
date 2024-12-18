﻿using System;
using System.Threading.Tasks;
using ChatLibrary;

namespace ClientChat
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Chat Client");

            // Hard-code the IP address and port
            string ipAddress = "127.0.0.1";
            int port = 8888;

            Console.WriteLine($"Using IP address: {ipAddress}");
            Console.WriteLine($"Using port: {port}");

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