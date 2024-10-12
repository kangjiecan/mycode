using System;
using System.Threading.Tasks;
using System.Windows.Forms;
using ChatLibrary;

namespace ClientChatForm
{
    public partial class Form1 : Form
    {
        private ChatClient _client;
        private string _ipAddress = "127.0.0.1";  // Adjust this if necessary
        private int _port = 8888;  // Adjust this if necessary

        public Form1()
        {
            InitializeComponent();
            _client = new ChatClient();
            _client.MessageReceived += Client_MessageReceived;
        }

        private void Client_MessageReceived(object sender, string message)
        {
            // Safely update the UI from a different thread
            if (InvokeRequired)
            {
                Invoke(new Action(() => ChatTextBox.AppendText(message + Environment.NewLine)));
            }
            else
            {
                ChatTextBox.AppendText(message + Environment.NewLine);
            }
        }

        // Connect to server when "Connect to server" is clicked
        private async void connectToServerToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                await _client.ConnectAsync(_ipAddress, _port);
                ChatTextBox.AppendText("Connected to server." + Environment.NewLine);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}");
            }
        }

        // Disconnect from server when "Disconnect from server" is clicked
        private void disconnectFromServerToolStripMenuItem_Click(object sender, EventArgs e)
        {
            _client.Disconnect();
            ChatTextBox.AppendText("Disconnected from server." + Environment.NewLine);
        }

        // Send message when the button is clicked
        private async void sendButton_Click(object sender, EventArgs e)
        {
            string message = inputTextBox.Text;
            if (!string.IsNullOrWhiteSpace(message))
            {
                await _client.SendMessageAsync(message);
                inputTextBox.Clear(); // Clear input after sending
            }
        }

        private void ChatTextBox_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
