using System;
using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Cards;
using Microsoft.EntityFrameworkCore;

namespace Connectivity.Persistence
{
    public class CardsDbContext : DbContext
    {
        public DbSet<Card> Cards { get; set; }

        public CardsDbContext()
        {
        }

        public CardsDbContext(DbContextOptions<CardsDbContext> contextOptions)
            : base(contextOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Card>()
                .ToContainer("cards")
                .HasNoDiscriminator();

            modelBuilder.Entity<Card>()
                .OwnsOne(e => e.Task)
                .Property(e => e.Questions)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));   
            
            modelBuilder.Entity<Card>()
                .OwnsOne(e => e.Task)
                .Property(e => e.BannedWords)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));



            //modelBuilder.Entity<CardTask>()
            //    .OwnsMany<string>(e => e.Questions);
            //modelBuilder.Entity<CardTask>()
            //    .OwnsMany<string>(e => e.BannedWords);

        }
    }
}