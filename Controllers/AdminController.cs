using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace EcommerceApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        // private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AdminController> _logger;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminController(ApplicationDbContext context, ILogger<AdminController> logger, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleMgr)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;
            _roleManager = roleMgr;

        }

      
        // @Role
        // ACCESS : ADMIN , MANAGER , ADMINISTRATOR
        //DESC : Check Role for Administrator

        [HttpGet]
        [Route("RoleCheck")]
        public async Task<IActionResult> RoleCheck()
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
                                statusCode = 200;
                            }
                        }                          
                        else
                        {
                            statusCode = 500;
                        }
                    }
                    else
                    {
                        statusCode = 500;
                    }

                }

            }
            catch (Exception e)
            {
                return Ok(new { status = "FAILED", statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode });
        }




        // @Role
        // ACCESS : ADMINISTRATOR
        //DESC : create role

        [HttpPost]
        [Route("CreateRole")]
        public async Task<IActionResult> CreateRole([FromBody] Admin admin)
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
                            if (rolename.Name == Role.Administrator)
                            {
                                var user = await _userManager.FindByIdAsync(admin.userid);
                                var roleExist = await _roleManager.RoleExistsAsync(Role.Admin);
                                if (!roleExist)
                                {
                                    var result = await _roleManager.CreateAsync(new IdentityRole(admin.rolename));
                                }

                                await _userManager.AddToRoleAsync(user, admin.rolename);
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
                return Ok(new { status = "FAILED", statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode });
        }



        // @Role
        // ACCESS : ADMIN , MANAGER , ADMINISTRATOR
        //DESC : add new product

        [HttpPost]
        [Route("CreateProduct")]
        public object CreateProduct([FromBody] Productnew products)
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
                                var product = new Product
                                {
                                    title = products.title,
                                    description = products.description,
                                    category = products.category,
                                    subcategory = products.subcategory,
                                    quantity = products.quantity,
                                    price = products.price,
                                    dateTime = DateTime.Now,
                                    AddedBy = UserID

                                };
                                _context.Products.Add(product);
                                _context.SaveChanges();

                                Product pr = new Product();
                                int FK_imageId = product.id;


                                var product_image = new ProductImage
                                {
                                    img1 = Encoding.ASCII.GetBytes(products.Img[0].img1.ToString()),
                                    img2 = Encoding.ASCII.GetBytes(products.Img[1].img2.ToString()),
                                    img3 = Encoding.ASCII.GetBytes(products.Img[2].img3.ToString()),
                                    img4 = Encoding.ASCII.GetBytes(products.Img[3].img4.ToString()),
                                    img5 = Encoding.ASCII.GetBytes(products.Img[4].img5.ToString()),
                                    productid = FK_imageId
                                };



                                _context.ProductImage.Add(product_image);
                                _context.SaveChanges();

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
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode , message = "SUCCESS" });
           

        }



        // @Role
        // ACCESS : ADMIN , MANAGER , ADMINISTRATOR
        //DESC : update any product

        [HttpPost]
        [Route("UpdateProduct")]
        public object UpdateProduct([FromBody] Productnew products)
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
                                var data = _context.Products.FirstOrDefault(x => x.id == products.id);

                                if (data != null)
                                {

                                    data.title = products.title;
                                    data.description = products.description;
                                    data.category = products.category;
                                    data.subcategory = products.subcategory;
                                    data.quantity = products.quantity;
                                    data.price = products.price;
                                    data.dateTime = DateTime.Now;
                                    data.AddedBy = UserID;


                                }


                                var data2 = _context.ProductImage.FirstOrDefault(x => x.productid == products.id);

                                if (data2 != null)
                                {

                                    data2.img1 = Encoding.ASCII.GetBytes(products.Img[0].img1.ToString());
                                    data2.img2 = Encoding.ASCII.GetBytes(products.Img[1].img2.ToString());
                                    data2.img3 = Encoding.ASCII.GetBytes(products.Img[2].img3.ToString());
                                    data2.img4 = Encoding.ASCII.GetBytes(products.Img[3].img4.ToString());
                                    data2.img5 = Encoding.ASCII.GetBytes(products.Img[4].img5.ToString());


                                }

                                _context.SaveChanges();
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
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" , statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode , message = "SUCCESS" });
           
        }



        // @Role
        // ACCESS : ADMINISTRATOR , MANAGER
        //DESC : delete any product

        [HttpPost]
        [Route("DeleteProductId")]
        public object DeleteProductId([FromBody] Product productid)
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
                                var id2 = productid.id;

                                var ProductImage = _context.ProductImage.Where(u => u.productid == productid.id);
                                foreach (var data in ProductImage)
                                {
                                    var x = data;
                                    _context.ProductImage.Remove(data);
                                }

                                _context.SaveChanges();

                                var Product = _context.Products.Where(u => u.id == productid.id);
                                foreach (var data in Product)
                                {
                                    var x = data;
                                    _context.Products.Remove(data);
                                }

                                _context.SaveChanges();

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
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" , statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode });
            

        }




        // @Role
        // ACCESS : ADMINISTRATOR , MANAGER
        //DESC : delete multiple  product at a time
        [HttpPost]
        [Route("DeleteMultipleProductId")]
        public object DeleteMultipleProductId([FromBody] MultipleProductId multipleProductId)
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
                                for (int i = 0; i < multipleProductId.id.Count; i++)
                                {
                                    var ProductImage = _context.ProductImage.Where(u => u.productid == multipleProductId.id[i]);

                                    foreach (var data in ProductImage)
                                    {

                                        _context.ProductImage.Remove(data);
                                    }

                                }


                                for (int i = 0; i < multipleProductId.id.Count; i++)
                                {
                                    var Product = _context.Products.Where(u => u.id == multipleProductId.id[i]);

                                    foreach (var data in Product)
                                    {

                                        _context.Products.Remove(data);
                                    }

                                }

                                _context.SaveChanges();
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
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" , statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode , message = "SUCCESS" });
            //return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });

        }




        // @Role
        // ACCESS : ADMINISTRATOR , MANAGER
        //DESC : delete any product

        [HttpPost]
        [Route("DeleteOrderItem")]
        public object DeleteOrderItem([FromBody] ClientOrder order)
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
                               

                                var ClientOrder = _context.ClientOrder.Where(u => u.Orderid == order.Orderid);
                                foreach (var data in ClientOrder)
                                {
                                    var x = data;
                                    _context.ClientOrder.Remove(data);
                                }

                                _context.SaveChanges();
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
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" , statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode , message = "SUCCESS" });

        }




        // @Role
        // ACCESS : ADMINISTRATOR , MANAGER
        //DESC : delete any Ordered item

        [HttpPost]
        [Route("DeleteOrderItems")]
        public object DeleteOrderItems([FromBody] MultipleProductId list)
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
                                for (int i = 0; i < list.id.Count; i++)
                                {
                                    var ClientOrders = _context.ClientOrder.Where(u => u.Orderid == list.id[i]);
                                    foreach (var data in ClientOrders)
                                    {
                                        var x = data;
                                        _context.ClientOrder.Remove(data);
                                    }

                                }

                                _context.SaveChanges();
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
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" , statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode, message = "SUCCESS" });
        }



        // @Role
        // ACCESS : ADMIN , ADMINISTRATOR , MANAGER
        //DESC : return all registered users

        [HttpGet]
        [Route("GetAllUser")]
        public async Task<IActionResult> GetAllUser()
        {
            var statusCode = 400;
            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                    if (UserID != null)
                    {
                        var x = User;
                        var temp = User.IsInRole(Role.Admin);
                        var temp1 = User.IsInRole(Role.Administrator);
                        var temp2 = User.IsInRole(Role.Manager);

                        var userrole = _context.UserRoles.Where(x => x.UserId == UserID).FirstOrDefault();
                        if (userrole != null)
                        {
                            var rolename = _context.Roles.Where(x => x.Id == userrole.RoleId).FirstOrDefault();
                            if (rolename.Name == Role.Admin || rolename.Name == Role.Manager || rolename.Name == Role.Administrator)
                            {
                                var Users = await _context.Users.OrderByDescending(x=>x.Id).ToListAsync();
                                statusCode = 200;

                                return Ok(new { data = Users, statusCode = statusCode });

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
                return Ok(new { status = "FAILED", statusCode = statusCode });
            }

            return Ok(new { status = "SUCCESS", statusCode = statusCode });

        }




        // @Role
        // ACCESS : ADMINISTRATOR
        //DESC : return all administrator(admin , manager , administrator)

        [HttpGet]
        [Route("GetAllRole")]
        public async Task<IActionResult> GetAllRole()
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
                            if (rolename.Name == Role.Administrator)
                            {
                                var Users = await _context.Users.ToListAsync();
                                var sql = @"
                                        SELECT *
                                        FROM AspNetUsers where AspNetUsers.Id IN 
                                        (select AspNetUserRoles.UserId from AspNetUserRoles)";                             
                                var result = _context.Users.FromSqlRaw(sql).ToList();
                                if (result != null)
                                {
                                    statusCode = 200;
                                    return Ok(new { data = result, statusCode = statusCode });
                                }                             
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
                return Ok(new { status = "FAILED", statusCode = statusCode });
            }
            return Ok(new { status = "SUCCESS", statusCode = statusCode });
        }


        // @Role
        // ACCESS : ADMINISTRATOR
        //DESC : Lock any User

        [HttpDelete]
        [Route("LockUser")]
        public async Task<IActionResult> LockUser([FromBody] UserId id)
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
                                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id.userid);


                                if (user != null)
                                {
                                    if (user.LockoutEnd != null)
                                    {

                                        user.LockoutEnd = null;
                                    }
                                    else
                                    {
                                        user.LockoutEnd = DateTime.Now + TimeSpan.FromDays(30);
                                    }

                                    await _context.SaveChangesAsync();
                                    statusCode = 200;
                                }
                                else
                                {
                                    statusCode = 500;
                                }

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


                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED", statusCode = statusCode });


            }
            return Ok(new { status = "DATA DELETED SUCCESSFULLY", message = "SUCCESS", statusCode = statusCode });
        }




        // @Role
        // ACCESS : ADMINISTRATOR
        //DESC :  delete any user

        [HttpDelete]
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser([FromBody] UserId id)
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
                            if (rolename.Name == Role.Administrator)
                            {

                                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id.userid);

                                var Messages = await _context.Messages.Where(x => x.UserId == id.userid).ToListAsync();
                                var Post = await _context.Post.Where(x => x.ClientId == id.userid).ToListAsync();
                                var PostLikes = await _context.PostLikes.Where(x => x.ClientId == id.userid).ToListAsync();
                                var Comments = await _context.Comments.Where(x => x.ClientId == id.userid).ToListAsync();
                                var Chat = await _context.ChatTables.Where(x => x.UserId == id.userid).ToListAsync();


                                if (Post != null)
                                {
                                    foreach (var data in Post)
                                    {
                                        _context.Post.Remove(data);
                                    }
                                }

                                if (Messages != null)
                                {
                                    foreach (var data in Messages)
                                    {
                                        _context.Messages.Remove(data);
                                    }
                                }


                                if (PostLikes != null)
                                {
                                    foreach (var data in PostLikes)
                                    {
                                        _context.PostLikes.Remove(data);
                                    }
                                }

                                if (Comments != null)
                                {
                                    foreach (var data in Comments)
                                    {
                                        _context.Comments.Remove(data);
                                    }
                                }

                                if (Chat != null)
                                {
                                    foreach (var data in Chat)
                                    {
                                        _context.ChatTables.Remove(data);
                                    }
                                }


                                if (user != null)
                                {
                                    _context.Users.Remove(user);
                                    await _context.SaveChangesAsync();
                                    statusCode = 200;
                                }
                                else
                                {
                                    statusCode = 500;
                                }
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
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED", statusCode = statusCode });
            }

            return Ok(new { status = "USER REMOVED SUCCESSFULLY", message = "SUCCESS", statusCode = statusCode });

        }


        // @Role
        // ACCESS : ADMINISTRATOR
        //DESC : delete multiple user at a time

        [HttpDelete]
        [Route("DeleteUsers")]
        public async Task<IActionResult> DeleteUsers([FromBody] MultipleUserId users)
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
                                for (int i = 0; i < users.id.Count; i++)
                                {
                                    var user = _context.Users.Where(u => u.Id == users.id[i]);

                                    var Messages = await _context.Messages.Where(x => x.UserId == users.id[i]).ToListAsync();
                                    var Post = await _context.Post.Where(x => x.ClientId == users.id[i]).ToListAsync();
                                    var PostLikes = await _context.PostLikes.Where(x => x.ClientId == users.id[i]).ToListAsync();
                                    var Comments = await _context.Comments.Where(x => x.ClientId == users.id[i]).ToListAsync();
                                    var Chat = await _context.ChatTables.Where(x => x.UserId == users.id[i]).ToListAsync();


                                    if (Post != null)
                                    {
                                        foreach (var data in Post)
                                        {
                                            _context.Post.Remove(data);
                                        }
                                    }

                                    if (Messages != null)
                                    {
                                        foreach (var data in Messages)
                                        {
                                            _context.Messages.Remove(data);
                                        }
                                    }


                                    if (PostLikes != null)
                                    {
                                        foreach (var data in PostLikes)
                                        {
                                            _context.PostLikes.Remove(data);
                                        }
                                    }

                                    if (Comments != null)
                                    {
                                        foreach (var data in Comments)
                                        {
                                            _context.Comments.Remove(data);
                                        }
                                    }

                                    if (Chat != null)
                                    {
                                        foreach (var data in Chat)
                                        {
                                            _context.ChatTables.Remove(data);
                                        }
                                    }


                                    foreach (var data in user)
                                    {
                                        var x = data;
                                        _context.Users.Remove(data);
                                    }

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

            }catch (Exception e)
            {

                statusCode = 400;
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED", statusCode = statusCode });


            }
            return Ok(new { status = "USERS REMOVED SUCCESSFULLY", message = "SUCCESS", statusCode = statusCode });
        }


        // ROLES AND CLAIMS
        public class Admin
        {
            public string userid { get; set; }
            public string rolename { get; set; }
            public virtual List<string> claims { get; set; }
        }




        // DATA BINDING FOR LIST OF PRODUCT ID

        public class UserId {
            public string  userid { get; set; }
        }
        public class MultipleUserId
        {
            public virtual List<string> id { get; set; }


        }

        public class MultipleProductId
        {
            public virtual List<int> id { get; set; }


        }


        //PRODUCT CREATION AND BINDING WITH IMAGE
        public class Productnew
        {

            public int id { get; set; }
            public string? title { get; set; }
            public string? description { get; set; }
            public string? category { get; set; }
            public string? subcategory { get; set; }
            public int quantity { get; set; }
            public double price { get; set; }
            // public List<Img> Img { get; set; }
            public virtual List<Img>? Img { get; set; }

        }

        public class Img
        {
            public string? img1 { get; set; }
            public string? img2 { get; set; }
            public string? img3 { get; set; }
            public string? img4 { get; set; }
            public string? img5 { get; set; }
        }


        public class UserWithRole
        {
            public string UserName { get; set; } // You can alias the SQL output to give these better names
            public string Name { get; set; }

        }
    }
}
