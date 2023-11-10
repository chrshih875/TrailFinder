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
                string[] coords = info.Origin.Split(", ");
                if (coords.Length == 2 && double.TryParse(coords[0], out _) && double.TryParse(coords[1], out _))
                {
                    Console.WriteLine("Coordinates passed");
                }
                else
                {
                    // Input 1 is not coordinates, assume it's an address
                    info.Origin = info.Origin.Replace(",", "%").Replace(" ", "%").Replace("&", "%");
                    Console.WriteLine("Input 1 is not coordinates, assumed to be an address");
                }

                string[] coords1 = info.Endpoint.Split(", ");
                if (coords1.Length == 2 && double.TryParse(coords1[0], out _) && double.TryParse(coords1[1], out _))
                {
                    // It's coordinates, no further action needed
                    Console.WriteLine("Coordinates passed");
                }
                else
                {
                    // Handle the non-coordinate input
                    info.Endpoint = info.Endpoint.Replace(",", "%").Replace(" ", "%").Replace("&", "%");

                    Console.WriteLine("Non-coordinate input: " + coords1);
                }

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

                    JObject jsonObject = JObject.Parse(body);
                    Console.WriteLine("AHAHAHA");
                    Console.WriteLine(jsonObject);
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
