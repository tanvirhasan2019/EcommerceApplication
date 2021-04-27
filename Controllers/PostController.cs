﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    [Authorize]
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
            catch (Exception)
            {

                return Ok((status: "SOMETHING WENT WRONG", message: "FAILED"));
            }

            return Ok((status: "DATA SAVED SUCCESSFULLY", message: "SUCCESS"));

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
                return Ok((status: "SOMETHING WENT WRONG", message: "FAILED"));
            }

            return Ok((status: "DATA SAVED SUCCESSFULLY", message: "SUCCESS"));

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
                    var Post = await _context.Post.OrderByDescending(b => b.PostId).ToListAsync();
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



        [HttpPost]
        [Route("AddDisLike")]
        public object AddDisLike([FromBody] PostLike Like)
        {

            int Like_count = 0;
            int DisLike_count = 0;
            try
            {

                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var likeisExist = _context.PostLikes.FirstOrDefault(u => u.PostId == Like.PostId && u.ClientId == UserID);
                    if (likeisExist is null)
                    {
                        var like = new PostLike
                        {
                            Like = -1,
                            PostId = Like.PostId,
                            ClientId = UserID
                        };

                        _context.PostLikes.Add(like);
                        DisLike_count = 1;

                    }
                    else if (likeisExist.Like == -1)
                    {

                        _context.PostLikes.Remove(likeisExist);
                        DisLike_count = -1;


                    }
                    else if (likeisExist.Like == 1)
                    {


                        likeisExist.Like = -1;
                        DisLike_count = 1;
                        Like_count = -1;

                    }

                    _context.SaveChanges();

                }
            }
            catch (Exception e)
            {
                    Console.WriteLine(e);
                    return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
            }


            return Ok(new
            {
                    status = "DATA SAVED SUCCESSFULLY",
                    message = "SUCCESS",
                    DisLike_count = DisLike_count,
                    Like_count = Like_count
            });

        }



        [HttpPost]
        [Route("AddUserLike")]
        public object AddUserLike([FromBody] PostLike Like)
        {

            int Like_count = 0;
            int DisLike_count = 0;
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var likeisExist = _context.PostLikes.FirstOrDefault(u => u.PostId == Like.PostId && u.ClientId == UserID);


                    if (likeisExist is null)
                    {
                        var like = new PostLike
                        {
                            Like = 1,
                            PostId = Like.PostId,
                            ClientId = UserID
                        };
                        _context.PostLikes.Add(like);
                        Like_count = 1;

                    }
                    else if (likeisExist.Like == 1)
                    {
                        _context.PostLikes.Remove(likeisExist);
                        Like_count = -1;


                    }
                    else if (likeisExist.Like == -1)
                    {


                        likeisExist.Like = 1;
                        Like_count = 1;
                        DisLike_count = -1;
                    }


                    _context.SaveChanges();


                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
            }


            return Ok(new
            {
                status = "DATA SAVED SUCCESSFULLY",
                message = "SUCCESS",
                Like_count = Like_count,
                DisLike_count = DisLike_count
            });

        }



        [HttpGet]
        [Route("GetUserAllpost")]
        public async Task<IActionResult> GetUserAllpost()
        {
            try
            {

                if (ModelState.IsValid)
                {


                    var mapper = InitializeAutomapper();
                    var post = await _context.Post                     
                      .Include(x => x.Client)
                      .Include(x => x.comments)
                      .Include(x => x.Likes)
                      .OrderByDescending(b => b.PostId)
                      .Where(c => c.Approved == "APPROVED")
                             .ProjectTo<PostDto>(mapper.ConfigurationProvider).ToListAsync();



                    static Mapper InitializeAutomapper()
                    {
                        var config = new MapperConfiguration(cfg => {
                            cfg.CreateMap<ApplicationUser, UserCustomcs>();
                            cfg.CreateMap<Comments, CommentsDto>();
                            cfg.CreateMap<PostLike, PostLikeDto>();
                            cfg.CreateMap<Post, PostDto>();
                        });
                        var mapper = new Mapper(config);
                        return mapper;
                    }




                    return Ok(new { data = post });


                }


            }
            catch (Exception e)
            {
                return Ok(new { status = "FAILED", e = e, });
            }

            return Ok(new { status = "SUCCESS" });

        }



       
        [HttpDelete]
        [Route("DeleteUserPost")]
        public object DeleteUserPost([FromBody] Post post)
        {

            var message = "";
            var statusCode = 400;
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    var getPost = _context.Post.
                        Where(u => u.ClientId == UserID && u.PostId == post.PostId).FirstOrDefault();

                    if (getPost != null)
                    {
                        _context.Post.Remove(getPost);
                        _context.SaveChanges();
                        message = "POST DELETED";
                        statusCode = 200;
                    }
                    else
                    {
                        message = "POST NOT FOUND";
                        statusCode = 400;
                    }
                   
                   
                   


                }
            }
            catch (Exception)
            {
               
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
            }


            return Ok(new
            {
                 message = message ,
                 statusCode= statusCode

            });

        }




        // ADMIN
        // DELETE MULTIPLE POST ID

        [HttpDelete]
        [Route("DeleteMultiplePost")]
        public object DeleteMultiplePost([FromBody] MultiplPostId list)
        {
            var statusCode = 400;
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    if (UserID != null)
                    {
                        for (int i = 0; i < list.id.Count; i++)
                        {
                            var Post = _context.Post.Where(u => u.PostId == list.id[i]).FirstOrDefault();

                          //  _context.Post.Remove(Post);


                        }

                       // _context.SaveChanges();
                        statusCode = 200;
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

            return Ok(new { status = "DATA DELETED SUCCESSFULLY", message = "SUCCESS" , statusCode = statusCode });
        }



    }


    public class MultiplPostId
    {
        public virtual List<int> id { get; set; }


    }
}
