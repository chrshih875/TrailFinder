using Models;
using Microsoft.AspNetCore.Mvc;
namespace Controllers
{
    public class TrailAPI : Controller
    {
        [HttpGet("/trails")]
        public async Task<ActionResult<object>> GetTrails([FromQuery] double latitude, [FromQuery] double longitude)
        {
            try
            {
                var client = new HttpClient();
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Get,
                    RequestUri = new Uri($"https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat={latitude}&lon={longitude}"),
                    Headers =
                    {
                        { "X-RapidAPI-Key", "ce488d6175mshd2b44358611a4acp18b00ejsne323d1f14bf7" },
                        { "X-RapidAPI-Host", "trailapi-trailapi.p.rapidapi.com" },
                    },
                };
                Console.WriteLine(request.RequestUri);
                using (var response = await client.SendAsync(request))
                {
                    response.EnsureSuccessStatusCode();
                    var body = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(body);
                    return Ok(body);
                }
            }
            catch (Exception)
                {
                    Console.WriteLine("ERROROROR");
                    return "Invalid longitude or latitude values. Please provide valid coordinates";
                }
            }
    }
}
