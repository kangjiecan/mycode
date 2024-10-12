using System;
using System.Windows.Forms;
using ChatLibrary; // Assuming this is your chat library for client-server handling

namespace ClientChat
{
    public partial class Form1 : Form
    {
        private ChatClient client;  // Declare the chat client

        public Form1()
        {
            InitializeComponent();
        }

        // Connect to the server when "Connect" is clicked on the menu
        private async void connectToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                string ipAddress = "127.0.0.1";  // Hardcoded IP for testing
                int port = 8888;  // Hardcoded port

                client = new ChatClient();
                client.MessageReceived += (sender, message) =>
                {
                    // Append received messages to the TextBox
                    chatTextBox.Invoke((MethodInvoker)delegate
                    {
                        chatTextBox.AppendText("Server: " + message + Environment.NewLine);
                    });
                };

                await client.ConnectAsync(ipAddress, port);
                MessageBox.Show("Connected to server!");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }

        // Disconnect from the server when "Disconnect" is clicked on the menu
        private void disconnectToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (client != null)
            {
                client.Disconnect();
                MessageBox.Show("Disconnected from server!");
            }
        }

        // Send a message when "Send" button is clicked
        private async void sendButton_Click(object sender, EventArgs e)
        {
            if (client != null)
            {
                string message = chatTextBox.Text;  // Get the message from the same TextBox

                if (!string.IsNullOrEmpty(message))
                {
                    // Append sent message to the TextBox
                    chatTextBox.AppendText("Me: " + message + Environment.NewLine);

                    await client.SendMessageAsync(message);  // Send the message to the server
                    chatTextBox.Clear();  // Clear the TextBox after sending (optional)
                }
            }
            else
            {
                MessageBox.Show("Not connected to server.");
            }
        }
    }
}
