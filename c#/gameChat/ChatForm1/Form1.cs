using System;
using System.Threading.Tasks;
using System.Windows.Forms;
using ChatLibrary; // Ensure this library is referenced properly for ChatClient

namespace ChatForm1
{
    public partial class Form1 : Form
    {
        private ChatClient _client;

        public Form1()
        {
            InitializeComponent();
        }

        // Event for form load
        private void Form1_Load(object sender, EventArgs e)
        {
            AppendMessage("Form Loaded, ready to connect...");
        }

        // Connect to the server
        private async void connectToolStripMenuItem_Click(object sender, EventArgs e)
        {
            // Debugging to check if the event is triggered
            MessageBox.Show("Connect button clicked!");

            string ipAddress = "127.0.0.1";  // Adjust IP and port as needed
            int port = 8888;

            _client = new ChatClient();

            AppendMessage($"Attempting to connect to server at {ipAddress}:{port}");

            _client.MessageReceived += OnMessageReceived;

            try
            {
                await _client.ConnectAsync(ipAddress, port);
                AppendMessage("Connected to the server...");
            }
            catch (Exception ex)
            {
                AppendMessage($"Error: {ex.Message}");
            }
        }

        // Disconnect from the server
        private void disconnectToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                _client?.Disconnect();
                AppendMessage("Disconnected from the server.");
            }
            catch (Exception ex)
            {
                AppendMessage($"Error disconnecting: {ex.Message}");
            }
        }

        // Send a message to the server
        private async void btnSend_Click(object sender, EventArgs e)
        {
            string message = textBox1.Text; // Using textBox1 for input and display

            if (!string.IsNullOrEmpty(message))
            {
                AppendMessage($"Sending message: {message}");

                try
                {
                    await _client.SendMessageAsync(message);
                    AppendMessage($"You: {message}");

                    textBox1.Clear();
                }
                catch (Exception ex)
                {
                    AppendMessage($"Error sending message: {ex.Message}");
                }
            }
        }

        // Receive a message from the server
        private void OnMessageReceived(object sender, string message)
        {
            Invoke((MethodInvoker)delegate
            {
                AppendMessage($"Server: {message}");
            });
        }

        // Append a message to the chat text box (textBox1)
        private void AppendMessage(string message)
        {
            textBox1.AppendText(message + Environment.NewLine);
        }
    }
}
