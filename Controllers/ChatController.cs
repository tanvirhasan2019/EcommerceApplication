using AutoMapper;
using AutoMapper.QueryableExtensions;
using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EcommerceApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
      
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ChatController> _logger;
        private readonly IHubContext<SignalRService> _SignalRHub;

        public ChatController(ApplicationDbContext context, ILogger<ChatController> logger, IHubContext<SignalRService> SignalRHub)
        {
            _logger = logger;
            _context = context;
            _SignalRHub = SignalRHub;


        }

        // ADMIN  READ 
        [HttpGet]
        [Route("AllChatMessages")]
        public async Task<IActionResult> AllChatMessages()
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var users = await _context.Users.ToListAsync();
                    var mapper = InitializeAutomapper();

                    var Chatdata = await _context.ChatTables
                                          .Include(x=>x.User)
                                          .ProjectTo<ChatTableDto>(mapper.ConfigurationProvider)
                                          .ToListAsync();
                                         

                    

                    static Mapper InitializeAutomapper()
                    {
                        var config = new MapperConfiguration(cfg => {
                            cfg.CreateMap<ApplicationUser, UserCustomcs>();
                            cfg.CreateMap<ChatTable, ChatTableDto>();
                            
                        });
                        var mapper = new Mapper(config);
                        return mapper;
                    }


                    return Ok(new { data = Chatdata });
                }

            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS" });

        }



        [HttpGet]
        [Route("GetUserChatMessage")]
        public async Task<IActionResult> GetUserChatMessage()
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var mapper = InitializeAutomapper();
                    var Message = await _context.ChatTables
                         .Include(x => x.User)
                         .Include(x => x.Admin)
                         .Where(x=>x.UserId == UserID)                     
                         .ProjectTo<ChatTableDto>(mapper.ConfigurationProvider).ToListAsync();


                    static Mapper InitializeAutomapper()
                    {
                        var config = new MapperConfiguration(cfg => {
                            cfg.CreateMap<ApplicationUser, UserCustomcs>();
                            cfg.CreateMap<ChatTable, ChatTableDto>();

                        });
                        var mapper = new Mapper(config);
                        return mapper;
                    }

                    return Ok(new { data = Message } );
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
        [Route("CreateChat")]
        public async Task<IActionResult> CreateChat(Message message)
        {
            var statusCode = 400;
            var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            try
            {

                if (ModelState.IsValid)
                {

                    // await _SignalRHub.Clients.All.SendAsync("LoadMessages", message.Messages);
                    var connection = "connection" + UserID;
                    var sendCode = 1;
                    await _SignalRHub.Clients.All.SendAsync(connection, sendCode , message.Messages);

                    if (UserID != null)
                    {
                        var isChat = await _context.ChatTables
                                       .Where(x => x.UserId == UserID)
                                       .FirstOrDefaultAsync();

                        if(isChat != null)
                        {
                            var chatid = isChat.ChatTableId;

                            message.DateTime = DateTime.Now;
                            message.ChatTableId = chatid;
                            message.UserId = UserID;

                            await _context.Messages.AddAsync(message);
                            await _context.SaveChangesAsync();
                            statusCode = 200;

                        }
                        else
                        {
                            var ChatTable = new ChatTable
                            {
                                UserId = UserID,
                                AdminId = "9d005eb0-4879-4ce4-9823-ecece5d41aaa"

                            };

                            await _context.AddAsync(ChatTable);
                            await _context.SaveChangesAsync();
                            // _context.SaveChanges();


                            //ChatTable Chat = new ChatTable();

                            var chat = await _context.ChatTables
                                       .Where(x => x.UserId == UserID)
                                       .FirstOrDefaultAsync(); 

                            message.DateTime = DateTime.Now;
                            message.ChatTableId = chat.ChatTableId;
                            message.UserId = UserID;
                            await _context.Messages.AddAsync(message);
                            await _context.SaveChangesAsync();
                            statusCode = 200;

                        }
                    }
                    else
                    {
                        statusCode = 500;
                    }

                    //9d005eb0-4879-4ce4-9823-ecece5d41aaa
                    //  _ = _SignalRHub.Clients.All.SendAsync($"{UserID}");



                    // await _SignalRHub.Clients.All.SendAsync("LoadMessages", message);

                   // _SignalRHub.Clients.All.SendAsync("LoadMessages", message);

                  //  await _SignalRHub.Clients.All.SendAsync("LoadMessages", message);

                    //await _SignalRHub.Clients.Client(conn).SendAsync("LoadMessages", conn, message);


                }

            }
            catch (Exception e)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode });

        }


        [HttpPost]
        [Route("AdminCreateChat")]
        public async Task<IActionResult> AdminCreateChat(Message message)
        {
            var statusCode = 400;
            try
            {

                if (ModelState.IsValid)
                {
                    var sendCode = 2;
                    var connection = "connection" + message.UserId;
                    await _SignalRHub.Clients.All.SendAsync(connection, sendCode, message.Messages);

                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    if (UserID != null)
                    {
                        var isChat = await _context.ChatTables
                                       .Where(x => x.UserId == message.UserId)
                                       .FirstOrDefaultAsync();

                        if (isChat != null)
                        {
                            var chatid = isChat.ChatTableId;
                            message.DateTime = DateTime.Now;
                            message.ChatTableId = chatid;
                            message.UserId = UserID;

                            await _context.Messages.AddAsync(message);
                            await _context.SaveChangesAsync();
                            statusCode = 200;

                        }
                        else
                        {
                            var ChatTable = new ChatTable
                            {
                                UserId = message.UserId,
                                AdminId = UserID

                            };

                            await _context.AddAsync(ChatTable);
                            await _context.SaveChangesAsync();
                            // _context.SaveChanges();


                            //ChatTable Chat = new ChatTable();

                            var chat = await _context.ChatTables
                                       .Where(x => x.UserId == message.UserId)
                                       .FirstOrDefaultAsync();

                            message.DateTime = DateTime.Now;
                            message.ChatTableId = chat.ChatTableId;
                            message.UserId = UserID;
                            await _context.Messages.AddAsync(message);
                            await _context.SaveChangesAsync();
                            statusCode = 200;

                        }
                    }
                    else
                    {
                        statusCode = 500;
                    }

                    //9d005eb0-4879-4ce4-9823-ecece5d41aaa
                    //  _ = _SignalRHub.Clients.All.SendAsync($"{UserID}");

                    //  await _context.SaveChangesAsync();

                    // await _SignalRHub.Clients.All.SendAsync("LoadMessages", message);
                   // await _SignalRHub.Clients.All.SendAsync("LoadMessages", message.Messages);
                    //  $"Author: {author.Name}:{author.Book}:{author.Price}"


                }

            }
            catch (Exception e)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode });

        }




    }
}
