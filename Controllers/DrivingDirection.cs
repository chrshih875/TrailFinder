using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers
{

public class DrivingInput : Controller
{
    [HttpGet("/direction")]
    public async Task<string> GetDirections(DrivingDirection input)
    {
        try
        {
            string newOrigin = input.Origin.Replace(",", "%").Replace(" ", "%").Replace("&", "%");
            string newEndpoint = input.Endpoint.Replace(",", "%").Replace(" ", "%").Replace("&", "%");
            var client = new HttpClient();
            var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://driving-directions1.p.rapidapi.com/get-directions?origin={newOrigin}&destination={newEndpoint}&avoid_routes=tolls%2Cferries&country=us&language=en"),
            Headers =
            {
                { "X-RapidAPI-Key", "ce488d6175mshd2b44358611a4acp18b00ejsne323d1f14bf7" },
                { "X-RapidAPI-Host", "driving-directions1.p.rapidapi.com" },
            },
        };
        Console.WriteLine(request.RequestUri);

        // using (var response = await client.SendAsync(request))
        {
        //     response.EnsureSuccessStatusCode();
        //     var body = await response.Content.ReadAsStringAsync();
        //     Console.WriteLine(body);
        return "huh";
            // return body;
        }
        }
        catch (Exception e)
        {
            return e.Message;
        }
    }

}
}
