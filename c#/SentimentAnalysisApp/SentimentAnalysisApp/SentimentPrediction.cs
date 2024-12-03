using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ML.Data;


namespace SentimentAnalysisApp
{



    public class SentimentPrediction
    {
        [ColumnName("Score")]
        public float Points { get; set; }
    }
}


