﻿using Connectivity.Domain.Models;
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
                .OwnsOne(e => e.Game)
                .OwnsOne(e => e.PlayerTurnState);

            modelBuilder.Entity<Lobby>()
                .OwnsMany(e => e.Teams);

            modelBuilder.Entity<Lobby>()
                .OwnsMany(e => e.Players);
        }
    }
}