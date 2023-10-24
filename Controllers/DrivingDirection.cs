using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json.Linq;

namespace Controllers
{
public class DrivingInput : Controller
    {
        [HttpGet("/direction")]
        public async Task<ActionResult<object>> GetDirections(DrivingDirection info)
        {
            try
            {
                Console.WriteLine("INFO");
                Console.WriteLine(info);
                // string newOrigin = info.Origin.Replace(",", "%").Replace(" ", "%").Replace("&", "%");
                // string newEndpoint = info.Endpoint.Replace(",", "%").Replace(" ", "%").Replace("&", "%");
                var client = new HttpClient();
                var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://driving-directions1.p.rapidapi.com/get-directions?origin={info.Origin}&destination={info.Endpoint}&avoid_routes=tolls%2Cferries&country=us&language=en"),
                Headers =
                {
                    { "X-RapidAPI-Key", "ce488d6175mshd2b44358611a4acp18b00ejsne323d1f14bf7" },
                    { "X-RapidAPI-Host", "driving-directions1.p.rapidapi.com" },
                },
            };
            Console.WriteLine("REQUEST URL");
            Console.WriteLine(request.RequestUri);
                using (var response = await client.SendAsync(request))
                {
                    response.EnsureSuccessStatusCode();
                    var body = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("HELLLO");
                    Console.WriteLine(body);
                    JObject jsonObject = JObject.Parse(body);
                    if (string.IsNullOrWhiteSpace(jsonObject["data"]?.ToString())){
                        throw new Exception();
                    }
                    else
                    {
                        return Ok(body);
                    }
                }
            }
            catch (Exception)
            {
                Console.WriteLine("ERROROROR");
                return "Location format is not suitable. Please provide a broader or more general location.";
            }
        }
    }
}
