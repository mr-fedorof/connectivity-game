using System;
using Connectivity.Domain.Models;
using Connectivity.Domain.Models.Cards;
using Connectivity.Persistence.Helpers;
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
                .OwnsOne(e => e.Task,
                    _ =>
                    {
                        _.Property(e => e.Questions)
                            .HasCsvConversion();
                        _.Property(e => e.BannedWords)
                            .HasCsvConversion();
                    });
        }
    }
}