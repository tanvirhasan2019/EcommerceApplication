using EcommerceApp.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApp.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImage { get; set; }
        public DbSet<ClientOrder> ClientOrder { get; set; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Transaction> Transaction { get; set; }

        public DbSet<ShippingDetails> ShippingDetails { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<PostLike> PostLikes { get; set; }
        public DbSet<Message> Messages { get; set; }

        public DbSet<ChatTable> ChatTables { get; set; }

    }
}
