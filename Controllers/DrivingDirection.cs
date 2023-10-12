using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json.Linq;

namespace Controllers
{
public class DrivingInput : Controller
    {
        [HttpGet("/direction")]
        public async Task<ActionResult<object>> GetDirections([FromQuery] dynamic origin,  [FromQuery] dynamic destination)
        {
            try
            {
                Console.WriteLine(origin.json());
                Console.WriteLine(destination.json());

                string newOrigin = origin.Replace(",", "%").Replace(" ", "%").Replace("&", "%");
                string newEndpoint = destination.Replace(",", "%").Replace(" ", "%").Replace("&", "%");
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
                // using (var response = await client.SendAsync(request))
                return "rip";
                // {
                //     response.EnsureSuccessStatusCode();
                //     var body = await response.Content.ReadAsStringAsync();
                //     Console.WriteLine(body);
                //     JObject jsonObject = JObject.Parse(body);
                //     jsonObject["data"] == null ||
                //     if (string.IsNullOrWhiteSpace(jsonObject["data"]?.ToString())){
                //         throw new Exception();
                //     }
                //     else
                //     {
                //         return Ok(body);
                //     }
                // }
            }
            catch (Exception)
            {
                Console.WriteLine("ERROROROR");
                return "Location format is not suitable. Please provide a broader or more general location.";
            }
        }
    }
}
