using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
      
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ChatController> _logger;

        public ChatController(ApplicationDbContext context, ILogger<ChatController> logger)
        {
            _logger = logger;
            _context = context;
           

        }

        [HttpGet]
        [Route("GetUserChatMessage")]
        public async Task<IActionResult> GetUserChatMessage()
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var users = await _context.Users.ToListAsync();
                    
                    return Ok("");
                }

            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS" });

        }





        [HttpDelete]
        [Route("DeleteUserChatMessage")]
        public async Task<IActionResult> DeleteUserChatMessage(Message message)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var users = await _context.Users.ToListAsync();

                    return Ok("");
                }

            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS" });

        }



        [HttpPost]
        [Route("LiveChat")]
        public async Task<IActionResult> LiveChat(Message message)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var users = await _context.Users.ToListAsync();

                    return Ok("");
                }

            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS" });

        }


    }
}
