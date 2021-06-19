using AutoMapper;
using AutoMapper.QueryableExtensions;
using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
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

        
        // @Role
        // ACCESS : ADMIN, MANAGER , ADMINISTRATOR
        //DESC : return all users chat message

        [HttpGet]
        [Route("AllChatMessages")]
        public async Task<IActionResult> AllChatMessages()
        {

            var statusCode = 400;
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    if (UserID != null)
                    {
                        var userrole = _context.UserRoles.Where(x => x.UserId == UserID).FirstOrDefault();
                        if (userrole != null)
                        {
                            var rolename = _context.Roles.Where(x => x.Id == userrole.RoleId).FirstOrDefault();
                            if (rolename.Name == Role.Admin || rolename.Name == Role.Manager || rolename.Name == Role.Administrator)
                            {
                                var users = await _context.Users.ToListAsync();
                                var mapper = InitializeAutomapper();

                                var Chatdata = await _context.ChatTables
                                                      .Include(x => x.User)
                                                      .ProjectTo<ChatTableDto>(mapper.ConfigurationProvider)
                                                      .ToListAsync();


                                statusCode = 200;

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
                        else
                        {
                            return Ok(new { status = "Access Denied", statusCode = 403 });
                        }

                    }
                    else
                    {
                        statusCode = 500;
                    }

                }

            }       
            catch (Exception)
            {
                return Ok(new { status = "FAILED" , statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS" , statusCode = statusCode });

        }


        // @User
        // ACCESS : ADMIN , MANAGER ,ADMINISTRATOR , User
        //DESC : return chat list for a user currently logged in

        [HttpGet]
        [Route("GetUserChatMessage")]
        public async Task<IActionResult> GetUserChatMessage()
        {
            try
            {

                if (ModelState.IsValid)
                {

                   
                    if(User.FindFirst(ClaimTypes.NameIdentifier).Value != null)
                    {
                        var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                        var mapper = InitializeAutomapper();
                        var Message = await _context.ChatTables
                             .Include(x => x.User)
                             .Include(x => x.Admin)
                             .Where(x => x.UserId == UserID)
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

                        return Ok(new { data = Message });
                    }
                    
                   
                }

            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS" });

        }



        // @Role
        // ACCESS : MANAGER , ADMINISTRATOR
        //DESC : return chat list for a user currently logged in


        [HttpDelete]
        [Route("DeleteUserChatMessage")]
        public async Task<IActionResult> DeleteUserChatMessage(ChatTable chat)
        {

            var statusCode = 400;
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    if (UserID != null)
                    {
                        var userrole = _context.UserRoles.Where(x => x.UserId == UserID).FirstOrDefault();
                        if (userrole != null)
                        {
                            var rolename = _context.Roles.Where(x => x.Id == userrole.RoleId).FirstOrDefault();
                            if (rolename.Name == Role.Manager || rolename.Name == Role.Administrator)
                            {
                                var Chat = await _context.ChatTables.Where(x => x.ChatTableId == chat.ChatTableId).FirstOrDefaultAsync();
                                _context.ChatTables.Remove(Chat);
                                await _context.SaveChangesAsync();

                                statusCode = 200;
                            }

                        }
                        else
                        {
                            return Ok(new { status = "Access Denied", statusCode = 403 });
                        }

                    }
                    else
                    {
                        statusCode = 500;
                    }

                }

            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" , statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS" , statusCode = statusCode });

        }



        // @Role
        // ACCESS : MANAGER ,ADMINISTRATOR
        //DESC : delete multiple chat list at a time

        [HttpDelete]
        [Route("DeleteMultipleUserMessage")]
        public async Task<IActionResult> DeleteMultipleUserMessage([FromBody] MultiplChatId Chat)
        {

            var statusCode = 400;
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    if (UserID != null)
                    {
                        var userrole = _context.UserRoles.Where(x => x.UserId == UserID).FirstOrDefault();
                        if (userrole != null)
                        {
                            var rolename = _context.Roles.Where(x => x.Id == userrole.RoleId).FirstOrDefault();
                            if (rolename.Name == Role.Admin || rolename.Name == Role.Manager || rolename.Name == Role.Administrator)
                            {
                                var size = 0;
                                if (Chat.chat == null)
                                {
                                    size = 0;
                                }
                                else
                                {
                                    size = Chat.chat.Count;
                                }
                                for (int i = 0; i < size; i++)
                                {
                                    var Chat2 = await _context.ChatTables
                                                       .Where(x => x.ChatTableId == Chat.chat[i])
                                                       .FirstOrDefaultAsync();


                                    _context.ChatTables.Remove(Chat2);


                                }

                                await _context.SaveChangesAsync();
                                statusCode = 200;
                            }

                        }
                        else
                        {
                            return Ok(new { status = "Access Denied", statusCode = 403 });
                        }

                    }
                    else
                    {
                        statusCode = 500;
                    }

                }

            }       
            catch (Exception)
            {

                statusCode = 400;
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED", statusCode = statusCode });


            }

            return Ok(new { status = "DATA DELETED SUCCESSFULLY", message = "SUCCESS", statusCode = statusCode });
        }




        // @User
        // ACCESS : MANAGER ,ADMINISTRATOR , ADMIN , USER
        //DESC :  real time chat via signalR

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
                    var Adminconnection = "AdminTableConnection";
                    var sendCode = 1;
                    await _SignalRHub.Clients.All.SendAsync(connection, sendCode, message.Messages);
                    await _SignalRHub.Clients.All.SendAsync(Adminconnection, sendCode, message.Messages, UserID);

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
                                AdminId = "f4561b17-8499-4665-833b-f8bc5e91338b"

                            };

                            await _context.AddAsync(ChatTable);
                            await _context.SaveChangesAsync();
                           

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

                }

            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode });

        }



        // @Role
        // ACCESS : MANAGER , ADMINISTRATOR , ADMIN
        //DESC : administrator real time chat via SignalR


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
                                AdminId = "f4561b17-8499-4665-833b-f8bc5e91338b"

                            };

                            await _context.AddAsync(ChatTable);
                            await _context.SaveChangesAsync();
                          

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
                }

            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode });

        }
    }


    public class MultiplChatId
    {
        public virtual List<int>? chat { get; set; }

    }

}
