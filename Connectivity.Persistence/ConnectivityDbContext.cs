using Connectivity.Domain.Models;
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
                .OwnsMany<Team>(e => e.Teams);

            modelBuilder.Entity<Lobby>()
                .OwnsMany<Player>(e => e.Players);
        }
    }
}