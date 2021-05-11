using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using EcommerceApp.Data;
using EcommerceApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace EcommerceApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AdminController> _logger;


        public AdminController(ApplicationDbContext context, ILogger<AdminController> logger, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;

        }


        [HttpPost]
        [Route("CreateProduct")]
        public object CreateProduct([FromBody] Productnew products)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;


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


                }
            }
            catch (Exception)
            {
                //Console.WriteLine(e);

                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });


            }
            return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });
        }





        [HttpPost]
        [Route("UpdateProduct")]
        public object UpdateProduct([FromBody] Productnew products)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

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


                }
            }
            catch (Exception)
            {
                //Console.WriteLine(e);

                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });


            }
            return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });
        }



        [HttpPost]
        [Route("DeleteProductId")]
        public object DeleteProductId([FromBody] Product productid)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;
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



                }
            }
            catch (Exception)
            {


                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });


            }
            return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });
        }







        [HttpPost]
        [Route("DeleteMultipleProductId")]
        public object DeleteMultipleProductId([FromBody] MultipleProductId multipleProductId)
        {



            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

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

                }
            }
            catch (Exception)
            {


                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });


            }
            return Ok(new { status = "DATA SAVED SUCCESSFULLY", message = "SUCCESS" });
        }




        [HttpPost]
        [Route("DeleteOrderItem")]
        public object DeleteOrderItem([FromBody] ClientOrder order)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;



                    /*  var Transaction = _context.Transaction.Where(u => u.ClientOrderOrderid == order.Orderid);
                      foreach (var data in Transaction)
                      {
                          var x = data;
                          _context.Transaction.Remove(data);
                      }



                      var ShippingDetails = _context.ShippingDetails.Where(u => u.ClientOrderOrderid == order.Orderid);
                      foreach (var data in ShippingDetails)
                      {
                          var x = data;
                          _context.ShippingDetails.Remove(data);
                      } */

                    var ClientOrder = _context.ClientOrder.Where(u => u.Orderid == order.Orderid);
                    foreach (var data in ClientOrder)
                    {
                        var x = data;
                        _context.ClientOrder.Remove(data);
                    }

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
        [Route("DeleteOrderItems")]
        public object DeleteOrderItems([FromBody] MultipleProductId list)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var UserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

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


                }
            }
            catch (Exception)
            {


                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED" });


            }
            return Ok(new { status = "DATA DELETED SUCCESSFULLY", message = "SUCCESS" });
        }





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
                        
                        var Users = await _context.Users.ToListAsync();
                        statusCode = 200;

                        return Ok(new { data = Users , statusCode = statusCode});
                    }
                    else
                    {
                        statusCode = 500;
                    }
                    
                   
                }


            }
            catch (Exception)
            {
               return Ok(new { status = "FAILED" , statusCode= statusCode });
            }

          return Ok(new { status = "SUCCESS" , statusCode = statusCode });

        }




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

                       // user.LockoutEnabled = !user.LockoutEnabled;
                        _context.SaveChanges();
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


                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED", statusCode= statusCode });


            }
            return Ok(new { status = "DATA DELETED SUCCESSFULLY", message = "SUCCESS" , statusCode = statusCode });
        }


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

                    var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id.userid);
                    var Posts = await _context.PostLikes.Where(x => x.ClientId == id.userid).ToListAsync();

                    if(Posts != null)
                    {
                        foreach(var data in Posts)
                        {                          
                            _context.PostLikes.Remove(data);
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
            catch (Exception e)
            {


                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED", statusCode = statusCode });


            }
            return Ok(new { status = "USER REMOVED SUCCESSFULLY", message = "SUCCESS", statusCode = statusCode });
        }



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

                    for (int i = 0; i < users.id.Count; i++)
                    {
                        var user = _context.Users.Where(u => u.Id == users.id[i]);

                        var Posts = await _context.PostLikes.Where(x => x.ClientId == users.id[i]).ToListAsync();

                        if (Posts != null)
                        {
                            foreach (var data in Posts)
                            {
                                _context.PostLikes.Remove(data);
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
                else
                {
                    statusCode = 500;
                }
            }
            catch (Exception e)
            {

                statusCode = 400;
                return Ok(new { status = "SOMETHING WENT WRONG", message = "FAILED", statusCode = statusCode });


            }
            return Ok(new { status = "USERS REMOVED SUCCESSFULLY", message = "SUCCESS", statusCode = statusCode });
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

    }
}
