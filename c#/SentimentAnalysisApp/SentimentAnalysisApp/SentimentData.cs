using Microsoft.ML.Data;

public class SentimentData
{
    [LoadColumn(1)] public string Country { get; set; }        // Column B: Country
    [LoadColumn(2)] public string Description { get; set; }    // Column C: Description
    [LoadColumn(3)] public string Designation { get; set; }    // Column D: Designation
    [LoadColumn(4)] public float Points { get; set; }          // Column E: Points
    [LoadColumn(5)] public float Price { get; set; }           // Column F: Price
    [LoadColumn(6)] public string Province { get; set; }       // Column G: Province
    [LoadColumn(7)] public string Region_1 { get; set; }       // Column H: Region_1
    [LoadColumn(11)] public string Title { get; set; }         // Column L: Title
    [LoadColumn(12)] public string Variety { get; set; }       // Column M: Variety
    [LoadColumn(13)] public string Winery { get; set; }        // Column N: Winery
}
