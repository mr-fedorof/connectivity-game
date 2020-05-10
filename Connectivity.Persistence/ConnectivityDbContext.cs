using System;
using Connectivity.Domain.Models;
using Connectivity.Persistence.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Connectivity.Persistence
{
    public class ConnectivityDbContext : DbContext
    {
        public DbSet<Lobby> Lobbies { get; set; }

        public ConnectivityDbContext()
        {
        }

        public ConnectivityDbContext(DbContextOptions<ConnectivityDbContext> contextOptions)
            : base(contextOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Lobby>()
                .ToContainer("lobbies")
                .HasNoDiscriminator();

            modelBuilder.Entity<Lobby>()
                .OwnsOne(_ => _.Game, _ =>
                {
                    _.OwnsOne(_ => _.PlayerTurnState, _ =>
                    {
                        _.OwnsOne(_ => _.GameCard, _ =>
                        {
                            _.OwnsOne(_ => _.Task, _ =>
                            {
                                _.Property(e => e.Questions)
                                    .HasJsonConversion();
                                _.Property(e => e.BannedWords)
                                    .HasJsonConversion();
                            });
                        });
                    });
                });

            modelBuilder.Entity<Lobby>()
                .OwnsMany(_ => _.Teams);

            modelBuilder.Entity<Lobby>()
                .OwnsMany(_ => _.Players);
        }
    }
}