using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
    public class PostController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PostController> _logger;


        public PostController(ApplicationDbContext context, ILogger<PostController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;

        }


        [HttpGet]
        [Route("AdminGetAllpost")]
        public async Task<IActionResult> AdminGetAllpost()
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var users = _context.Users.ToList();
                    var Post = await _context.Post.ToListAsync();
                    return Ok(new { data = Post });
                }


            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS" });

        }




        [HttpPost]
        [Route("ChangePostApproval")]
        public object ChangePostApproval([FromBody] Post post)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var Post1 = _context.Post.FirstOrDefault(u => u.PostId == post.PostId);


                    if (Post1 != null)
                    {
                        if (Post1.Approved == "PENDING")
                        {
                            Post1.Approved = "APPROVED";
                        }
                        else
                        {
                            Post1.Approved = "PENDING";
                        }

                        _context.SaveChanges();
                    }


                }
            }
            catch (Exception)
            {


                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });


            }

            return Ok(new { status = "DATA DELETED SUCCESSFULLY", message = "SUCCESS" });
        }


        [HttpPost]
        [Route("DeletPost")]
        public object DeletPost([FromBody] Post post)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                    var post1 = _context.Post.FirstOrDefault(u => u.PostId == post.PostId);
                    _context.Post.Remove(post1);
                    _context.SaveChanges();



                }
            }
            catch (Exception)
            {


                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });


            }
            return Ok(new { status = "DATA DELETED SUCCESSFULLY", message = "SUCCESS" });
        }




        [HttpGet]
        [Route("GetUserAllpost")]
        public async Task<IActionResult> GetUserAllpost()
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var users = _context.Users.ToList();
                    var Comments = await _context.Comments.ToListAsync();
                    var Post = await _context.Post.Where(c => c.Approved == "APPROVED").ToListAsync();
                    return Ok(new { data = Post });
                }


            }
            catch (Exception)
            {
                return Ok(new { status = "FAILED" });
            }

            return Ok(new { status = "SUCCESS" });

        }




       

        [HttpPost]
        [Route("CreatePost")]
        public object CreatePost([FromBody] Post post)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                    var post1 = new Post
                    {
                        DateTime = DateTime.Now,
                        PostContent = post.PostContent,
                        ClientId = UserID,
                        Approved = "PENDING"  // DEFAULT 0 FOR REQUEST APPROVAL


                    };

                    _context.Post.Add(post1);
                    _context.SaveChanges();


                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
            }

            return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });

        }




        [HttpPost]
        [Route("AddComment")]
        public object AddComment([FromBody] Comments comments)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

                    var comment = new Comments
                    {
                        DateTime = DateTime.Now,
                        PostId = comments.PostId,
                        ClientId = UserID,
                        CommentContent = comments.CommentContent
                    };

                    _context.Comments.Add(comment);
                    _context.SaveChanges();


                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
            }

            return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });

        }



    }
}
