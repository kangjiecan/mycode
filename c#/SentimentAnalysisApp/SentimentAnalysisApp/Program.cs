using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Transforms;
using System;
using System.Linq;

namespace SentimentAnalysisApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var mlContext = new MLContext();

            // Load data
            var rawData = mlContext.Data.LoadFromTextFile<SentimentData>(
                path: "C:\\Users\\kangj\\source\\repos\\SentimentAnalysisApp\\winemag-data-130k-v2.csv",
                hasHeader: true,
                separatorChar: ',');


            var rawDataEnumerable = mlContext.Data.CreateEnumerable<SentimentData>(rawData, reuseRowObject: false);

            // Count rows before cleaning
            var totalRowsBeforeCleaning = rawDataEnumerable.Count();
            Console.WriteLine($"Total rows before cleaning: {totalRowsBeforeCleaning}");

            // Filter out rows where Points or Price is NaN or zero
            var cleanedData = rawDataEnumerable
.Where(row => !string.IsNullOrWhiteSpace(row.Points.ToString()) && !string.IsNullOrWhiteSpace(row.Price.ToString())
                  && !float.IsNaN(row.Points) && !float.IsNaN(row.Price)).ToList();

            // Print total rows after cleaning
            Console.WriteLine($"Total rows after cleaning: {cleanedData.Count}");


            // Preview cleaned data
            Console.WriteLine("Cleaned Data Preview (first 5 rows):");
            foreach (var row in cleanedData.Take(5))
            {
                Console.WriteLine($"Country: {row.Country}, Points: {row.Points}, Price: {row.Price}, Description: {row.Description}");
            }

            // Convert back to IDataView after cleaning
            var trainTestData = mlContext.Data.TrainTestSplit(mlContext.Data.LoadFromEnumerable(cleanedData), testFraction: 0.2);
            var trainData = trainTestData.TrainSet;
            var testData = trainTestData.TestSet;

            // Define the pipeline with additional features
            var pipeline = mlContext.Transforms.Categorical.OneHotEncoding("CountryEncoded", "Country")
     .Append(mlContext.Transforms.Categorical.OneHotEncoding("ProvinceEncoded", "Province"))
     .Append(mlContext.Transforms.Categorical.OneHotEncoding("Region1Encoded", "Region_1"))
     .Append(mlContext.Transforms.Categorical.OneHotEncoding("TitleEncoded", "Title"))
     .Append(mlContext.Transforms.Categorical.OneHotEncoding("VarietyEncoded", "Variety"))
     .Append(mlContext.Transforms.Categorical.OneHotEncoding("WineryEncoded", "Winery"))
     .Append(mlContext.Transforms.Concatenate("Features", "CountryEncoded", "ProvinceEncoded", "Region1Encoded", "TitleEncoded", "VarietyEncoded", "WineryEncoded", "Price", "Points"))
     .Append(mlContext.Regression.Trainers.Sdca(labelColumnName: "Points", featureColumnName: "Features"));
            // Train the model
            Console.WriteLine("Training the model...");
            var stopwatch = System.Diagnostics.Stopwatch.StartNew();
            var model = pipeline.Fit(trainData);
            stopwatch.Stop();
            Console.WriteLine($"Model training completed in {stopwatch.Elapsed.TotalSeconds:F2} seconds.");

            // Evaluate the model
            var predictions = model.Transform(testData);
            var metrics = mlContext.Regression.Evaluate(predictions, labelColumnName: "Points");

            Console.WriteLine($"R^2 (Coefficient of Determination): {metrics.RSquared:F4}");
            Console.WriteLine($"RMSE (Root Mean Squared Error): {metrics.RootMeanSquaredError:F4}");

            Console.WriteLine("Testing completed successfully. Press any key to exit...");
            Console.ReadLine();
        }
    }
}