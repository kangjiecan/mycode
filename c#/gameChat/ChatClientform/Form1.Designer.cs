namespace ClientChatForm
{
    partial class Form1
    {
        private System.ComponentModel.IContainer components = null;
        private System.Windows.Forms.TextBox ChatTextBox;
        private System.Windows.Forms.TextBox inputTextBox;
        private System.Windows.Forms.Button sendButton;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem serverToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem connectToServerToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem disconnectFromServerToolStripMenuItem;

        private void InitializeComponent()
        {
            ChatTextBox = new TextBox();
            inputTextBox = new TextBox();
            sendButton = new Button();
            menuStrip1 = new MenuStrip();
            serverToolStripMenuItem = new ToolStripMenuItem();
            connectToServerToolStripMenuItem = new ToolStripMenuItem();
            disconnectFromServerToolStripMenuItem = new ToolStripMenuItem();
            menuStrip1.SuspendLayout();
            SuspendLayout();
            // 
            // ChatTextBox
            // 
            ChatTextBox.Location = new Point(12, 40);
            ChatTextBox.Multiline = true;
            ChatTextBox.Name = "ChatTextBox";
            ChatTextBox.ReadOnly = true;
            ChatTextBox.ScrollBars = ScrollBars.Vertical;
            ChatTextBox.Size = new Size(600, 250);
            ChatTextBox.TabIndex = 0;
            ChatTextBox.TextChanged += ChatTextBox_TextChanged;
            // 
            // inputTextBox
            // 
            inputTextBox.Location = new Point(12, 300);
            inputTextBox.Name = "inputTextBox";
            inputTextBox.Size = new Size(500, 23);
            inputTextBox.TabIndex = 1;
            // 
            // sendButton
            // 
            sendButton.Location = new Point(520, 300);
            sendButton.Name = "sendButton";
            sendButton.Size = new Size(90, 23);
            sendButton.TabIndex = 2;
            sendButton.Text = "Send";
            sendButton.UseVisualStyleBackColor = true;
            sendButton.Click += sendButton_Click;
            // 
            // menuStrip1
            // 
            menuStrip1.Items.AddRange(new ToolStripItem[] { serverToolStripMenuItem });
            menuStrip1.Location = new Point(0, 0);
            menuStrip1.Name = "menuStrip1";
            menuStrip1.Size = new Size(624, 24);
            menuStrip1.TabIndex = 3;
            menuStrip1.Text = "menuStrip1";
            // 
            // serverToolStripMenuItem
            // 
            serverToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] { connectToServerToolStripMenuItem, disconnectFromServerToolStripMenuItem });
            serverToolStripMenuItem.Name = "serverToolStripMenuItem";
            serverToolStripMenuItem.Size = new Size(51, 20);
            serverToolStripMenuItem.Text = "Server";
            // 
            // connectToServerToolStripMenuItem
            // 
            connectToServerToolStripMenuItem.Name = "connectToServerToolStripMenuItem";
            connectToServerToolStripMenuItem.Size = new Size(196, 22);
            connectToServerToolStripMenuItem.Text = "Connect to server";
            connectToServerToolStripMenuItem.Click += connectToServerToolStripMenuItem_Click;
            // 
            // disconnectFromServerToolStripMenuItem
            // 
            disconnectFromServerToolStripMenuItem.Name = "disconnectFromServerToolStripMenuItem";
            disconnectFromServerToolStripMenuItem.Size = new Size(196, 22);
            disconnectFromServerToolStripMenuItem.Text = "Disconnect from server";
            disconnectFromServerToolStripMenuItem.Click += disconnectFromServerToolStripMenuItem_Click;
            // 
            // Form1
            // 
            ClientSize = new Size(624, 361);
            Controls.Add(sendButton);
            Controls.Add(inputTextBox);
            Controls.Add(ChatTextBox);
            Controls.Add(menuStrip1);
            MainMenuStrip = menuStrip1;
            Name = "Form1";
            Text = "Chat Client";
            menuStrip1.ResumeLayout(false);
            menuStrip1.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }
    }
}
