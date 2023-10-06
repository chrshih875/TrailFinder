using System.Net.Http.Headers;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;


namespace Controllers
{

public class DrivingInput : Controller
{
    [HttpGet("/direction")]
    public async Task<ActionResult<DrivingDirection>> GetDirections(DrivingDirection input)
    {
        try
        {
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://driving-directions1.p.rapidapi.com/get-directions?origin={input.Origin}&destination={input.Endpoint}&avoid_routes=tolls%2Cferries&country=us&language=en"),
            Headers =
            {
                { "X-RapidAPI-Key", "ce488d6175mshd2b44358611a4acp18b00ejsne323d1f14bf7" },
                { "X-RapidAPI-Host", "driving-directions1.p.rapidapi.com" },
            },
        };
            Console.WriteLine("hehe");

        using (var response = await client.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            Console.WriteLine("Hello");
            Console.WriteLine(body);
            return CreatedAtAction(nameof(GetDirections), body);
        }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}
}
